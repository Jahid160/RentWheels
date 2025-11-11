import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import Header from '../Header/Banner';

const Home = () => {
  const cars = useLoaderData()
  
  const [singleCar, setSingleCar] = useState(cars)
console.log(singleCar);
//  const car = {
//     car_name: "Range Rover Evoque",
//     description:
//       "A luxurious and rugged SUV built for both city comfort and off-road adventure.",
//     category: "SUV",
//     rent_price_per_day: 11000,
//     location: "Dhaka, Bangladesh",
//     hosted_image_url:
//       "https://tse4.mm.bing.net/th/id/OIP.XfKAuH6uswqFmzHaLv_W0AHaEK?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",
//     provider_name: "RoyalDrive",
//     provider_email: "contact@royaldrive.com",
//   };

  return (
  <>
  <div className='opacity-95 max-w-[1400px]'>
            <Header></Header>
          </div>
  <div className='grid space-y-3 max-w-[1500px] mx-auto  gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
    {
    cars.map(car =>(
      <div key={car._id} className="max-w-sm bg-white shadow-lg rounded-2xl overflow-hidden border hover:shadow-2xl transition-all duration-300 mx-auto">
      <img
        src={car.hosted_image_url}
        alt={car.car_name}
        className="w-full h-56 object-cover"
      />
      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{car.car_name}</h2>
        <p className="text-gray-600 text-sm mb-4">{car.description}</p>

        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">
            {car.category}
          </span>
          <span className="font-semibold text-green-600">
            ${car.rent_price_per_day}/day
          </span>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          📍 <span>{car.location}</span>
        </div>

        <div className="border-t pt-3">
          <p className="text-sm text-gray-700 font-semibold">
            Provider: {car.provider_name}
          </p>
          <p className="text-xs text-gray-500">{car.provider_email}</p>
        </div>

        <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition-colors">
          View Details
        </button>
      </div>
    </div>
    ))
  }
  </div>
  </>  
  );
};

export default Home;