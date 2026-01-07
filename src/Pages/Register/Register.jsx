import React, { useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const { createUser, updateUserProfile, setUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // Refs for input fields
  // =========================
  const nameRef = useRef();
  const emailRef = useRef();
  const photoRef = useRef();
  const passwordRef = useRef();

  // =========================
  // Password validation
  // =========================
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const axiosSecure = useAxiosSecure()
  const saveUserMutation = useMutation({
  mutationFn: async (userData) => {
    const res = await axiosSecure.post(
      `/userDB/${userData.uid}`,
      userData
    );
    return res.data;
  },
});



  // =========================
  // Handle form submit
  // =========================
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  const values = {
    displayName: nameRef.current.value.trim(),
    email: emailRef.current.value.trim(),
    photoURL: photoRef.current.value.trim(),
    password: passwordRef.current.value,
  };

  if (!values.displayName || !values.email || !values.password) {
    setError("All fields are required.");
    return;
  }

  if (!validatePassword(values.password)) {
    setError(
      "Password must be at least 6 characters and contain both uppercase and lowercase letters."
    );
    return;
  }

  try {
    setLoading(true);

    // 🔹 1. Firebase create user
    const result = await createUser(values.email, values.password);

    // 🔹 2. Update profile
    await updateUserProfile(values.displayName, values.photoURL);

    const userData = {
      uid: result.user.uid,
      name: values.displayName,
      email: values.email,
      photoURL: values.photoURL,
      role: "user",           // optional
      createdAt: new Date(),  // optional
    };

    // 🔹 3. Save user to database (TanStack Mutation)
    await saveUserMutation.mutateAsync(userData);

    // 🔹 4. Set user & redirect
    setUser(result.user);
    toast.success("Registration successful!");
    navigate("/");
  } catch (err) {
    setError(err.message);
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
};


  // =========================
  // Google social login
  // =========================
 const handleGoogleSignIn = async () => {
  setError("");
  try {
    setLoading(true);

    const result = await signInWithGoogle();
    
    const userData = {
      uid: result.user.uid,
      name: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
      role: "user",

      createdAt: new Date(),
    };

    await saveUserMutation.mutateAsync(userData);

    setUser(result.user);
    toast.success("Signed in with Google!");
    navigate("/");
  } catch (err) {
    setError(err.message);
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
};


  // =========================
  // Demo user/admin autofill
  // =========================
  const handleDemoLogin = (type) => {
    if (type === "user") {
      nameRef.current.value = "Demo User";
      emailRef.current.value = "demouser@example.com";
      passwordRef.current.value = "UserDemo123";
      photoRef.current.value = "https://i.pravatar.cc/150?img=10";
    } else if (type === "admin") {
      nameRef.current.value = "Demo Admin";
      emailRef.current.value = "demoadmin@example.com";
      passwordRef.current.value = "AdminDemo123";
      photoRef.current.value = "https://i.pravatar.cc/150?img=20";
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center
      bg-[url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80')]
      bg-cover bg-center relative"
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="bg-gradient-to-r from-[#2e1065]/90 to-[#3b82f6]/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-white relative z-10">
        <h2 className="text-4xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Full Name</label>
            <input
              ref={nameRef}
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-lg bg-white/20 focus:bg-white/30 outline-none placeholder-gray-200 text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Photo URL</label>
            <input
              ref={photoRef}
              type="text"
              placeholder="Enter photo URL"
              className="w-full px-4 py-2 rounded-lg bg-white/20 focus:bg-white/30 outline-none placeholder-gray-200 text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Email</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 focus:bg-white/30 outline-none placeholder-gray-200 text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-semibold">Password</label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 focus:bg-white/30 outline-none placeholder-gray-200 text-white"
            />
          </div>

          {error && (
            <p className="text-red-600 p-2 rounded mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-white text-[#2e1065] font-semibold rounded-lg hover:bg-gray-100 transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-black border border-[#e5e5e5] hover:bg-gray-200 transition disabled:opacity-50"
            disabled={loading}
          >
            <FaGoogle /> Sign Up with Google
          </button>
        </div>

        {/* Demo Buttons */}
        <div className="text-center mt-4">
          <span>Demo Credentials:</span>
          <div className="flex justify-center gap-4 mt-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("user")}
              className="px-4 py-1 bg-gray-100 rounded text-black hover:bg-gray-200"
            >
              Demo User
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="px-4 py-1 bg-gray-100 rounded text-black hover:bg-gray-200"
            >
              Demo Admin
            </button>
          </div>
        </div>

        <div className="text-center text-xl mt-3">
          Have an account?
          <Link className="underline ml-2" to={"/Login"}>
            Login
          </Link>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;
