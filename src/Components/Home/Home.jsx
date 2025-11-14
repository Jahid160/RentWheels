import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import Header from '../Header/Banner';
import CarCard from '../CarCard/CarCard';

const Home = () => {
  const cars = useLoaderData()
  
  console.log(cars);
  

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
  <div className='opacity-95 max-w-[1400px] mb-5'>
            <Header cars={cars}></Header>
          </div>
  <div className='grid space-y-3 max-w-[1500px] mx-auto  gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
    {
    cars.map(car =>(
      <CarCard key={car._id} car={car}></CarCard>
    ))
  }
  </div>
  </>  
  );
};

export default Home;