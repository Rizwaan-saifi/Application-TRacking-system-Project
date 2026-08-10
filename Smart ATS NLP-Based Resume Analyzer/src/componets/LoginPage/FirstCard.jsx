import { CircleCheckBig } from 'lucide-react';

const FirstCard = (props) => {
  return (
    <div>

        
        
        <div className='flex  gap-[clamp(12px,3vw,24px)]'>
            <div className='bg-slate-950 rounded-full p-[clamp(1px,1vw,0.5px)] '><CircleCheckBig strokeWidth={2} className=' text-indigo-400' /></div>
            <span className=' text-[clamp(0.9rem,1vw,1.5rem)] sm:text-[clamp(0.8rem,1vw,2rem)] md:text-[clamp(0.6rem,1vw,2rem)] lg:text-sm xl:text-[clamp(0.5rem,1vw,3rem)] font-semibold'>{props.text}</span>
        </div>
        
        
      
    </div>
  )
}

export default FirstCard
