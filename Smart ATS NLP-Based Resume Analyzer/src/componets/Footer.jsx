import React from 'react'
import NavCard from './NavCard'

const Footer = () => {
  return (
    <div className='bg-gray-950  flex justify-center text-white py-20  h-1 bg-linear-to-r from-transparent via-indigo-500/60 to-transparent border-t border-gray-700'>
        <div className='flex flex-col  sm:flex md:flex-row  gap-5 sm:gap-[clamp(20px,20vw,200px)] '>
            <NavCard/>
            <h4 className='text-xs sm:text-sm'>© 2026 ResuMatch Inc. All rights reserved.</h4>
        </div>
      
    </div>
  )
}

export default Footer
