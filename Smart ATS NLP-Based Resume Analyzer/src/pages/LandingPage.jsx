import React from 'react'
import Landing from '../componets/LandingPage/Landing'
import Companes from '../componets/LandingPage/Companes'
import SecondPage from '../componets/LandingPage/SecondPage'
import ThirdPage from '../componets/LandingPage/ThirdPage'
import Footer from '../componets/Footer'
import Navbar from '../componets/Navbar'



const LandingPage = () => {
  return (
    <div>
        <Navbar/>
        <Landing/>
        <Companes/>
        <SecondPage/>
        <ThirdPage/>
        <Footer/>
    </div>
  )
}

export default LandingPage
