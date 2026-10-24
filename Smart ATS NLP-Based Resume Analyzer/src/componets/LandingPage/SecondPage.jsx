import React from 'react';
import Card from './Card';
import { Target, Zap, CircleCheckBig, Sparkles } from 'lucide-react';

const SecondPage = () => {
  return (
    <section className="bg-[#090d16] text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Precision Career Intelligence</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-normal tracking-tight leading-tight">
            Everything You Need to <span className="text-indigo-400 font-medium">Beat the Bots</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Engineered tools designed for serious candidates who want transparency, accurate scoring, and measurable interview results.
          </p>
        </div>

        {/* 3 Bookmark Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 justify-items-center pt-4">
          <Card
            title="Precision Match Score"
            para="Get a clear 0–100 score showing exactly how well your resume matches the job description across all four evaluation sections."
            logo={<Target className="w-6 h-6 text-indigo-400" />}
            badge="1"
            ribbonColor="from-indigo-600 to-indigo-800"
          />
          <Card
            title="Keyword Gap Analysis"
            para="Instantly see which crucial technical skills and frameworks your resume is missing compared to the requirements."
            logo={<Zap className="w-6 h-6 text-purple-400" />}
            badge="2"
            ribbonColor="from-purple-600 to-purple-800"
          />
          <Card
            title="Actionable Feedback"
            para="Receive specific, line-by-line recommendations and roadmaps to elevate your profile for your target senior role."
            logo={<CircleCheckBig className="w-6 h-6 text-emerald-400" />}
            badge="3"
            ribbonColor="from-emerald-600 to-teal-800"
          />
        </div>
      </div>
    </section>
  );
};

export default SecondPage;
