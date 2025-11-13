import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import CarCard from '../../Components/CarCard/CarCard';

const BrowseCar = () => {
  const cars = useLoaderData()
  // const [singleCar, setSingleCar] =useState(cars)
  const {_id} = cars
  console.log(cars, _id);
  return (
    <div className='grid space-y-3 max-w-[1400px] mx-auto gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
    {
    cars.map(car =>(
      <CarCard key={car._id} car={car}></CarCard>
    ))
  }
  </div>
  );
};

export default BrowseCar;