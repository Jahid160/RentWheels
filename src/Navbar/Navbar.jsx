import React from "react";
import { RiMenuAddFill } from "react-icons/ri";
import logoImg from '../assets/logoImg.png'
import { FaCar } from "react-icons/fa"; // React icon for the logo
import { Link } from "react-router";


const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <Link to="/" className="text-green-800 hover:text-green-400 font-semibold">
          Home
        </Link>
      </li>
      <li>
        <Link to="/allcards" className="text-green-800 hover:text-green-400 font-semibold">
          AllCards
        </Link>
      </li>
      <li>
        <Link to="/login" className="text-green-800 hover:text-green-400 font-semibold">
          Login
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white/10 backdrop-blur-md fixed top-0 left-0 z-50 w-full shadow-md">
      <div className="navbar-start">
        {/* Mobile dropdown menu */}
        {/* <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost text-green-800 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white/10 backdrop-blur-md rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div> */}

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 ">
          <div >
            <img className="w-35 h-26"  src={logoImg} alt="logoImg" />
          </div>
        </Link>
      </div>

      {/* Desktop links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* Right side login button */}
      <div className="navbar-end">
        <Link className="btn btn-outline btn-secondary">
          Login
        </Link>
      </div>
      <div className="dropdown mr-5 ml-5">
          <label tabIndex={0} className="btn btn-ghost text-green-800 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white/10 backdrop-blur-md rounded-box space-y-5 text-8xl"
          >
            {navLinks}
          </ul>
        </div>
    </div>
  );
};

export default Navbar;
