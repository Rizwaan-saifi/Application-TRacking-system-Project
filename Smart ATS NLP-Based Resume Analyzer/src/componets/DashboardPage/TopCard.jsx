import React from 'react'

const TopCard = (props) => {
  return (
    <div>

        <div className='bg-gray-900/90 h-22 w-90 rounded-2xl flex gap-9 border border-gray-700 '>
            <div className='text-green-400 bg-indigo-400 px-3 py-3 rounded-2xl items-center ml-9 mt-5 mb-5' >
                {props.logo}
            </div>
            <div className='text-white mt-5'>
                <h3 className='text-gray-400 font-extrabold'>{props.title}</h3>
                <p className='text-2xl font-extrabold '>{props.no}</p>
            </div>
        </div>
      
    </div>
  )
}

export default TopCard
