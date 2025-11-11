import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomeLayout from "../Layout/HomeLayout";
import { Children } from "react";
import Home from "../Components/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import BrowseCar from "../Pages/BrowseCars/BrowseCar";
import AddCar from "../Pages/AddCar/AddCar";
import MyBookings from "../Pages/MyBookings/MyBookings";
import MyListings from "../Pages/MyListings/MyListings";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        loader: ()=> fetch(`http://localhost:3000/cars`),
        Component: Home
      },
      {
        path: '/browse-cars',
        loader: ()=> fetch(`http://localhost:3000/browse-cars`),
        element: <BrowseCar></BrowseCar>
      },
      {
        path: '/add-car',
        element: <AddCar></AddCar>
      },
      {
        path: '/my-listings',
        element: <MyListings></MyListings>
      },
      {
        path: '/my-bookings',
        element: <MyBookings></MyBookings>
      },
      
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  
])