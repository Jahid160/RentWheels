import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import logoImg from ".././assets/logoImg.png";
import { IoMenu } from "react-icons/io5";

const Navbar = ({scrollToContact}) => {
  const { user, setUser, signOutUser } = useContext(AuthContext);

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        setUser("");
      })
      .catch((err) => console.log(err));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="font-medium">
          Home
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/add-car" className="font-medium">
              Add Car
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-listing" className="font-medium">
              My Listings
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-booking" className="font-medium">
              My Bookings
            </NavLink>
          </li>
        </>
      )}

        <li>
        <Link onClick={scrollToContact} className="font-medium">
          Contact Us
        </Link>
      </li>
      <li>
        <NavLink to="/browse-cars" className="font-medium">
          All Cars
        </NavLink>
      </li>
    
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Left: Logo */}
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold text-primary">
          <img className="w-[200px] h-[100px]" src={logoImg} alt="" />
        </Link>
      </div>

      {/* Center: Navigation Links (desktop only) */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 space-x-1">{navLinks}</ul>
      </div>

      {/* Right: Profile / Login / Mobile Menu */}
      <div className="navbar-end flex items-center gap-2">
        {/* ✅ Mobile Hamburger */}
        <div className="dropdown md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg> */}
            <IoMenu className="text-black" size={25} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 right-0 text-black font-semibold "
          >
            {navLinks}
          </ul>
        </div>

        {/* ✅ User Section */}
        <div className="dropdown dropdown-end">
          {!user ? (
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          ) : (
            <>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full border-2 border-primary">
                  <img src={user?.photoURL} alt="user" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="p-2 border-b">
                  <p className="font-semibold">{user.displayName}</p>

                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="font-semibold">
                    <Link to={"/dashboard"}>Dashboard</Link>
                  </p>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="text-error font-medium"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
