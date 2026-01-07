import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import UseTime from "../../Components/Loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyListings = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  /* ============================
     1️⃣ GET: My Listings
  ============================ */
  const {
    data: models = [],
    isLoading,
  } = useQuery({
    queryKey: ["my-listings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-listing?email=${user?.email}`,
        
      );
      return res.data;
    },
  });

  /* ============================
     2️⃣ DELETE: Listing
  ============================ */
const deleteMutation = useMutation({
  mutationFn: async (id) => {
    const res = await axiosSecure.delete(
      `/browse-cars/${id}`
    );
    return res.data;
  },
  onSuccess: () => {
    toast.success("Car deleted successfully");
    queryClient.invalidateQueries(["my-listings"]);
  },
});


  /* ============================
     Delete Handler
  ============================ */
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return <UseTime />;
  }

  return (
    <div className="grid space-y-3 max-w-[1400px] mx-auto gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {models.map((car) => (
        <div key={car._id} className="flex justify-center my-3">
          <div className="card bg-base-100 w-96 shadow-sm text-black">
            <figure>
              <img src={car.hosted_image_url} alt={car.car_name} />
            </figure>

            <div className="card-body">
              <h2 className="card-title text-2xl font-bold">
                {car.car_name}
              </h2>
              <p className="text-sm">{car.description}</p>

              <div className="mt-3 space-y-1 text-sm">
                <p><b>Category:</b> {car.category}</p>
                <p><b>Rent:</b> ${car.rent_price_per_day}/day</p>
                <p><b>Location:</b> {car.location}</p>
                <p>
                  <b>Status:</b>{" "}
                  <span className="badge badge-success text-white">
                    Available
                  </span>
                </p>
              </div>

              <div className="divider my-2"></div>

              <div className="text-sm">
                <p className="font-semibold">Provider Info:</p>
                <p>{car.provider_name}</p>
                <p>{car.provider_email}</p>
              </div>

              <div className="flex gap-3 mt-4">
                <Link
                  to={`/listing-update/${car._id}`}
                  className="btn btn-primary w-1/2"
                >
                  Update
                </Link>

                <button
                  onClick={() => handleDelete(car._id)}
                  className="btn btn-error w-1/2"
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyListings;
