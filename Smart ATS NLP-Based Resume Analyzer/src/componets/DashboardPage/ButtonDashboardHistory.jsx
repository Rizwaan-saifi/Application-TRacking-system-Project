import { LayoutDashboard } from 'lucide-react';
import {Link} from 'react-router-dom'

const ButtonDashboardHistory = (props) => {
  return (
    <div>
        <div>
            <Link to={props.link}>

            <button 
                className='py-1.5 flex gap-1 font-bold text-white w-35 
                justify-center rounded-lg cursor-pointer hover:bg-gray-700
                focus:outline-none focus:bg-indigo-400 active:bg-indigo-400"  '>
                {props.logo}{props.button}
            </button>
            
            </Link>
        </div>
      
    </div>
  )
}

export default ButtonDashboardHistory
