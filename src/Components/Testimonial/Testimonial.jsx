import React from 'react';
import { FaQuoteLeft } from "react-icons/fa";
const Testimonial = () => {
  const testimonialsData = [
  {
    name: "Rahim Uddin",
    location: "Dhaka, Bangladesh",
    review: "The car was in great condition and the booking was super smooth!",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sara Akter",
    location: "Chattogram, Bangladesh",
    review: "Amazing service! I highly recommend this rental platform.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "John Smith",
    location: "Sylhet, Bangladesh",
    review: "Affordable prices and very friendly support team.",
    photo: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

  return (
    <div className="py-5 ">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">What Our Customers Say</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <FaQuoteLeft className="text-blue-500 text-2xl mb-3" />

              <p className="text-gray-700 italic mb-4">"{item.review}"</p>

              <div className="flex items-center justify-center gap-3">
                <img
                  src={item.photo}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-black">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;