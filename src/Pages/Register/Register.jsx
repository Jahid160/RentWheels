import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const { createUser, updateUserProfile, setUser,signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    const values = {
      displayName: target.name.value,
      email: target.email.value,
      photoURL: target.photoURL.value,
      password: target.password.value,
    };
     if (!validatePassword(values.password)) {
      setError(
        "Password must be at least 6 characters long and contain both uppercase and lowercase letters."
      );
      return;
    }

    createUser(values.email, values.password)
      .then((result) => {
        updateUserProfile(values.displayName, values.photoURL);
        toast.success('register success')
        setUser(result.user);
        navigate("/");
        console.log(result.user);
      })
      .catch((error) => {
        toast.error(error.message)
        setError(error.message)
      }
    
    );
  };

  const handleGoogleSignIn = () => {
    
    signInWithGoogle()
      .then((result) => {
        toast.success('register success')
        setUser(result.user)
        
        console.log(result.user.photoURL);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message)
        setError(error.message);
      });
      // toast.success('success')
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-[url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80')] 
      bg-cover bg-center"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="bg-gradient-to-r from-[#2e1065]/90 to-[#3b82f6]/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-white">
        <h2 className="text-4xl font-bold text-center mb-6">Register</h2>

        

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-lg bg-white/20 focus:bg-white/30 outline-none placeholder-gray-200 text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="Enter photo URL"
              className="w-full px-4 py-2 rounded-lg bg-white/20 focus:bg-white/30 outline-none placeholder-gray-200 text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 focus:bg-white/30 outline-none placeholder-gray-200 text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 focus:bg-white/30 outline-none placeholder-gray-200 text-white"
            />
          </div>
          {error && (
          <p className=" text-red-600 p-2 rounded mb-4 text-center font-semibold">
            {error}
          </p>
        )}

          <button
            type="submit"
            className="w-full py-2 bg-white text-[#2e1065] font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-black border border-[#e5e5e5] hover:bg-gray-200 transition"
          >
            <FaGoogle />
            SingUp with Google
          </button>
        </div>

        <div className="text-center text-xl mt-3">
          Have an account?
          <Link className="underline ml-2" to={"/Login"}>
            Login
          </Link>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Register;
