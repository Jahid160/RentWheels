import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { setUser, signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // Refs for inputs
  // =========================
  const emailRef = useRef();
  const passwordRef = useRef();

  // =========================
  // Handle form submit
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const result = await signInUser(email, password);
      setUser(result.user);
      toast.success("Logged in successfully!");
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
      setUser(result.user);
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Demo User/Admin autofill
  // =========================
  const handleDemoLogin = (type) => {
    if (type === "user") {
      emailRef.current.value = "demouser@example.com";
      passwordRef.current.value = "UserDemo123";
    } else if (type === "admin") {
      emailRef.current.value = "demoadmin@example.com";
      passwordRef.current.value = "AdminDemo123";
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
        <h2 className="text-4xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
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
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-black border border-[#e5e5e5] hover:bg-gray-200 transition disabled:opacity-50"
            disabled={loading}
          >
            <FaGoogle /> Login with Google
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
          Don't have an account?
          <Link className="underline ml-2" to={"/register"}>
            Register
          </Link>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
