import React from 'react'

const Card = (props) => {
  return (
    <div className=''>

        <div className='flex flex-col bg-gray-900/50 w-[clamp(150px, 20vw, 400px)] h-40 sm:h-37 md:h-90 lg:h-62 pl-6 sm:pl-7 md:pl-8 lg:pl-8 pt-3 sm:pt-5 md:pt-10 lg:pt-10 rounded-3xl  border border-indigo-400 hover:border-sky-400 '>

            <div className='bg-indigo-500 w-12 p-3 rounded-xl  '>

                {props.logo}

            </div>

            <div className='mt-3 md:mt-9 lg:mt-6 sm:gap-y-1 md:gap-y-4 lg:gap-y-3 flex flex-wrap'>

                <h3 className=' text-[clamp(14px, 2vw, 24px)] font-extrabold  flex-wrap'>{props.title}</h3>
                <p className=" md:text-[clamp(14px, 2.5vw, 24px)] pr-8 text-gray-400 flex-wrap">{props.para}</p>
            </div>

        </div>

    </div>
  )
}

export default Card
