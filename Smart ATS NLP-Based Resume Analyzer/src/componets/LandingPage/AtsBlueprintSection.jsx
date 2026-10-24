import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  Cpu,
  Target
} from "lucide-react";

const AtsBlueprintSection = () => {
  return (
    <section className="bg-slate-950 text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-800/60 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs sm:text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Essential Candidate Knowledge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            What Actually Makes a Resume <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
              Pass Through ATS Machines?
            </span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
            Applicant Tracking Systems don't read resumes like humans. They use strict NLP tokenizers, section segmenters, and keyword frequency matrices. Here are the core rules to guarantee a passing score.
          </p>
        </div>

        {/* 3 Core Rules Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 sm:p-8 hover:border-indigo-500/40 transition group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition">
              <Layers className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Rule #1: Layout Integrity</div>
            <h3 className="text-xl font-bold text-white mb-3">Single-Column Text Flow</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Never use multi-column templates, tables, or floating text boxes. Modern parsers read left-to-right across the page and will scramble your skills and dates into unintelligible text.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 py-1.5 px-3 rounded-xl border border-emerald-500/20 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5" /> 99.8% Parse Success Rate
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 sm:p-8 hover:border-purple-500/40 transition group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition">
              <Target className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">Rule #2: Skill Segmentation</div>
            <h3 className="text-xl font-bold text-white mb-3">Categorized Skills Matrix</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Skills account for 35% of your ATS score. Isolate technical proficiencies into distinct categories: Languages, Frameworks, Databases, and Cloud Tools, matching keywords verbatim from the JD.
            </p>
            <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold bg-purple-500/10 py-1.5 px-3 rounded-xl border border-purple-500/20 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5" /> 35% Scoring Weight
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 sm:p-8 hover:border-emerald-500/40 transition group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Rule #3: STAR Impact</div>
            <h3 className="text-xl font-bold text-white mb-3">Quantified Achievement Bullets</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Begin every bullet with a strong action verb (Architected, Deployed, Reduced) followed by numbers (%, $, latency, users). Resumes with quantified metrics see 3x higher interview callback rates.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold bg-amber-500/10 py-1.5 px-3 rounded-xl border border-amber-500/20 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5" /> 3x Recruiter Callback Lift
            </div>
          </div>
        </div>

        {/* Dedicated Guides Navigation Box */}
        <div className="bg-gray-900/80 border border-gray-800 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" /> Comprehensive Learning Hub
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Explore Our Detailed Candidate Guides
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Dive deep into our interactive guides: read the complete algorithmic breakdown of ATS engines or view the section-by-section CV standards with copyable templates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Link
              to="/ats-rules"
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Read ATS Machine Rules</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/cv-standards"
              className="px-6 py-3.5 rounded-2xl bg-gray-950 hover:bg-gray-800 border border-gray-700 text-white font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <FileCheck className="w-4 h-4 text-purple-400" />
              <span>View Professional CV Anatomy</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtsBlueprintSection;
