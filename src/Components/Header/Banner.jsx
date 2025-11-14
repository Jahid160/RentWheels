import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './BannerStyle.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';


const Header = ({cars}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  console.log(cars);

  const bannerSliced = cars.slice(0,3)
  
  return (
    
      


  <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {
          bannerSliced.map(banner => (
            <SwiperSlide key={banner._id}>
          <img src={banner.hosted_image_url
} />
        </SwiperSlide>
          ))
        }
        
          
        
      </Swiper>
      
    </>

   
  );
};

export default Header;