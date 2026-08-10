import React from 'react'
import NavCard from '../componets/NavCard'
import FirstCard from '../componets/LoginPage/FirstCard';
import {Link} from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  console.log(message);

  const handleChange =  (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const res = await axios.post(
          "http://127.0.0.1:8000/user/login",

          formData
        );

        if (res.data.token){

          setMessage("User logged in successfully");
          setFormData({
            email: '',
            password: ''
          })

          const setime = setTimeout(()=>{
            setMessage("");
          }, 3000)

          localStorage.setItem("token", res.data.token);

          navigate("/dashboard");


        }

      }
      catch (error) {

        setError(error.response?.data?.detail);

        const setime = setTimeout(()=>{
          setError("");
        }, 3000)
      }

    } 



  return (
    <div  className='flex flex-col md:flex-row'>

      {/* -------------------------------------------------------------------------------------------------------- */}

      <div className='bg-gray-950 h-screen md:w-[clamp(200px,60vw,800px)] lg:w-[clamp(200px,45vw,800px)] xl:w-[clamp(200px,37.5vw,800px)] text-white flex flex-col items-center   border-r border-gray-700 '>

        <div className='mt-23 mr-65'>

          <Link to="/">
          <NavCard />
          </Link>

        </div>

        <h2 
          className='text-4xl text-violet-900 font-extrabold mt-17 mr-35 mb-3'>
          Welcome back
        </h2>

        <p 

          className='mr-17 text-gray-400'>
          Enter your details to access your dashboard.

        </p>

        <form className=' mt-10 flex flex-col' onSubmit={handleSubmit} >

          <div className=' flex flex-col space-y-2'>

            <label 
              className='text-base font-bold' >
              Email address
            </label>

            <input type='email' name="email" onChange={handleChange} value={formData.email}
              className='border border-gray-700 hover:border-indigo-400 focus:outline-none focus:border-indigo-400 py-2.5 px-22 md:py-[clamp(8px,2vw,10px)] md:px-[clamp(10px,33vw,80px)] rounded-xl bg-violet-900/30' 
              placeholder='Enter your email address'
            />

          </div>

          <div className=' flex flex-col mt-7 space-y-2'>

            <div className='flex justify-between'>

              <label 

                className='text-base font-bold'>
                Password

              </label>

              <button 

                className='text-base font-bold text-indigo-400'>
                Forgot password?

              </button>

            </div>

            <input type='password' name="password" onChange={handleChange} value={formData.password}
              placeholder='*********' 
              className='border border-gray-700 hover:border-indigo-400
              py-2.5 px-22 rounded-xl focus:outline-none focus:border-indigo-400 bg-violet-900/30'
            />

          </div>

          <button 
            className='bg-indigo-500 mt-7  py-3 px-22 rounded-xl cursor-pointer'>
            Sign in

          </button>

        </form>

        <p 
          className='text-base text-gray-400 mt-9 mb-18 sm:mb-0'>
          Don't have an account?

          <Link to ='/register '><button className='text-indigo-400 pl-2 text-base font-bold cursor-pointer'>

            Sign up for free

          </button></Link>

        </p>
        <p className='text-red-500 text-sm'>{error}</p>
        <p className='text-green-500 text-sm pl-[5%]'>{message}</p>

      </div>


      {/* --------------------------------------------------------------------------------------------------------- */}



      {/* This is for Second Content */}
      <div className='bg-violet-900 h-screen sm:h-[clamp(400px,100vh,1200px)]  sm:w-[clamp(200px,98vw,1200px)] md:w-[clamp(200px,50vw,1200px)] lg:w-[clamp(200px,62.5vw,1200px)]   text-white'>
        <div className='px-[clamp(20px,16vw,300px)] sm:px-[clamp(30px,25vw,300px)] md:px-[clamp(28px,8vw,280px)] lg:px-[clamp(28px,12vw,300px)] xl:px-[clamp(28px,19vw,300px)] flex flex-col items-center mt-[clamp(40px,28vw,100px)] md:mt-14 lg:mt-16 xl:mt-11 mb-50'>

          <h3 
            className='text-[clamp(2rem,3vw,14rem)] md:text-[clamp(1.5rem,3vw,8rem)] lg:text-[clamp(2rem,3vw,14rem)] text-gray-950  mb-7 font-extrabold'>
            The data-driven approach to job hunting.
          </h3>

          {/* Card div */}
          <div className='flex flex-col space-y-[clamp(12px,3vw,20px)]'>

            <FirstCard text="Optimize keywords for any job description" />
            <FirstCard text="Get actionable feedback on bullet points" />
            <FirstCard text="Track your match score improvements" />

          </div>

          <div className='bg-violet-950/90 mt-10 px-[clamp(16px,4vw,32px)] py-[clamp(16px,4vw,32px)]  rounded-3xl border-l-6  border-gray-900  '>

            <p className='font-semibold md:text-[clamp(0.800rem,1vw,1rem)] lg:text-[clamp(0.875rem,1vw,1rem)]'>"Join thousands of professionals who have optimized their resumes and landed interviews at top companies."</p>

            <div className='flex gap-5 mt-5'>

              <div className='bg-gray-900 rounded-full px-8 py-8'></div>

              <div className='mt-2'>

                <h4 className='font-semibold md:text-[clamp(0.845rem,1vw,1rem)] text-[clamp(0.875rem,1vw,1rem)]'>Sarah Jenkins</h4>
                <p className='text-xs text-gray-300'>Product Manager at TechFlow</p>

              </div>

            </div>

          </div>

        </div>
      </div>
      
    </div>
  )
}

export default LoginPage
