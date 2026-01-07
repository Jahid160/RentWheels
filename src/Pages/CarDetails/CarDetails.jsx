import React, { use } from "react";
import { useNavigate, useParams } from "react-router";

import { toast } from "react-toastify";
import UseTime from "../../Components/Loading/Loading";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth()
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure()

  // =========================
  // 1️⃣ GET Car Details
  // =========================
  const { data, isLoading } = useQuery({
    queryKey: ["car-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/browse-cars/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // =========================
  // 2️⃣ POST Booking
  // =========================
  const bookCarMutation = useMutation({
    mutationFn: async (bookingData) => {
      return axiosSecure.post(`/userCar/${data._id}`, bookingData);
    },
  });

  // =========================
  // 3️⃣ PATCH Car Status
  // =========================
  const updateStatusMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.patch(
        `/browse-cars/status/${data._id}`,
        { status: "unavailable" }
      );
    },
    onSuccess: () => {
      toast.success("Car booked successfully!");
      queryClient.invalidateQueries(["car-details", id]);
    },
  });

  // =========================
  // 4️⃣ Handle Booking
  // =========================
  const handleBook = async () => {
    if (!user) return navigate("/");

    const bookingData = {
      car_name: data.car_name,
      category: data.category,
      description: data.description,
      hosted_image_url: data.hosted_image_url,
      location: data.location,
      provider_email: user.email,
      created_at: new Date(),
      provider_name: data.provider_name,
      rent_price_per_day: data.rent_price_per_day,
    };

    try {
      await bookCarMutation.mutateAsync(bookingData);
      await updateStatusMutation.mutateAsync();
    } catch (err) {
      toast.error("Booking failed!");
    }
  };

  // =========================
  // UI States
  // =========================
  if (isLoading) return <UseTime />;

  return (
    <div className="flex justify-center my-3 text-black">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={data.hosted_image_url} alt="car" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{data.car_name}</h2>
          <p>{data.description}</p>

          <p>Category: {data.category}</p>
          <p>Rent: ${data.rent_price_per_day}/day</p>
          <p>Location: {data.location}</p>

          <p>
            Status:{" "}
            <span className={`badge ${data.status === "unavailable" ? "badge-error" : "badge-success"}`}>
              {data.status}
            </span>
          </p>

          <div className="card-actions">
            {data.status === "unavailable" ? (
              <button disabled className="btn btn-primary w-full">
                Already Booked
              </button>
            ) : (
              <button
                onClick={handleBook}
                className="btn btn-primary w-full"
                disabled={bookCarMutation.isLoading || updateStatusMutation.isLoading}
              >
                Booking...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
