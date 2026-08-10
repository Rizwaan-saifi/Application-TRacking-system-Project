import React from 'react'
import { Upload } from 'lucide-react';


const CardThird = (props) => {
  return (
    <div>

        <div className='text-center flex flex-col items-center text-white relative z-10  h-55 w-full'>
        
            <div className="bg-indigo-950 px-9 rounded-full py-9 mb-2 sm:mb-4">
        
                <div className="absolute -top-2 ml-9 w-8 h-8 bg-linear-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {props.Notification}
                </div>
                {props.logo}
        
            </div>

            <h3 className='text-sm sm:text-2xl font-bold mb-3 mt-4 '>{props.title}</h3>
            <p className='text-sm sm:text-lg text-gray-400'>{props.para}</p>
        
        </div>
      
    </div>
  )
}

export default CardThird
