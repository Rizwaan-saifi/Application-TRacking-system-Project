import React from 'react'
import { Form, Star } from 'lucide-react';
import NavCard from '../componets/NavCard';
import FormCard from '../componets/RegisterPage/FormCard';
import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

const RagisterPage = () => {

     
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        ConfirmPassword: ''
      })

      const [error, setError] = useState("");
      const [message, setMessage] = useState("");
     

     const handleChange =  (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      if (formData.password !== formData.ConfirmPassword) {
        setError("Passwords do not match");
        return;
      } else {
        setError("");
      }
      
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/user/register",

          formData
        );
        if (res.data.email === formData.email){
          setMessage("User registered successfully");
          setFormData({
            name: '',
            email: '',
            password: '',
            ConfirmPassword: ''
          })
          const setime = setTimeout(()=>{
            setMessage("");
          }, 3000)
        }
        
      }
      catch (error) {
        const backendMessage =
          typeof error.response?.data?.detail === "string"
          ? error.response.data.detail
          : error.response?.data?.detail?.[0]?.msg || "Something went wrong";
        setError(backendMessage);
      }
    }
     



  return (
    <div >
      <div 
        className='flex flex-col md:flex-row h-full   '>

        <div 
            className='bg-orange-600 sm:bg-lime-500 md:bg-indigo-700 lg:bg-green-300 xl:bg-gray-950 
            order-2 md:order-1   w-[62.5vw] flex items-center justify-center'
          >
 
          <div 
              className= 'bg-gray-900/90 flex flex-col rounded-3xl text-white md:h-[52%] md:w-[75%] lg:h-[56%] xl:h-[58%] lg:w-[55%] xl:w-[49.3%] border-l-3 border-violet-500'>

            <div className='bg-indigo-400 ml-12 -mt-3 flex w-fit py-2 px-8 gap-1 rounded-3xl'>
              <Star size={16} strokeWidth={2} absoluteStrokeWidth />            
              <Star size={16} strokeWidth={2} absoluteStrokeWidth />
              <Star size={16} strokeWidth={2} absoluteStrokeWidth />
              <Star size={16} strokeWidth={2} absoluteStrokeWidth />
            </div>

            <h3 className=' md:text-[2.8vw] lg:text-[2.7vw] font-extrabold mt-[9%] ml-[9%] text-violet-500'>"An absolute game-changer."</h3>
            <p className='lg:text-[109%] xl:text-[110%] px-[11%] md:mt-[8%] lg:mt-[6%] text-gray-400'>I applied to 50 jobs with no response. After using ResuMatch to tailor my keywords, I got 5 interviews in one week.</p>

            <div className='flex md:mt-[9%] lg:mt-[8%] ml-[11%] mr-[11%] pt-[5.5%] gap-7 border-t border-violet-500'>
              <div className='bg-indigo-400 xl:py-[2vw] xl:px-[2vw] lg:py-[2.7vw] lg:px-[2.7vw] md:py-[3vw] md:px-[3vw] rounded-full '></div>
              <div className=' md:mt-[5%] lg:mt-[2%]'>
                <h4 className='font-semibold md:text-[1.2vw] lg:text-[1.2vw]'>Michael Chen</h4>
                <p className=' text-[1.2vw] text-gray-400'>Senior Software Engineer</p>
              </div>

            </div>
            
          </div>
      
        </div>




        <div className='bg-violet-900  order-1 md:order-2  md:w-[vw] lg:w-0vw] xl:w-[37.5vw]'>



          <div className='text-white flex flex-col items-center' >

            <div className='mt-8 mr-66'>
              <Link to="/"><NavCard /></Link>
            </div>

            <h2 className='text-[2.7vw] text-gray-900 font-extrabold mr-22 mt-11'>Create an account</h2>
            <p className=' text-[1.11vw] mr-28 mt-3 font-semibold text-gray-400'>Start optimizing your resume for free.</p>

            <form action="" className='mt-7 space-y-4' onSubmit={handleSubmit} >

              <FormCard name="name" onChange={handleChange} value={formData.name} type="text" labale="Full Name" placeholder="Enter your full name"  />
              <FormCard name="email" onChange={handleChange} value={formData.email} type="email" labale="Email address" placeholder="Example@gamail.com"  />
              <FormCard name="password" onChange={handleChange} value={formData.password} type="password" labale="Password" placeholder="*************"  />
              <FormCard name="ConfirmPassword" message={message} error={error} onChange={handleChange} value={formData.ConfirmPassword} type="password" labale="Confirm Password" placeholder="*************"  />

              <button type="submit" className='bg-indigo-500 mt-7  py-3 px-34 rounded-xl cursor-pointer'>Create account</button>

            </form>

            <p className='mt-6 mb-10 text-gray-400'>Already have an account? <Link to="/login"><button className='text-gray-900 pl-2 font-bold cursor-pointer'>Log in</button></Link></p>

          </div>

        </div>

      </div>
  </div>
  )
} 

export default RagisterPage
