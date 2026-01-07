import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useUpdateProfile from "../../../hooks/useUpdateProfile";
import useProfile from "../../../hooks/useProfile";



const DashboardProfile = () => {
  const { email } = useParams();
  const { data: profile, isLoading } = useProfile(email);
  const { mutateAsync, isPending } = useUpdateProfile();

  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        photoURL: profile.photoURL || "",
      });
    }
  }, [profile]);

  if (isLoading) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({
      email,
      data: formData,
    });
  };

  return (
    <div className="w-full bg-base-100 rounded-xl shadow p-10">
      <h2 className="text-2xl font-bold mb-8">Profile Settings</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={formData.photoURL}
            alt="Profile"
            className="w-36 h-36 rounded-full border object-cover"
          />
        </div>

        {/* Editable Info */}
        <div className="md:col-span-2 space-y-5">
          <div>
            <label className="label font-semibold">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label font-semibold">Photo URL</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.photoURL}
              onChange={(e) =>
                setFormData({ ...formData, photoURL: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label font-semibold">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={profile.email}
              disabled
            />
          </div>

          <button
            disabled={isPending}
            className="btn btn-primary mt-4"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardProfile;
