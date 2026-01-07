import React, { use } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import UseTime from "../../Components/Loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const MyBookings = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // =========================
  // 1️⃣ GET My Bookings
  // =========================
  const {
    data: bookings = [],
    isLoading,
  } = useQuery({
    queryKey: ["my-bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-booking?email=${user.email}`
      );
      return res.data;
    },
  });

  // =========================
  // 2️⃣ DELETE Booking
  // =========================
  const deleteBookingMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/my-booking/${id}`);
    },
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries(["my-bookings", user?.email]);
      navigate("/my-booking");
    },
  });

  // =========================
  // 3️⃣ Handle Delete
  // =========================
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBookingMutation.mutate(id);

        Swal.fire({
          title: "Deleted!",
          text: "Your car has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // =========================
  // Loading State
  // =========================
  if (isLoading) return <UseTime />;

  return (
    <div>
      {bookings.map((data, index) => (
        <div key={data._id} className="overflow-x-auto">
          <table className="table">
            <tbody>
              <tr>
                <th>{index + 1}</th>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-22 w-22">
                        <img
                          src={data.hosted_image_url}
                          alt="car"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {data.provider_name}
                      </div>
                      <div className="text-sm opacity-50">
                        {data.provider_email}
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  {data.location}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {data.car_name}
                  </span>
                </td>

                <td className="text-black font-bold">
                  ${data.rent_price_per_day}
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="btn"
                    disabled={deleteBookingMutation.isLoading}
                  >
                    Delete
                  </button>
                </td>

                <td>
                  <Link
                    to={`/my-booking/${data._id}`}
                    className="btn btn-ghost"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
