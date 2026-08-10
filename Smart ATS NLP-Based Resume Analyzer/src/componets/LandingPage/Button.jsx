import React from 'react'

const Button = (props) => {
  return (
    <div>
      <button className={'  flex gap-2 px-10 py-4 w-fit rounded-xl cursor-pointer text-1xl font-semibold text-white ' + props.color + ' ' + props.border + ' '}>
        {props.button}
        {props.logo}
        </button>
    </div>
  )
}

export default Button
