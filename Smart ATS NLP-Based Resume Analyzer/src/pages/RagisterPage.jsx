import React, { useState } from 'react';
import { Form, Star } from 'lucide-react';
import NavCard from '../componets/NavCard';
import FormCard from '../componets/RegisterPage/FormCard';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RagisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    ConfirmPassword: ''
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      if (res.data.email === formData.email || res.status === 201) {
        setMessage("User registered successfully! Redirecting to login...");
        setFormData({
          name: '',
          email: '',
          password: '',
          ConfirmPassword: ''
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      const backendMessage =
        typeof error.response?.data?.detail === "string"
          ? error.response.data.detail
          : error.response?.data?.detail?.[0]?.msg || "Something went wrong";
      setError(backendMessage);
    }
  };

  return (
    <div>
      <div className='flex flex-col md:flex-row h-full min-h-screen'>
        {/* left card of register page */}
        <div className='bg-slate-900 border-r border-gray-700/50 w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between'>
          <NavCard />
          <div className='max-w-md mx-auto my-auto py-12'>
            <div className='flex items-center gap-2 mb-4'>
              <div className='flex text-amber-400'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='w-5 h-5 fill-current' />
                ))}
              </div>
              <span className='text-xs font-semibold text-gray-400'>Trusted by 10,000+ candidates</span>
            </div>
            <h2 className='text-3xl font-extrabold text-white mb-4'>
              Transform Your Job Search with Advanced ATS Intelligence
            </h2>
            <p className='text-gray-400 text-sm leading-relaxed mb-6'>
              Analyze candidate resumes with our custom 3-tier matching engine: Exact keywords, dense vector semantic embeddings, and deep LLM contextual alignment.
            </p>
          </div>
          <div className='text-xs text-gray-500'>
            © 2026 Smart ATS Project. Enterprise-grade resume optimization.
          </div>
        </div>

        {/* right card of register page */}
        <div className='bg-slate-950 w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center'>
          <div className='max-w-md w-full mx-auto'>
            <h1 className='text-3xl font-extrabold text-white mb-2'>Create Account</h1>
            <p className='text-gray-400 text-sm mb-6'>Start optimizing resumes against real ATS algorithms today.</p>

            {message && (
              <div className='mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm'>
                {message}
              </div>
            )}
            {error && (
              <div className='mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm'>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1'>Full Name</label>
                <input
                  type='text'
                  name='name'
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='e.g. Alex Johnson'
                  className='w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1'>Email Address</label>
                <input
                  type='email'
                  name='email'
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='alex@example.com'
                  className='w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1'>Password (Min. 8 characters)</label>
                <input
                  type='password'
                  name='password'
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='••••••••'
                  className='w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1'>Confirm Password</label>
                <input
                  type='password'
                  name='ConfirmPassword'
                  required
                  value={formData.ConfirmPassword}
                  onChange={handleChange}
                  placeholder='••••••••'
                  className='w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition'
                />
              </div>

              <button
                type='submit'
                className='w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 transition cursor-pointer mt-2'
              >
                Create Account
              </button>
            </form>

            <div className='text-center mt-6 text-sm text-gray-400'>
              Already have an account?{' '}
              <Link to='/login' className='text-indigo-400 hover:text-indigo-300 font-semibold'>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RagisterPage;
