import React from 'react'
import DashboardHistoryCard from '../componets/DashboardPage/DashboardHistoryCard'
import TopCard from '../componets/DashboardPage/TopCard'
import { ChartNoAxesColumn } from 'lucide-react';
import { Award } from 'lucide-react';
import { Activity } from 'lucide-react';
import MiddelCard from '../componets/DashboardPage/MiddelCard';
import { Zap } from 'lucide-react';
import BottomCard from '../componets/DashboardPage/BottomCard';
import Logo from '../componets/DashboardPage/Logo';
import Button from '../componets/DashboardPage/Button';





const DashboardPage = () => {
  return (
    <div>
        
        <div className="h-full w-full bg-slate-950">

            {/* Dashboard Navbar  */}
            <DashboardHistoryCard/>

            {/* Dashboard Top Card */}

            <div className='flex gap-3 justify-center pt-29 ' >

                <TopCard logo={<ChartNoAxesColumn />} title="Total Analyses" no="3" bg="bg-gray-900/50" text='text-gray-400'/>
                <TopCard logo={<Award />} title="Best Score" no="92%" bg='bg-green-400' text='text-green-400'/>
                <TopCard logo={<Activity />} title="Avg Score" no="67%" bg='red' text='text-red'/>

            </div>

            <div className="text-white flex flex-col mt-15 ml-46 gap-3 ">
                <h1 className='text-4xl font-extrabold'>New Analysis</h1>
                <p className='font-semibold text-gray-400'>Upload your resume and paste the job description to get your match score.</p>
            </div>

            {/* Middele card of dashboard page */}

            <div className=' grid grid-cols-2 px-38  '>
                <div className=' pl-10 pt-10 pb-10'>

                    <MiddelCard  

                        no='1' title='Your Resume' 
                        logo={<Logo/>} heading='Click to upload or drag and drop' 
                        para='PDF, DOCX, or TXT (max. 5 MB)'
                        button={<Button/>}
                        bord={"border-dashed border-indigo-700"}
                        bgcolor={"hover:bg-indigo-700/5"}

                    />

                </div>
                <div className=' pr-10 pt-10 pb-10' >
                    <MiddelCard  
                        no ='2' 
                        title='Job Description'
                        bord="border-gray-400"
                        bgcolor={"hover:border-indigo-500"}
                        inpute={
                            <textarea 
                                 placeholder='Past the full job description here....' 
                                 className=' pt-5 pl-5 pr-5 w-full h-full text-white -mt-33 rounded-2xl
                                 focus:outline-none focus:border-indigo-400 '
                                >

                            </textarea>
                        }
                    />
                </div>
            </div>

            <div className='text-white hover:text-amber-400 hover:border  border-amber-400/50 flex gap-2 bg-amber-400 hover:bg-gray-900 w-70 h-15 justify-center rounded-xl items-center ml-148'>
                <div className=''><Zap /></div>
                <button className='font-extrabold text-lg cursor-pointer'>Analyze Match</button>
            </div>


            <div className=' flex flex-col mt-20 ml-46 w-268 text-white items-center'>

                <h1 className='text-3xl font-extrabold -ml-210'>Recent Analyses</h1>

                <div className='flex gap-3 mt-7 mb-13'>

                    <BottomCard 
                        logobg='bg-green-900/60'
                        border='border-amber-900'
                        jobtitle='Senior Frontend Engineer' 
                        company='Stripe'
                        time='2 days ago'
                        score='82'
                    />
                    <BottomCard 
                        logobg='bg-yellow-700/50'
                        jobtitle='React Developer'
                        company='Vercle'
                        time='1 week ago'
                        score='64' 
                    />
                    <BottomCard 
                        logobg='bg-green-900/90'
                        jobtitle='Product Manager'
                        company='Airbnb'
                        time='2 week ago'
                        score='91'  
                    />

                </div>

            </div>


        </div>
      
    </div>
  )
}

export default DashboardPage
