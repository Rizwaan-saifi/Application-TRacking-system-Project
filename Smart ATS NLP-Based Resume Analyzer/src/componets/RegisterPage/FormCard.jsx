import React from 'react'

const FormCard = (props) => {

  return (
    <div>

        <div className='flex flex-col space-y-2'>

            <label className='text-base font-bold' >{props.labale}</label>
            <input type={props.type}
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
                className={`border border-gray-900 focus:outline-none
                focus:border-indigo-700 bg-gray-900/20  00
                hover:border-indigo-500 py-2.5 px-22 rounded-xl
                ${props.error ? "border-red-500" : "border-gray-900"} `
               
              }
            />
            {props.error && <p className='text-red-500 text-sm'>{props.error}</p>}
            {props.message && <p className='text-green-500 text-sm pl-[25%]'>{props.message}</p>}

        </div>
      
    </div>
  )
}

export default FormCard
