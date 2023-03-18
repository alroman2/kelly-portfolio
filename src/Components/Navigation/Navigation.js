// src/components/NavBar.js
import React from 'react';
import FullLogo from './FullLogo';

const Navigation = () => {
  return (
    <header className="bg-white shadow-md top-0 left-0 w-full">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          {/* Add your SVG logo here */}
          {/* <!-- Your SVG Logo --> */}
          <FullLogo/>
        </div>

        {/* Instagram icon */}
        <div className="hidden sm:flex items-center">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            {/* Add your Instagram SVG icon here */}
            {/* <!-- Your Instagram SVG Icon --> */}
          </a>
        </div>

        {/* Hamburger menu */}
        <div className="sm:hidden">
          <button className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;