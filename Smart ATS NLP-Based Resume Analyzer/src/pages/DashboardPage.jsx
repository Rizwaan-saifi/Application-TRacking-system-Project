import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHistoryCard from "../componets/DashboardPage/DashboardHistoryCard";
import {
  ChartNoAxesColumn,
  Award,
  Activity,
  Zap,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Clock,
  ArrowRight,
  FileUp,
  X
} from "lucide-react";
import { resumeService, setPendingAnalysis } from "../services/api";

const DashboardPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Form State
  const [inputMode, setInputMode] = useState("file"); // "file" | "text"
  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");

  // UI State
  const [isDragging, setIsDragging] = useState(false);
  const [loadingSample, setLoadingSample] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [metrics, setMetrics] = useState({ total: 0, best: 0, avg: 0 });

  // Fetch History and calculate metrics
  const fetchHistory = async () => {
    try {
      const data = await resumeService.getHistory();
      const records = data.history || [];
      setHistory(records);

      if (records.length > 0) {
        const scores = records.map((r) => r.ats_score);
        const best = Math.max(...scores);
        const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        setMetrics({ total: records.length, best: Math.round(best), avg });
      }
    } catch (err) {
      console.warn("Could not load history metrics:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Handle Drag & Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    setError("");
    const validExts = [".pdf", ".docx", ".txt"];
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!validExts.includes(ext)) {
      setError("Please upload a PDF, DOCX, or TXT file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5 MB limit.");
      return;
    }
    setSelectedFile(file);
  };

  // Load 1-Click Sample Data
  const handleLoadSample = async () => {
    setLoadingSample(true);
    setError("");
    try {
      const sample = await resumeService.getSample();
      setInputMode("text");
      setResumeText(sample.resume_text);
      setJobDescription(sample.job_description);
      setJobTitle(sample.job_title);
      setCompany(sample.company);
    } catch (err) {
      setError("Failed to load sample data. Please check backend connection.");
    } finally {
      setLoadingSample(false);
    }
  };

  // Submit Analysis -> Immediately transitions to /loading processing screen
  const handleAnalyze = (e) => {
    e.preventDefault();
    setError("");

    if (!jobDescription.trim() || jobDescription.trim().length < 20) {
      setError("Please paste a comprehensive Job Description (at least 20 characters).");
      return;
    }

    if (inputMode === "file" && !selectedFile) {
      setError("Please select or upload a resume file (PDF, DOCX, or TXT).");
      return;
    }

    if (inputMode === "text" && (!resumeText.trim() || resumeText.trim().length < 20)) {
      setError("Please paste the resume text (at least 20 characters).");
      return;
    }

    const payload = {
      inputMode,
      selectedFile,
      resumeText,
      jobDescription,
      jobTitle: jobTitle || "Target Role",
      company: company || "Target Company",
    };

    // Store in memory and state
    setPendingAnalysis(payload);

    // Navigate to animated processing loading page
    navigate("/loading", { state: payload });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      <DashboardHistoryCard />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:border-gray-700 transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <ChartNoAxesColumn className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Total Analyses
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                {metrics.total}
              </div>
            </div>
          </div>

          <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:border-gray-700 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Best ATS Score
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-0.5">
                {metrics.best > 0 ? `${metrics.best}%` : "—"}
              </div>
            </div>
          </div>

          <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:border-gray-700 transition">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Average Match
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-0.5">
                {metrics.avg > 0 ? `${metrics.avg}%` : "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Section Heading & Sample Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">New Match Analysis</h1>
            <p className="text-gray-400 text-sm mt-1">
              Upload candidate resume and paste job description to evaluate keyword, semantic, and contextual fit.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLoadSample}
            disabled={loadingSample}
            className="px-4 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/30 text-indigo-300 text-xs sm:text-sm font-semibold transition flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 ${loadingSample ? "animate-spin" : ""}`} />
            {loadingSample ? "Loading Demo..." : "Load Sample Demo (1-Click)"}
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Main Analysis Input Form */}
        <form onSubmit={handleAnalyze} className="space-y-6">
          {/* Optional Meta fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Target Role / Job Title (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Full Stack Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Target Company (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Google, Stripe, Microsoft"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Two Column Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Card: Resume Input */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-400 text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-bold text-white text-base">Candidate Resume</h3>
                </div>

                {/* Input Mode Toggle */}
                <div className="flex bg-gray-950 p-1 rounded-xl border border-gray-800 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setInputMode("file")}
                    className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                      inputMode === "file" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    File Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMode("text")}
                    className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                      inputMode === "text" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Paste Text
                  </button>
                </div>
              </div>

              {inputMode === "file" ? (
                /* Drag & Drop Upload Zone */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex-1 min-h-[260px] border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition ${
                    isDragging
                      ? "border-indigo-500 bg-indigo-500/10"
                      : selectedFile
                      ? "border-emerald-500/60 bg-emerald-500/5"
                      : "border-gray-800 hover:border-gray-700 bg-gray-950/40 hover:bg-gray-950/60"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileInput}
                    className="hidden"
                  />

                  {selectedFile ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm break-all max-w-xs">
                          {selectedFile.name}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {(selectedFile.size / 1024).toFixed(1)} KB • Click or drop to replace
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                        }}
                        className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 mt-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" /> Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                        <FileUp className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">
                          Click to upload or drag & drop resume
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Supports PDF, DOCX, or TXT (Max 5 MB)
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Raw Textarea */
                <textarea
                  rows={10}
                  placeholder="Paste candidate resume text here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full flex-1 min-h-[260px] bg-gray-950 border border-gray-800 rounded-xl p-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 font-mono transition"
                />
              )}
            </div>

            {/* Right Card: Job Description Input */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-400 text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-bold text-white text-base">Job Description</h3>
                </div>

                <span className="text-xs text-gray-400">
                  {jobDescription ? `${jobDescription.split(/\s+/).filter(Boolean).length} words` : "Required"}
                </span>
              </div>

              <textarea
                rows={10}
                placeholder="Paste the full job description, role requirements, key duties, and qualifications here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full flex-1 min-h-[260px] bg-gray-950 border border-gray-800 rounded-xl p-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Action Button -> Transitions to /loading */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-950 font-black text-base shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 transition transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>Analyze Candidate Match</span>
            </button>
          </div>
        </form>

        {/* Recent Analyses Section */}
        <section className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Recent Analyses</h2>
            {history.length > 3 && (
              <button
                onClick={() => navigate("/history")}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {history.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.slice(0, 6).map((item) => {
                const isHigh = item.ats_score >= 75;
                const isMed = item.ats_score >= 50 && item.ats_score < 75;
                const badgeColor = isHigh
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : isMed
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-400";

                return (
                  <div
                    key={item.id}
                    onClick={() => navigate("/analysis")}
                    className="bg-gray-900/60 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 flex justify-between items-center transition cursor-pointer group shadow-sm hover:shadow-md"
                  >
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition">
                        {item.job_title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">{item.company}</p>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end">
                      <div
                        className={`w-12 h-12 rounded-full border flex items-center justify-center font-black text-sm ${badgeColor}`}
                      >
                        {Math.round(item.ats_score)}%
                      </div>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mt-1">
                        {item.interpretation}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-gray-900/30 border border-gray-800/60 rounded-2xl p-8 text-center text-gray-400 text-sm">
              No recent analyses yet. Upload a resume and click <strong>Analyze Candidate Match</strong> to get started!
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
