import React from 'react';
import NavCard from './NavCard';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-gray-950 text-white py-12 border-t border-gray-800/80'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6'>
        <div className='flex items-center gap-4'>
          <NavCard />
          <span className='text-xs text-gray-500 hidden sm:inline'>•</span>
          <span className='text-xs text-gray-400'>© 2026 ResuMatch. Professional ATS Optimization.</span>
        </div>

        <div className='flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-gray-400'>
          <Link to="/ats-rules" className='hover:text-indigo-400 transition font-medium'>
            ATS Machine Rules
          </Link>
          <Link to="/cv-standards" className='hover:text-purple-400 transition font-medium'>
            CV Anatomy Standards
          </Link>
          <Link to="/dashboard" className='hover:text-white transition font-medium'>
            Resume Scanner
          </Link>
          <Link to="/login" className='hover:text-white transition font-medium'>
            Sign In
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
