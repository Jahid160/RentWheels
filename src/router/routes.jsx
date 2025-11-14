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
import CarDetails from "../Pages/CarDetails/CarDetails";
import PrivateRoute from "./PrivateRoute";
import MyListingUpdate from "../Pages/MyListingUpdate/MyListingUpdate";
// import MyListingDelete from "../Pages/MyListingDelete/MyListingDelete";
import MyBookingUpdate from "../Pages/MyBookingUpdate/MyBookingUpdate";

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
        element:(
          <PrivateRoute>
            <AddCar></AddCar>
          </PrivateRoute>
        )
        
      },
      {
        path: '/my-listing',
        element:(
          <PrivateRoute>
            <MyListings></MyListings>
          </PrivateRoute>
        ),
        
      },
      {
            path:'/listing-update/:id',
            loader: ({params})=> fetch(`http://localhost:3000/browse-cars/${params.id}`),
            element: <PrivateRoute>
              <MyListingUpdate></MyListingUpdate>
            </PrivateRoute>
          },
      // {
      //       path:'/listing-delete/:id',
      //       loader: ({params})=> fetch(`http://localhost:3000/browse-cars/${params.id}`),
      //       element: <PrivateRoute>
      //         <MyListingDelete></MyListingDelete>
      //       </PrivateRoute>
      //     },
      {
        path: '/my-booking',
        
        element:(
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        )
      },
      {
      path: '/my-booking/:id',
      loader: ({params})=> fetch(`http://localhost:3000/my-booking/${params.id}`),
      element: <PrivateRoute>
        <MyBookingUpdate></MyBookingUpdate>
      </PrivateRoute>
      },
      {
        path: '/cars-details/:id',
        // loader: ({params}) => fetch(`http://localhost:3000/browse-cars/${params.id}`),
        element: <CarDetails></CarDetails>
      }
      
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