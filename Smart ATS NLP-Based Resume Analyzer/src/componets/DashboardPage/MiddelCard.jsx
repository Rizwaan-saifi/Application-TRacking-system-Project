import React from 'react'

const MiddelCard = (props) => {


  return (
    <div>

        <div className='bg-slate-800/50 border border-gray-700 w-130 h-105 rounded-2xl' >
            <div className='text-white flex flex-row mt-9 ml-8 gap-3'>
                <div className='px-3 py-1 rounded-full bg-indigo-400 text-gray-900 font-extrabold  '> {props.no}</div>
                <p className='text-lg font-extrabold pt-0.5 '>{props.title}</p>
            </div>


            <div className=' h-88 w-130 rounded-2xl flex justify-center'>
                <div className={`h-73 w-110 rounded-2xl mt-7 border ${props.bgcolor} ${props.bord}`}>
                  <div className='items-center flex flex-col  text-white p-10 '>
                    {props.logo}
                    <div className='flex flex-col space-y-2 mt-4 items-center mb-7 '>
                      <span className='text-xl font-extrabold'>{props.heading}</span>
                      <span className='text-gray-400'> {props.para}</span>
                    </div>
                    {props.button}
                  </div>
                  {props.inpute}
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default MiddelCard
