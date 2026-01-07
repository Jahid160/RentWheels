  // baseURL: 'https://car-rental-server-cyan-ten.vercel.app'

import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://car-rental-server-cyan-ten.vercel.app",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor to add JWT
    const reqInterceptor = axiosSecure.interceptors.request.use(async (config) => {
      if (user) {
        const token = await user.getIdToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    // Response interceptor to handle 401/403
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response?.status;
        console.log(statusCode);
        if (statusCode === 401 || statusCode === 403) {
          // Logout user and redirect
          signOutUser()?.then(() => navigate("/login"));
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;

