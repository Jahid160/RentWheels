import React, { useRef } from 'react';


import { Outlet } from 'react-router';


import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Banner';
import { ToastContainer } from 'react-toastify';
import ContactForm from '../Components/ContactForm/ContactForm';

const HomeLayout = () => {
  const contactRef = useRef(null);
    const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <div className='bg-linear-to-r/hsl from-indigo-500 to-teal-400'>
      <div className="max-w-[1400px] mx-auto flex-1">
        <Navbar scrollToContact={scrollToContact}/>
        
        <div className="my-auto">
          <Outlet contactRef={contactRef}/>
        </div>

        <Footer scrollToContact={scrollToContact}/>
      </div>

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default HomeLayout;