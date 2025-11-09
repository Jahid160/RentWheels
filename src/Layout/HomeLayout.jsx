import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router';

const HomeLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet>
        hi
      </Outlet>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;