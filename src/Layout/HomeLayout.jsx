import React from 'react';


import { Outlet } from 'react-router';


import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Banner';
import { ToastContainer } from 'react-toastify';

const HomeLayout = () => {
  
  return (
    <div className='bg-linear-to-r/hsl from-indigo-500 to-teal-400'>
      <div className="max-w-[1400px] mx-auto">
        <Navbar />
        
        <div className="">
          <Outlet />
        </div>
        <Footer/>
      </div>

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default HomeLayout;