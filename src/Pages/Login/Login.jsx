import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { user, setUser, signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((result) => {
        // console.log(result.user);
        setUser(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        // console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
          className="min-h-screen flex items-center justify-center 
          bg-[url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80')] 
          bg-cover bg-center"
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50 "></div>
          <div className="bg-gradient-to-r from-[#2e1065]/90 to-[#3b82f6]/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-white">
            <h2 className="text-4xl font-bold text-center mb-6">Login</h2>
    
            <form onSubmit={handleSubmit}>
              
    
              
    
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
    
              <button
                type="submit"
                className="w-full py-2 bg-white text-[#2e1065] font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                Log In
              </button>
            </form>
    
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-black border border-[#e5e5e5] hover:bg-gray-200 transition"
              >
                <FaGoogle />
                Login with Google
              </button>
            </div>
    
            <div className="text-center text-xl mt-3">
             Don't Have an account?
              <Link className="underline ml-2" to={"/register"}>
                Register
              </Link>
            </div>
          </div>
        </div>

  );
};

export default Login;
