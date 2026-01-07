import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../hooks/useAxiosSecure";

const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b"];

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch cars stats from the API
  const fetchCarsStats = async () => {
    const { data } = await axiosSecure.get("/admin/cars-stats");
    return data;
  };

  const { data, isLoading, error } = useQuery({
  queryKey: ["carsStats"],
  queryFn: fetchCarsStats,
});

// Handle loading
if (isLoading) return <div className="p-10 text-center">Loading cars dashboard...</div>;

// Handle error
if (error) {
  return (
    <div className="p-10 text-center text-red-500">
      {error.response?.data?.message || "Failed to load dashboard"}
    </div>
  );
}

// Use optional chaining and defaults
const {
  totalCars = 0,
  availableCars = 0,
  unavailableCars = 0,
  averageRent = 0,
  carsByCategory = [],
  carsByStatus = [],
  carsAddedPerMonth = [],
  recentCars = [],
} = data || {};


  return (
    <div className="space-y-10">

      {/* ================= OVERVIEW CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Total Cars</div>
          <div className="stat-value text-primary">{totalCars}</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Available</div>
          <div className="stat-value text-success">{availableCars}</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Unavailable</div>
          <div className="stat-value text-error">{unavailableCars}</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Avg Rent / Day</div>
          <div className="stat-value">৳{averageRent}</div>
        </div>
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Cars by Category */}
        <div className="bg-base-100 p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Cars by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={carsByCategory}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cars Added Over Time */}
        <div className="bg-base-100 p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Cars Added (Monthly)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={carsAddedPerMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= PIE CHART ================= */}
      <div className="bg-base-100 p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Availability Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={carsByStatus}
              dataKey="value"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {carsByStatus.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ================= DATA TABLE ================= */}
      <div className="bg-base-100 p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Recent Cars</h3>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Car</th>
                <th>Category</th>
                <th>Provider</th>
                <th>Price / Day</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentCars.map((car, index) => (
                <tr key={car._id}>
                  <td>{index + 1}</td>
                  <td>{car.car_name}</td>
                  <td>{car.category}</td>
                  <td>{car.provider_name}</td>
                  <td>৳{car.rent_price_per_day}</td>
                  <td>
                    <span
                      className={`badge ${
                        car.status === "available"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {car.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboardHome;
