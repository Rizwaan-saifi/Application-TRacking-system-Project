import React from "react";
import { Sparkles, Brain, Cpu, CheckCircle } from "lucide-react";

const LoadingPage = ({ step = 2 }) => {
  const steps = [
    { title: "Extracting Text & Key Sections", desc: "Parsing PDF/DOCX and isolating resume sections" },
    { title: "3-Tier Vector Embedding Analysis", desc: "Comparing dense semantic vectors via all-MiniLM-L6-v2" },
    { title: "Contextual Scoring & Report Generation", desc: "Computing weighted fit and generating recommendations" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-gray-900/80 border border-gray-800 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6 text-indigo-400 animate-pulse">
          <Brain className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold mb-2">Analyzing Profile</h2>
        <p className="text-gray-400 text-sm mb-8">
          Running precision 3-tier ATS matching engine against the job description...
        </p>

        <div className="space-y-4 text-left">
          {steps.map((s, idx) => {
            const isDone = idx < step;
            const isCurrent = idx === step;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-center gap-3 transition ${
                  isDone
                    ? "bg-emerald-500/5 border-emerald-500/30 text-emerald-400"
                    : isCurrent
                    ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-300"
                    : "bg-gray-950/40 border-gray-800/60 text-gray-500"
                }`}
              >
                <div className="flex-shrink-0">
                  {isDone ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : isCurrent ? (
                    <Sparkles className="w-5 h-5 text-indigo-400 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-gray-700 flex items-center justify-center text-xs">
                      {idx + 1}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold">{s.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
