import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const ContactForm = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()

  console.log(user);

  // =========================
  // 1️⃣ React Hook Form setup
  // =========================
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


   // 🔹 Reset form when user is loaded
  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || "",
        email: user.email || "",
        subject: "",
        message: "",
      });
    }
  }, [user, reset]);
  // =========================
  // 2️⃣ Submit Mutation
  // =========================
  const submitMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/contact", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Message sent successfully!");
      reset(); // clear form
    },
    onError: () => {
      toast.error("Failed to send message. Please try again.");
    },
  });

  // =========================
  // 3️⃣ Handle Form Submit
  // =========================
  const onSubmit = (data) => {
    submitMutation.mutate(data);
  };

  return (
    <div id="contact" className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10 text-black ">
      <h2 className="text-2xl font-bold mb-5 text-center">Contact Us</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            
            {...register("name", { required: "Name is required" })}
            className={`input input-bordered w-full ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Your Name"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className={`input input-bordered w-full ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            {...register("subject", { required: "Subject is required" })}
            className={`input input-bordered w-full ${
              errors.subject ? "border-red-500" : ""
            }`}
            placeholder="Subject"
          />
          {errors.subject && (
            <span className="text-red-500 text-sm">{errors.subject.message}</span>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            rows={5}
            {...register("message", { required: "Message is required" })}
            className={`textarea textarea-bordered w-full ${
              errors.message ? "border-red-500" : ""
            }`}
            placeholder="Write your message here..."
          ></textarea>
          {errors.message && (
            <span className="text-red-500 text-sm">{errors.message.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-2"
          disabled={submitMutation.isLoading}
        >
          {submitMutation.isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
