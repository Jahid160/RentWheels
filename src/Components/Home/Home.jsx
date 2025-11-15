import React, { useState } from 'react';
import { data, useLoaderData } from 'react-router';
import Header from '../Header/Banner';
import CarCard from '../CarCard/CarCard';
import RentWithUs from '../RentWithUs/RentWithUs';
import Testimonial from '../Testimonial/Testimonial';
import UseTime from '../Loading/Loading';

const Home = () => {
  const cars = useLoaderData()
  
  // console.log(cars);
  const rentUs = cars.slice(0,4)

  const [searchData, setSearchData]=useState(cars)
  const [loading,setLoading]=useState(false)
  
// console.log(rentUs);
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

const SearchData = (e)=>{
  e.preventDefault()
const searchText = e.target.search.value;
// console.log(searchText);
setLoading(true)

fetch(`http://localhost:3000/search?search=${searchText}`)
.then(res=>res.json())
.then(data=>{
  (data);
  setSearchData(data)
  setLoading(false)
})
}
if(loading){
  <UseTime></UseTime>
}
  return (
  <>
  <div>
    <div className='opacity-95 max-w-[1400px] mb-5'>
            <Header cars={cars}></Header>
          </div>

<form onSubmit={SearchData} className='text-center mt-5 mb-5'>
  <label className="input  rounded-full text-gray-500 ">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input name='search' type="search"  placeholder="Search" />
</label>
<button className='btn btn-primary ml-1 rounded-full'>{loading?'searching...':'Search'}</button>
</form>

  <div className='grid space-y-3 max-w-[1500px] mx-auto  gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>


    {
    searchData.map(car =>(
      <CarCard key={car._id} car={car}></CarCard>
    ))
  }
  </div>
  <div>
  <RentWithUs rentUs={rentUs}></RentWithUs>
  </div>
  <div><Testimonial></Testimonial></div>
  </div>
  </>  
  );
};

export default Home;