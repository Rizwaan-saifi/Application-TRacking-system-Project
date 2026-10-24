import React from 'react';
import Navbar from '../componets/Navbar';
import Landing from '../componets/LandingPage/Landing';
import Companes from '../componets/LandingPage/Companes';
import AtsBlueprintSection from '../componets/LandingPage/AtsBlueprintSection';
import SecondPage from '../componets/LandingPage/SecondPage';
import ThirdPage from '../componets/LandingPage/ThirdPage';
import Footer from '../componets/Footer';

const LandingPage = () => {
  return (
    <div className='bg-black min-h-screen text-white'>
      <Navbar />
      <Landing />
      <Companes />
      <AtsBlueprintSection />
      <SecondPage />
      <ThirdPage />
      <Footer />
    </div>
  );
};

export default LandingPage;
