import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import UseTime from '../../Components/Loading/Loading';


const MyBookings = () => {
const navigate = useNavigate()
  const {user} = use(AuthContext)
    
    
    const [loading, setLoading] = useState(true)

  const [dates, setDates]= useState([])

  // useEffect(()=>{
  //   fetch('http://localhost:3000/my-booking')
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data);
  //     setDates(data)
  //   })
  // },[])

  useEffect(()=> {
  
          fetch(`http://localhost:3000/my-booking?email=${user.email}`, {
              headers: {
                  authorization: `Bearer ${user.accessToken}`
              }
          })
          .then(res=> res.json())
          .then(data=> {
              
              setDates(data)
              setLoading(false)
          })
  
      }, [user])

if(loading) {
        return <UseTime></UseTime>
    }

  const handleDelete = (_id) =>{
      Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      
  
  
      fetch(`http://localhost:3000/my-booking/${_id}`, {
                  method: 'DELETE',
                  
                  
                })
                .then(res => res.json())
                .then(data => {
                  setDates(prev => prev.filter(item => item._id !== _id));
                  // console.log(data);
                  Swal.fire({
        title: "Deleted!",
        text: "Your car has been deleted.",
        icon: "success"
      });
      navigate('/my-booking')
      
                  toast.success('Booking Card Deleted successfully')
                })
                .catch(err =>{
                  console.log(err);
                })
  
    }
  });
      }


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
        <td className='text-black font-bold'>${data.rent_price_per_day}</td>
        <button onClick={()=>handleDelete(data._id)} className='btn mt-8'>Delete</button>
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