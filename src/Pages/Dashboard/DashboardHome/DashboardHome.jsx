import React from "react";

import useRole from "../../../hooks/useRole";
import UserDashboardHome from "../UserDashboardHome";
import AdminDashboardHome from "../AdminDashboardHome";
import UseTime from "../../../Components/Loading/Loading";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();
  console.log(role);
  if (roleLoading) {
    return <UseTime></UseTime>;
  }
  if (role == "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  } else {
    return <UserDashboardHome></UserDashboardHome>;
  }
};

export default DashboardHome;
