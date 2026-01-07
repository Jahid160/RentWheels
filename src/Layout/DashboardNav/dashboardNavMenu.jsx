import { TiHomeOutline } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { GrUserAdmin } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { MdAddCircle, MdManageAccounts, MdReportGmailerrorred } from "react-icons/md";
import { FaBookReader, FaRegBookmark } from "react-icons/fa";
import { SiManageiq } from "react-icons/si";

export const USER_MENU = (email) => [
  {
    to: "/dashboard",
    label: "Homepage",
    icon: <TiHomeOutline />,
    tip: "Homepage",
    type: "link",
  },

  {
    to: `profile/${email}`,
    label: "My Profile",
    icon: <CgProfile />,
    tip: "MyProfile",
    type: "nav",
  },
];

export const ADMIN_MENU = [
  {
    to: "admin/manage-users",
    label: "Manage Users",
    icon: <MdManageAccounts />,
    tip: "ManageUsers",
    type: "nav",
  },


  // {
  //   to: "admin/profile",
  //   label: "Admin Profile",
  //   icon: <GrUserAdmin />,
  //   tip: "AdminProfile",
  //   type: "nav",
  // },
];

export const SETTINGS_MENU = {
  label: "Settings",
  icon: <IoSettingsOutline />,
  tip: "Settings",
};
