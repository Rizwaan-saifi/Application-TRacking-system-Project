import React from 'react'
import { Upload } from 'lucide-react';
import { Clipboard } from 'lucide-react';
import { ChartColumn } from 'lucide-react';
import CardThird from './CardThird';


const ThirdPage = () => {
  return (
    <div className='bg-gray-950 '>
        <div className=''>
          {/* first content */}
          <div className='text-center pb-15 sm:pb-25 pt-30 text-white '>

            <h1 className=' text-5xl font-extrabold'>How it works</h1>
            <p className='pt-6 text-xl font-bold text-sky-400'>Three simple steps to a better resume.</p>
            
          </div>

          {/* second content of this page */}

          <div className='grid md:grid-cols-3 gap-15 sm:gap-8 px-40 pb-29 relative'>
            <div className=" absolute top-13 left-[15%] right-[15%] h-0.5 bg-linear-to-r from-transparent via-indigo-500/30 to-transparent"></div>

            <CardThird title ='Upload Resume' para ='Upload your current resume in PDF or DOCX format.' Notification='1' logo ={<Upload className='text-sky-400 ' />} />
            <CardThird title ='Paste Job Description' para ='Copy and paste the description of the job you want.' Notification='2' logo ={<Clipboard className='text-sky-400 ' />} />
            <CardThird title ='Get Your Score' para ='Our AI analyzes the match and gives you an action plan.' Notification='3' logo ={<ChartColumn className='text-sky-400 ' />} />

          </div>
            
          

      </div>
      
    </div>
  )
}

export default ThirdPage
