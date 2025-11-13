import React, { use } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const CarDetails = () => {

  const {user} =use(AuthContext)
  const data = useLoaderData();
  
  const {
    car_name,
    category,
    description,
    hosted_image_url,
    location,
    provider_email,
    provider_name,
    rent_price_per_day,
  } = data;
  console.log(data);

  const handleBook = ()=>{
      

      const formData = {
      car_name,
    category,
    description,
    hosted_image_url,
    location,
    provider_email,
    provider_name,
    rent_price_per_day,
    user_name: user?.displayName,
      user_email: user?.email,
    }
    console.log(formData);
  
  }
  
  return (
     <div className='flex justify-center my-3'>
      <div  className="card bg-base-100 w-96 shadow-sm text-black">
  <figure>
    <img
      src={hosted_image_url}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-2xl font-bold">{car_name}</h2>
          <p className="text-sm text-black">{description}</p>

          <div className="mt-3 space-y-1 text-sm">
            <p>
              <span className="font-semibold">Category:</span> {category}
            </p>
            <p>
              <span className="font-semibold">Rent Price:</span> ${rent_price_per_day}/day
            </p>
            <p>
              <span className="font-semibold">Location:</span> {location}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="badge badge-success text-white">Available</span>
            </p>
          </div>

          <div className="divider my-2 opacity-50"></div>

          <div className="text-sm ">
            <p className="font-semibold">Provider Info:</p>
            <p>{provider_name}</p>
            <p className="text-white/80">{provider_email}</p>
          </div>

          <div className="card-actions justify-center w-full ">
      <button onClick={handleBook} className="btn btn-primary w-full">Book Now</button>
    </div>
  </div>
</div>
     </div>
  );
};

export default CarDetails;