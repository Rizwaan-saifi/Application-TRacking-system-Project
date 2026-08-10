
import { Sparkles } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import Button from './Button';
import { Link } from 'react-router-dom';


const Landing = () => {

    const token = localStorage.getItem("token");
  return (
    <div>
        
        <div className='h-screen px-4 sm:px-10 md:px-20 py-20 sm:py-35 bg-linear-to-r from-black via-black to-   '>

            <div className='  mt-10 sm:mt-3 md:mt-5 lg:mt-2 flex gap-2 sm:gap-3 justify-center w-fit py-1 sm:py-1.5 lg:py-1  px-4 mx-auto rounded-full border border-indigo-400 text-white text-xs sm:text-sm md:text-base'>
               <Sparkles className='text-indigo-400 text-ms'/>
                <span className="pt-1 lg:mb-1 text-xs">Now Powerd By ResuMatch</span>
            </div>
            
            <div className='text-center mt-14 relative'>
              <div className=" absolute left-[1%] right-[1%] h-30 sm:h-30 md:h-40 lg:h-50 bg-linear-to-r from-transparent via-indigo-500/30 to-transparent"></div>

                <h1 className='text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white'>
                    Stop guessing.
                    <br />
                    Start <span className='text-indigo-400 '>matching.</span>
                </h1>
                <p className='mt-12 sm:mt-14 md:mt-17 lg:mt-10 text-sm sm:text-base md:text-base lg:text-[20px] max-w-5xl items-center mx-auto text-gray-400 px-4 sm:px-8 md:px-8 lg:px-40 mb-6 sm:mb-10'>
                 Upload your resume and the job description. Our AI analyzes your fit, identifies missing keywords, and gives you actionable feedback to beat the ATS and land the interview.
                </p>

            </div>

            <div className=' flex flex-col sm:flex-row items-center  gap-7 mt-12 sm:mt-14 lg:mt-8 justify-center mb-20 '>
                {token ? (
                    <>
                    <Link to="/dashboard"><Button  button='Analyze Resume Free' logo={<ArrowRight/>} color='bg-indigo-500' /></Link> 
                    <Link to="/history"><Button button='View Sample Reports' border = 'border-1 border-indigo-400' color='bg-gray-900/90' /></Link>

                    </>
                ):(
                    <>
                        <Link to="/register"><Button  button='Analyze Resume Free' logo={<ArrowRight/>} color='bg-indigo-500' /></Link>
                        <Link to="/register"><Button button='View Sample Reports' border = 'border-1 border-indigo-400' color='bg-gray-900/90' /></Link>
 
                    </>
                )}

                {/* <Button button='View Sample Reports' border = 'border-1 border-indigo-400' color='bg-gray-900/90' /> */}

            </div>
            
          

        </div>
       
    </div>
  )
}

export default Landing
