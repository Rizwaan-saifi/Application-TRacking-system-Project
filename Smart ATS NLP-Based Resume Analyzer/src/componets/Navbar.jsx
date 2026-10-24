import React from 'react';
import NavCard from './NavCard';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <div>
      <div className='bg-gray-950/80 backdrop-blur-md border-b border-gray-800 fixed top-0 left-0 w-full z-50'>
        <div className='max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3.5'>
          <Link to="/">
            <NavCard />
          </Link>

          <div className='flex gap-3 sm:gap-5 items-center'>
            {token ? (
              <>
                <Link className='font-bold text-white text-sm sm:text-base hover:text-indigo-400 transition' to="/dashboard">
                  Dashboard
                </Link>
                <Link className='font-bold text-white text-sm sm:text-base hover:text-indigo-400 transition' to="/history">
                  History
                </Link>
                <button
                  className='bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm rounded-xl cursor-pointer transition'
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className='font-bold text-gray-300 hover:text-white text-sm sm:text-base transition' to="/login">
                  Log in
                </Link>
                <Link to="/register">
                  <button className='bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-1.5 sm:py-2 px-3.5 sm:px-4 text-xs sm:text-sm rounded-xl cursor-pointer shadow-md shadow-indigo-600/20 transition'>
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
