import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import CarCard from '../../Components/CarCard/CarCard';

const MyListings = () => {
  const {user} = use(AuthContext)
    const [models, setModels] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {

        fetch(`http://localhost:3000/my-listing?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
        .then(res=> res.json())
        .then(data=> {
            
            setModels(data)
            setLoading(false)
        })

    }, [user])


    if(loading) {
        return <div> Please wait ... Loading...</div>
    }

   
  console.log(models);
  return (
    
<div className='grid space-y-3 max-w-[1400px] mx-auto gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
    {
    models.map(car =>(
      <div className='flex justify-center my-3'>
      <div  className="card bg-base-100 w-96 shadow-sm text-black">
  <figure>
    <img
      src={car.hosted_image_url}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-2xl font-bold">{car.car_name}</h2>
          <p className="text-sm text-black">{car.description}</p>

          <div className="mt-3 space-y-1 text-sm">
            <p>
              <span className="font-semibold">Category:</span> {car.category}
            </p>
            <p>
              <span className="font-semibold">Rent Price:</span> ${car.rent_price_per_day}/day
            </p>
            <p>
              <span className="font-semibold">Location:</span> {car.location}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="badge badge-success text-white">Available</span>
            </p>
          </div>

          <div className="divider my-2 opacity-50"></div>

          <div className="text-sm ">
            <p className="font-semibold">Provider Info:</p>
            <p>{car.provider_name}</p>
            <p className="text-white/80">{car.provider_email}</p>
          </div>

          <div className=" w-full">
      <div className='flex justify-between gap-3'>
        <button className="btn btn-primary w-1/2">Update</button>
      <button className="btn btn-primary w-1/2">Delete</button>
      </div>
    </div>
  </div>
</div>
     </div>
    ))
  }
  </div>
  );
};

export default MyListings;