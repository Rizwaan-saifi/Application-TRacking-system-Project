import React from 'react'
import Card from './Card'
import { Target } from 'lucide-react';
import { Zap } from 'lucide-react';
import { CircleCheckBig } from 'lucide-react';



const secondPage = () => {
  return (
    <div>

        {/* This is Page div */}
        <div className='text-white bg-indigo-900 h-screen'>

            {/* This div is first content of this page */}
            <div className='text-center pt-10 sm:pt-15 md:pt-24 lg:pt-35 '>

                <h1 className=' text-4xl sm:flex-wrap  sm:text-5xl font-extrabold'>
                    Everything you need to beat the bots
                </h1>
                <p className='text-sm sm:text-lg lg:text-xl md:pt-12 text-gray-400 py-6'>
                    Precision tools designed for serious job seekers.
                </p>

            </div>

            {/* This div is second content of this page */}
            <div className=' flex flex-col sm:flex-col  md:flex-row items-center lg:flex-row px-2  md:px-30 lg:px-40  md:pt-8 lg:pt-12 gap-y-2  md:gap-4 lg:gap-3 justify-center'>

                <Card title='Precision Match Score' para='Get a clear 0–100 score showing exactly how well you fit the role.' logo={<Target />} />
                <Card  title='Keyword Gap Analysis' para='Instantly see which crucial skills and keywords your resume is missing.' logo={<Zap />}/>
                <Card title='Actionable Feedback' para='Receive specific, line-by-line suggestions to improve your bullet points.' logo={<CircleCheckBig />} />

            </div>

            
        </div>
    </div>
  )
}

export default secondPage
