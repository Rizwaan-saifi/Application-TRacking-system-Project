import React from 'react'

const BottomCard = (props) => {
  return (
    <div>

        <div className='hover:border-indigo-400/50 bg-gray-900/90 border border-gray-700 w-87 h-35 rounded-2xl flex justify-center pt-7'>

            <button className='flex gap-6 cursor-pointer'>

                <div className='flex flex-col   '>
                    <h3 className='text-base font-bold mr mb-1'>{props.jobtitle}</h3>
                    <p className='text-gray-400 mr-39 mb-4'>{props.company}</p>
                    <p className='text-sm text-gray-400 mr-32'>{props.time}</p>
                </div>

                <div className='mt-2 space-y-1'>
                    <div className={`${props.logobg} ${props.border} px-5 py-4 rounded-full`}>{props.score}</div>
                    <span className='text-xs text-gray-400'>SCORE</span>
                </div>

            </button>

        </div>
      
    </div>
  )
}

export default BottomCard
