import React, { useState } from 'react';
import NavCard from '../componets/NavCard';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn, Sparkles, Star } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setError("");

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/user/login",
        formData
      );

      if (res.data.token) {
        setMessage("User logged in successfully! Redirecting...");
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      const backendMessage =
        typeof err.response?.data?.detail === "string"
          ? err.response.data.detail
          : err.response?.data?.detail?.[0]?.msg || "Invalid email or password";
      setError(backendMessage);
    }
  };

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-slate-950 text-white font-sans'>
      {/* Left Column: Form */}
      <div className='w-full md:w-1/2 p-6 sm:p-12 lg:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-800'>
        <Link to="/">
          <NavCard />
        </Link>

        <div className='max-w-md w-full mx-auto my-auto py-12'>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-white mb-2'>
            Welcome back
          </h2>
          <p className='text-gray-400 text-sm mb-8'>
            Sign in to access your ATS dashboard and resume matching workspace.
          </p>

          {message && (
            <div className='mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm'>
              {message}
            </div>
          )}
          {error && (
            <div className='mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5'>
                Email Address
              </label>
              <input
                type='email'
                name='email'
                required
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email address'
                className='w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition'
              />
            </div>

            <div>
              <div className='flex justify-between items-center mb-1.5'>
                <label className='text-xs font-semibold text-gray-300 uppercase tracking-wider'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                required
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter your password'
                className='w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition'
              />
            </div>

            <button
              type='submit'
              className='w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 transition cursor-pointer flex items-center justify-center gap-2 mt-2'
            >
              <LogIn className='w-4 h-4' /> Sign In
            </button>
          </form>

          <div className='text-center mt-8 text-sm text-gray-400'>
            Don't have an account?{' '}
            <Link to='/register' className='text-indigo-400 hover:text-indigo-300 font-semibold'>
              Create an account
            </Link>
          </div>
        </div>

        <div className='text-xs text-gray-500'>
          © 2026 Smart ATS Project. All rights reserved.
        </div>
      </div>

      {/* Right Column: Hero Showcase */}
      <div className='hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 p-12 lg:p-16 flex-col justify-center items-center relative overflow-hidden'>
        <div className='absolute w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none' />

        <div className='max-w-md w-full relative z-10'>
          <div className='flex items-center gap-2 mb-6'>
            <div className='p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400'>
              <Sparkles className='w-6 h-6' />
            </div>
            <span className='text-xs font-bold uppercase tracking-wider text-indigo-300'>
              Smart ATS Engine 2.0
            </span>
          </div>

          <h3 className='text-2xl lg:text-3xl font-extrabold text-white mb-4 leading-tight'>
            Precision Resume Scoring Powered by 3-Tier NLP
          </h3>

          <p className='text-gray-400 text-sm leading-relaxed mb-8'>
            Get accurate, actionable match ratings that recruiters rely on. Our 3-tier algorithm evaluates exact keywords, semantic embeddings, and LLM context.
          </p>

          <div className='space-y-3'>
            <div className='bg-gray-900/60 border border-gray-800 rounded-xl p-3.5 flex items-center gap-3'>
              <div className='w-2 h-2 rounded-full bg-emerald-400' />
              <span className='text-xs text-gray-300 font-medium'>
                Tier 1: Section-Specific Exact Keyword Match
              </span>
            </div>
            <div className='bg-gray-900/60 border border-gray-800 rounded-xl p-3.5 flex items-center gap-3'>
              <div className='w-2 h-2 rounded-full bg-blue-400' />
              <span className='text-xs text-gray-300 font-medium'>
                Tier 2: SentenceTransformer Dense Semantic Vectors
              </span>
            </div>
            <div className='bg-gray-900/60 border border-gray-800 rounded-xl p-3.5 flex items-center gap-3'>
              <div className='w-2 h-2 rounded-full bg-purple-400' />
              <span className='text-xs text-gray-300 font-medium'>
                Tier 3: Contextual LLM Reasoning & Validation
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
