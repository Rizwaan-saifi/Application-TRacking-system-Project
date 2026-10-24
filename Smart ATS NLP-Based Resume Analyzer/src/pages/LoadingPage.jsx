import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Brain,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  Cpu,
  Layers,
  FileText,
  Search
} from "lucide-react";
import { resumeService, getPendingAnalysis } from "../services/api";

const LoadingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [progress, setProgress] = useState(12);
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState("processing"); // "processing" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [jobInfo, setJobInfo] = useState({ title: "Target Role", company: "Target Company" });

  const hasExecutedRef = useRef(false);

  const steps = [
    {
      title: "Document & Section Parsing",
      desc: "Isolating technical skills, work experience blocks, bullet points, and academic credentials.",
      icon: <FileText className="w-4 h-4" />
    },
    {
      title: "Tier 1: Exact Keyword Matching",
      desc: "Executing O(1) set matching, normalization, and strict section requirement comparisons.",
      icon: <Search className="w-4 h-4" />
    },
    {
      title: "Tier 2: Dense Vector Semantic Embeddings",
      desc: "Encoding sentences via all-MiniLM-L6-v2 transformer model and computing cosine similarities.",
      icon: <Cpu className="w-4 h-4" />
    },
    {
      title: "Tier 3: Contextual ATS Scoring & Report",
      desc: "Applying conditional threshold formulas, weighting (35/30/20/15%), and generating recommendations.",
      icon: <Sparkles className="w-4 h-4" />
    }
  ];

  useEffect(() => {
    // Prevent duplicate calls
    if (hasExecutedRef.current) return;
    hasExecutedRef.current = true;

    // Get payload from location state or pending analysis singleton
    const payload = location.state || getPendingAnalysis();

    if (!payload) {
      // If directly navigated with no payload, load sample analysis as fallback
      runAnalysis(null, true);
      return;
    }

    setJobInfo({
      title: payload.jobTitle || "Software Engineer",
      company: payload.company || "Target Company"
    });

    runAnalysis(payload, false);
  }, [location]);

  // Smooth simulated progress timer
  useEffect(() => {
    if (status !== "processing") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 28) {
          setActiveStep(0);
          return prev + 4;
        } else if (prev < 58) {
          setActiveStep(1);
          return prev + 3;
        } else if (prev < 84) {
          setActiveStep(2);
          return prev + 2;
        } else if (prev < 94) {
          setActiveStep(3);
          return prev + 1;
        }
        return prev;
      });
    }, 280);

    return () => clearInterval(interval);
  }, [status]);

  const runAnalysis = async (payload, isSample = false) => {
    try {
      let result;

      if (isSample) {
        const sample = await resumeService.getSample();
        setJobInfo({ title: sample.job_title, company: sample.company });
        result = await resumeService.analyzeJSON(sample);
      } else if (payload.inputMode === "file" && payload.selectedFile) {
        const formData = new FormData();
        formData.append("resume_file", payload.selectedFile);
        formData.append("job_description", payload.jobDescription);
        formData.append("job_title", payload.jobTitle || "Target Role");
        formData.append("company", payload.company || "Target Company");
        result = await resumeService.analyzeFile(formData);
      } else {
        result = await resumeService.analyzeJSON({
          resume_text: payload.resumeText,
          job_description: payload.jobDescription,
          job_title: payload.jobTitle || "Target Role",
          company: payload.company || "Target Company"
        });
      }

      // Success transition
      setProgress(100);
      setActiveStep(3);
      setStatus("success");

      // Save to cache
      localStorage.setItem("latest_analysis", JSON.stringify(result));

      // Smooth transition to results page
      setTimeout(() => {
        navigate("/analysis", { state: { analysisResult: result }, replace: true });
      }, 750);

    } catch (err) {
      console.error("Analysis pipeline error:", err);
      setStatus("error");
      const detail = err.response?.data?.detail || err.message || "Failed to analyze resume.";
      setErrorMessage(detail);
    }
  };

  const handleRetry = () => {
    hasExecutedRef.current = false;
    setStatus("processing");
    setProgress(15);
    setActiveStep(0);
    setErrorMessage("");
    const payload = location.state || getPendingAnalysis();
    runAnalysis(payload, !payload);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      {/* Background glow aesthetics */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full bg-gray-900/90 border border-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 backdrop-blur-md">
        {/* Top Floating Badge */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'error' ? 'bg-rose-400' : 'bg-emerald-400'}`} />
              <span className={`relative inline-flex rounded-full h-3 w-3 ${status === 'error' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              {status === "processing" ? "Evaluation In Progress" : status === "success" ? "Analysis Complete" : "Evaluation Error"}
            </span>
          </div>

          <div className="text-xs text-indigo-400 font-semibold bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full">
            {jobInfo.title} • {jobInfo.company}
          </div>
        </div>

        {/* Central Graphic */}
        <div className="text-center mb-8">
          <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            {/* Outer rotating ring */}
            <div className={`absolute inset-0 rounded-full border-2 border-dashed ${status === 'error' ? 'border-rose-500/50' : 'border-indigo-500/60'} animate-spin`} style={{ animationDuration: "12s" }} />
            
            {/* Pulse center */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform ${
              status === "error"
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                : status === "success"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 scale-110"
                : "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 scale-100"
            }`}>
              {status === "error" ? (
                <AlertCircle className="w-8 h-8" />
              ) : status === "success" ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <Brain className="w-8 h-8 animate-pulse" />
              )}
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            {status === "error"
              ? "Evaluation Encountered an Issue"
              : status === "success"
              ? "Candidate Match Verified!"
              : "Matching Candidate with Job..."}
          </h2>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">
            {status === "error"
              ? "The ATS pipeline could not complete the score analysis."
              : status === "success"
              ? "Preparing your complete 4-section scorecard and recommendations..."
              : "Running three-tier NLP pipeline: Exact Keywords, Semantic Vectors, and Contextual Recruiter Rules."}
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        {status !== "error" ? (
          <div className="mb-8">
            <div className="flex justify-between items-center text-xs font-bold text-gray-400 mb-2">
              <span className="uppercase tracking-wider">Evaluation Progress</span>
              <span className="text-indigo-400 text-sm">{progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-gray-950 rounded-full overflow-hidden p-0.5 border border-gray-800">
              <div
                className={`h-full rounded-full transition-all duration-300 ease-out ${
                  status === "success"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                    : "bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
            <div>
              <div className="font-semibold text-rose-200">Error Details</div>
              <div className="text-xs text-rose-400 mt-0.5 leading-relaxed">{errorMessage}</div>
            </div>
          </div>
        )}

        {/* 4 Pipeline Steps */}
        <div className="space-y-3 mb-6">
          {steps.map((s, idx) => {
            const isCompleted = idx < activeStep || status === "success";
            const isCurrent = idx === activeStep && status === "processing";

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 ${
                  isCompleted
                    ? "bg-emerald-500/5 border-emerald-500/25 text-emerald-300"
                    : isCurrent
                    ? "bg-indigo-600/10 border-indigo-500/40 text-white shadow-md shadow-indigo-600/5"
                    : "bg-gray-950/40 border-gray-800/60 text-gray-500 opacity-60"
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : isCurrent ? (
                    <div className="w-5 h-5 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-gray-700 flex items-center justify-center text-xs text-gray-500 font-bold">
                      {idx + 1}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="text-sm font-bold flex items-center gap-1.5">
                    <span>{s.title}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {s.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Controls when error occurs */}
        {status === "error" && (
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-5 py-2.5 rounded-xl bg-gray-900 border border-gray-700 hover:border-gray-500 text-gray-200 font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Dashboard
            </button>
            <button
              onClick={handleRetry}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingPage;
