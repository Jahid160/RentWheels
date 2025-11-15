import React from 'react';
import { Link } from 'react-router';
import errorImg from '../../assets/errorpageImage.png'


const ErrorPage = () => {
  
  return (
    <div className='   text-black flex flex-col justify-center items-center '>
      
      <div>
        <img className='relative' src={errorImg} alt="errorImg" />
      </div>
      <Link className=' absolute btn btn-active btn-secondary w-xs mx-5 mt-[600px] ' to={'/'}>Back Home</Link>
    </div>
  );
};

export default ErrorPage;