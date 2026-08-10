import React from 'react'
import { Link } from 'react-router-dom'
import NavCard from '../NavCard'
import { LayoutDashboard } from 'lucide-react';
import { Clock4 } from 'lucide-react';
import ButtonDashboardHistory from './ButtonDashboardHistory';  

const DashboardHistoryCard = () => {
  return (
    <div>
      {/* This is for last div  */}
        <div className='bg-gray-950 backdrop-blur-sm border-b border-gray-700 fixed  top-0 left-0 w-full z-50'>

            {/* This div is for contain all content */}
           <div className='flex gap-80 items-center px-10 sm:px-6 md:px-40 py-3'>

                {/* This div is for logo */}
               <Link to="/"> <NavCard  className="" /></Link>
                

                {/* This div is for buttons */}
                <div className='flex gap-90 items-center'>

                    <div className=' flex  gap-1.5'>
                        <ButtonDashboardHistory link="/dashboard" logo={<LayoutDashboard strokeWidth={1} />} button="Dashboard" />
                        <ButtonDashboardHistory link="/history" logo={<Clock4 strokeWidth={1} />} button="History" />
                    </div>
                    <div className='bg-indigo-400 rounded-full px-5 py-5'></div>

                </div>
           </div>
            
        </div>
      
    </div>
  )
}

export default DashboardHistoryCard
