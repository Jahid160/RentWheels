import React from 'react';
import { FaHandshake, FaWallet, FaUserShield, FaHeadset } from "react-icons/fa";

const RentWithUs = ({rentUs}) => {
  const iconMap = [{
icon:<FaHandshake size={35} />
  },{
icon:<FaWallet size={35} />
  },{
icon: <FaUserShield size={35} />
  },{
icon: <FaHeadset size={35} />
  }];
  
  return (
    <div className="py-16 ">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Why Rent With Us</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {rentUs.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-md rounded-xl hover:shadow-xl transition"
            >
              <div className="text-blue-600 mb-4 flex justify-center">{
                iconMap[index].icon
                }</div>
              <h3 className="text-xl  mb-2 text-black font-bold">{item.
car_name}</h3>
              <p className="text-gray-600">{item.description
}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentWithUs;