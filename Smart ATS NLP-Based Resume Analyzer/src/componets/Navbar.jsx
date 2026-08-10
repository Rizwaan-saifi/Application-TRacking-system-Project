import React from 'react'
import NavCard from './NavCard';
import{Link} from 'react-router-dom'
import {Route, Routes} from 'react-router-dom'



const Navbar = () => {

  const token = localStorage.getItem("token");

  return (
    <div>
        {/* This is for last div  */}
        <div className='bg-gray-950 backdrop-blur-sm border-b border-gray-700 fixed  top-0 left-0 w-full z-50'>

            {/* This div is for contain all content */}
           <div className='flex justify-between items-center px-10 sm:px-6 md:px-40 py-3'>

                {/* This div is for logo */}
               <Link to="/"> <NavCard  className="" /></Link>
                

                {/* This div is for buttons */}
                <div className='flex gap-3 sm:gap-4 md:gap-5 items-center'>

                   {token ? (
                      <>
                        <Link to="/dashboard">Dashboard</Link>
                        <button className='bg-indigo-400 text-white font-bold py-1 sm:py-2  px-3 sm:px-4 sm:text-base rounded-xl cursor-pointer' onClick={() => {
                          localStorage.removeItem("token");
                          window.location.reload();
                        }}>
                          Logout
                        </button>
                      </>
                      ) : (
                      <>

                        <Link className='font-bold text-white  sm:text-base' to="/login">Log in</Link>
                        <Link to="/register"><button className='bg-indigo-400 text-white font-bold py-1 sm:py-2  px-3 sm:px-4 sm:text-base rounded-xl cursor-pointer'>Get Started</button></Link>
                      </>
                    )}

                </div>
           </div>
            
        </div>
      
    </div>
  )
}

export default Navbar
