import React, { use, useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import UseTime from '../../Components/Loading/Loading';

const CarDetails = () => {
const navigate = useNavigate();
const {id} = useParams()
  const {user} =use(AuthContext)
  // const data = useLoaderData();
  const [updateUI, setUpdateUI]= useState(false)
const [data, setData] =useState({})
const [loading, setLoading] = useState(true);
  


useEffect(() => {
    fetch(`http://localhost:3000/browse-cars/${id}`, {
     
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        // console.log(" Api called!")
        // console.log(data);
        setLoading(false);
      });
  }, [user, id, setUpdateUI]);

  // const {
  //   car_name,
  //   category,
  //   description,
  //   hosted_image_url,
  //   location,
  //   provider_email,
  //   provider_name,
  //   rent_price_per_day,
  // } = data;
  // console.log(data,data._id);

  const handleBook = () => {
  const bookNowData = {
    car_name: data.car_name,
    category: data.category,
    description: data.description,
    hosted_image_url: data.hosted_image_url,
    location: data.location,
    provider_email: user?.email,
    created_at: new Date(),
    provider_name: data.provider_name,
    rent_price_per_day: data.rent_price_per_day,
  };

  // 1️⃣ POST booking
  fetch(`http://localhost:3000/userDB/${data._id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookNowData),
  })
    .then((res) => res.json())
    .then(() => {
      // 2️⃣ PATCH status update
      return fetch(`http://localhost:3000/browse-cars/status/${data._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "unavailable" }),
      });
    })
    .then((res) => res.json())
    .then(() => {
      toast.success("Car booked and status updated!");

      // Update UI
      setData((prev) => ({ ...prev, status: "unavailable" }));
      setUpdateUI(!updateUI);
    })
    .catch((err) => console.error(err));
};



    if(loading){
  return <UseTime></UseTime>
}
    //   const formData = {
    //   car_name,
    // category,
    // description,
    // hosted_image_url,
    // location,
    // provider_email,
    // provider_name,
    // rent_price_per_day,
    // user_name: user?.displayName,
    //   user_email: user?.email,
    // }
    // console.log(formData);
  
  

  
  
  return (
     <div className='flex justify-center my-3'>
      <div  className="card bg-base-100 w-96 shadow-sm text-black">
  <figure>
    <img
      src={data?.hosted_image_url}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-2xl font-bold">{data.car_name}</h2>
          <p className="text-sm text-black">{data.description}</p>

          <div className="mt-3 space-y-1 text-sm">
            <p>
              <span className="font-semibold">Category:</span> {data.category}
            </p>
            <p>
              <span className="font-semibold">Rent Price:</span> ${data.rent_price_per_day}/day
            </p>
            <p>
              <span className="font-semibold">Location:</span> {data.location}
            </p>
            <p className="text-gray-600  text-sm mb-4">{data.status == 'unavailable'?<span className='badge badge-error text-gray'>{data.status}</span>:<span className='badge badge-success text-gray'>{data.status}</span>}</p>
          </div>

          <div className="divider my-2 opacity-50"></div>

          <div className="text-sm ">
            <p className="font-semibold">Provider Info:</p>
            <p>{data.provider_name}</p>
            <p className="text-white/80">{data.provider_email}</p>
          </div>

          <div className="card-actions justify-center w-full ">
      {
        data.status == "unavailable"?<button disabled className="btn btn-primary w-full disabled:bg-gray-400 disabled:cursor-not-allowed">Book Now</button>:<button onClick={handleBook} className="btn btn-primary w-full">Book Now</button>
      }
    </div>
  </div>
</div>
     </div>
  );
};

export default CarDetails;