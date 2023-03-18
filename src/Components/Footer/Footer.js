// src/components/Footer.js
import React from 'react';
import logo from '../../Assets/Logo/icon.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white shadow-md w-full py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center">
          {/* Add your SVG logo here */}
          {/* <!-- Your SVG Logo --> */}
          <img src={logo} alt="branding icon" className='h-14 w-14 md:h-28 md:w-28 opacity-60'/>
        </div>

        {/* Copyright and Year */}
        <div className="text-gray-700 text-sm md:text-xl">
          <p>
            &copy; {currentYear} Kels Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;