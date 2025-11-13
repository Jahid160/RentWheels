import React from 'react';
import { Link } from 'react-router';

const CarCard = ({car}) => {
  return (
    <div key={car._id} className="max-w-sm bg-white shadow-lg rounded-2xl overflow-hidden border hover:shadow-2xl transition-all duration-300 mx-auto">
      <img
        src={car.hosted_image_url}
        alt={car.car_name}
        className="w-full h-56 object-cover"
      />
      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{car.car_name}</h2>
        {/* <p className="text-gray-600 text-sm mb-4">{car.description}</p> */}

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

        <Link to={`/cars-details/${car._id}`} className="mt-5 w-full btn bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition-colors">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;