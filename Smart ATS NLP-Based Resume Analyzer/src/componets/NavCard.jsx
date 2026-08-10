import { FileText } from 'lucide-react';
import { Link } from 'lucide-react';


const NavCard = () => {
  return (
    <div>
      

        <div className='flex gap-2'>
            <FileText className='w-8 h-8 bg-indigo-400 p-2 rounded-xl text-white' />
            <span className='py-1 font-bold text-x text-white'>ResuMatch</span>
            

        </div>
      
    </div>
  )
}

export default NavCard
