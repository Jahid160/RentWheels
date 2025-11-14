import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';


const MyBookings = () => {
  const [dates, setDates]= useState([])

  useEffect(()=>{
    fetch('http://localhost:3000/my-booking')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setDates(data)
    })
  },[])
  return (
    <div>
      {
    dates.map((data,index) => (
<div key={data._id} className="overflow-x-auto">
  <table className="table">
    {/* head */}
    {/* <thead>
      <tr>
        
        <th>Name</th>
        <th>Cars</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </thead> */}
    <tbody>
      {/* row 1 */}
      <tr>
        <th>
          <label>
            {/* <input type="checkbox" className="checkbox" /> */}
            {index+1}
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-22 w-22">
                <img
                  src={data.hosted_image_url}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{data.provider_name}</div>
              <div className="text-sm opacity-50">{data.provider_email}</div>
            </div>
          </div>
        </td>
        <td>
          {data.location
}
          <br />
          <span className="badge badge-ghost badge-sm">{data.car_name}</span>
        </td>
        <td>{data.category}</td>
        <td className='text-xl text-green-800'>${data.
rent_price_per_day}</td>
        <th>
          <Link to={`/my-booking/${data._id}`} className="btn btn-ghost ">details</Link>
        </th>
      </tr>
      
      
      
    </tbody>
    
    
  </table>
</div>
    ))
    }
    </div>
  );
};

export default MyBookings;