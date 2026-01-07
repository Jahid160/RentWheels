import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { HiOutlineLogout } from "react-icons/hi";
import LogoImg from "../assets/logo.png";

import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

import {
  USER_MENU,
  ADMIN_MENU,
  SETTINGS_MENU,
} from "./DashboardNav/dashboardNavMenu";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();
  
  const { role, roleLoading } = useRole();


  return (
    <div className="drawer lg:drawer-open text-black max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= Main Content ================= */}
      <div className="drawer-content flex flex-col bg-base-100">
        {/* Navbar */}
        <nav className="navbar sticky top-0 z-10 w-full bg-base-100/80 backdrop-blur-md border-b border-base-200 px-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="size-6">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 font-bold text-xl">Dashboard</div>
        </nav>

        {/* Page Content */}
        <main className="p-6">
          <div className="bg-base-200 rounded-box p-10 border border-dashed border-base-300">
            <Outlet />
          </div>
        </main>
      </div>

      {/* ================= Sidebar ================= */}
      <div className="drawer-side z-20">
        <label htmlFor="my-drawer-4" className="drawer-overlay" />

        <aside
          className={`flex flex-col min-h-full bg-base-200 border-r border-base-300 transition-all duration-300
          ${isCollapsed ? "w-20" : "w-64"}`}
        >
          {/* Sidebar Header */}
          <div
            className={`flex items-center p-4 mb-2 ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!isCollapsed && (
              <Link to="/">
                <img
                  src={LogoImg}
                  alt="Logo"
                  className="w-40 h-20 ml-[-15px]"
                />
              </Link>
            )}

            {/* Collapse Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="btn btn-square btn-ghost btn-sm"
              title={isCollapsed ? "Expand" : "Collapse"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className={`size-5 transition-transform duration-300 ${
                  isCollapsed ? "rotate-180" : ""
                }`}
              >
                <path d="M4 4h16v16H4z" />
                <path d="M9 4v16" />
                <path d="M14 10l2 2-2 2" />
              </svg>
            </button>
          </div>

          {/* ================= Navigation ================= */}
          <ul className="menu w-full grow px-2 space-y-1">

            {/* USER MENU */}
            {USER_MENU(user?.email).map((item, index) => (
              <li key={index}>
                {item.type === "link" ? (
                  <Link
                    to={item.to}
                    className={`flex items-center gap-4 py-3 rounded-lg
                      ${isCollapsed ? "justify-center tooltip tooltip-right" : ""}`}
                    data-tip={item.label}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                ) : (
                  <NavLink
                    to={item.to}
                    className={`flex items-center gap-4 py-3 rounded-lg
                      ${isCollapsed ? "justify-center tooltip tooltip-right" : ""}`}
                    data-tip={item.label}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {!isCollapsed && <span>{item.label}</span>}
                  </NavLink>
                )}
              </li>
            ))}

            {/* ADMIN MENU */}
{!roleLoading && role === "admin" &&
  ADMIN_MENU.map((item, index) => (
    <li key={index}>
      <NavLink
        to={item.to}
        className={`flex items-center gap-4 py-3 rounded-lg
          ${isCollapsed ? "justify-center tooltip tooltip-right" : ""}`}
        data-tip={item.label}
      >
        <span className="text-xl">{item.icon}</span>
        {!isCollapsed && <span>{item.label}</span>}
      </NavLink>
    </li>
  ))}


            {/* SETTINGS */}
            <li>
              <button
                className={`flex items-center gap-4 py-3 rounded-lg w-full
                  ${isCollapsed ? "justify-center tooltip tooltip-right" : ""}`}
                data-tip={SETTINGS_MENU.label}
              >
                <span className="text-xl">{SETTINGS_MENU.icon}</span>
                {!isCollapsed && <span>{SETTINGS_MENU.label}</span>}
              </button>
            </li>
          </ul>

          {/* ================= Logout ================= */}
          <div className="p-4 border-t border-base-300">
            <button className="btn btn-error btn-outline btn-block gap-3">
              <HiOutlineLogout size={20} className={isCollapsed ? "mx-auto" : ""} />
              {!isCollapsed && "Logout"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
