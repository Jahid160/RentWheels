import React, { use } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';

const MyBookingUpdate = () => {
  const navigate = useNavigate()

  const data = useLoaderData()
  // console.log(data);

  const {user} = use(AuthContext)
  const handleSubmit = (e)=>{
    e.preventDefault();
    const target = e.target;


    const formData = {
      car_name: target.car_name.value,
      description: target.description.value,
      category:target.category.value,
      rent_price_per_day: target.rent_price_per_day.value,
      location: target.location.value,
      hosted_image_url: target.hosted_image_url.value,
      provider_name: user?.displayName,
      provider_email: user?.email,
      status:target.status.value
    }
    // console.log(formData);

    fetch(`http://localhost:3000/my-booking/${data._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
          navigate('/my-booking')
          // console.log(data);
          toast.success('Booking car Updated successfully')
          data.reset()
          
          
        })
        .catch(err =>{
          console.log(err);
        })

  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Update Booking Car
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Car Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Car Name
            </label>
            <input
              name="car_name"
              defaultValue={data.car_name}
              type="text"
              placeholder="Enter car name"
              className="add-from"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              placeholder="Write a short description..."
              name="description"
              defaultValue={data.description}
              className="w-full text-black  border-2 border-gray-200 rounded-xl p-3 h-24 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all resize-none"
            ></textarea>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-gray-700 bg font-semibold mb-2">
              Category
            </label>
            <select name="category"
            defaultValue={data.category}
            className="w-full border-2 border-gray-200 rounded-xl p-3   focus:border-blue-500  text-green-800 focus:ring focus:ring-blue-200 transition-all">
              <option value="">Select Category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          {/* Rent Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Rent Price (Per Day)
            </label>
            <input
              name="rent_price_per_day"
              defaultValue={data.rent_price_per_day}
              type="number"
              placeholder="Enter rent price per day"
              className="add-from"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Location
            </label>
            <input
            name="location"
            defaultValue={data.location}
              type="text"
              placeholder="Enter location (e.g. Dhaka, Bangladesh)"
              className="add-from"
            />
          </div>

          {/* hosted_image_url */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Hosted Image URL
            </label>
            <input
            name="hosted_image_url"
            defaultValue={data.hosted_image_url}
            readOnly
              type="url"
              placeholder="Booking Car hosted_image_url"
              className="add-from"
            />
          </div>
          {/* status */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Car Status
            </label>
            <input 
              name="status"
              defaultValue={data.status}
              readOnly
              type="url"
              
              placeholder="Car Status"
              className="add-from "
            />
          </div>

          {/* Provider Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Provider Name
              </label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="add-from"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Provider Email
              </label>
              <input type="email"
              value={user?.email}
              readOnly className="add-from" />
            </div>
            
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Booking Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyBookingUpdate;