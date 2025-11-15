import React from 'react';
import { Link } from 'react-router';


const ErrorPage = () => {
  
  return (
    <div className=' text-center items-center text-black'>
      <h1>ErrorPage</h1>
      <Link to={'/'}>Back Home</Link>
    </div>
  );
};

export default ErrorPage;