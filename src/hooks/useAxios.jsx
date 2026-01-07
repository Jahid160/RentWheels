import axios from 'axios';
import React from 'react';


const axiosInstance = axios.create({
    baseURL: 'https://car-rental-server-cyan-ten.vercel.app'
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;