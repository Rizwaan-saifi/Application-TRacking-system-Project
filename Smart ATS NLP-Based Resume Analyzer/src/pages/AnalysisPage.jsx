import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import DashboardHistoryCard from "../componets/DashboardPage/DashboardHistoryCard";
import {
  Award,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Brain,
  Layers,
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Sparkles,
  RefreshCw,
  FileText,
  Printer,
  ChevronRight,
  Compass,
  BookOpen,
  X,
  Target,
  Lightbulb
} from "lucide-react";
import { resumeService } from "../services/api";

const AnalysisPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Modals for the new requested features
  const [showRoleFitModal, setShowRoleFitModal] = useState(false);
  const [showSkillsRoadmapModal, setShowSkillsRoadmapModal] = useState(false);

  useEffect(() => {
    if (location.state?.analysisResult) {
      setResult(location.state.analysisResult);
      localStorage.setItem("latest_analysis", JSON.stringify(location.state.analysisResult));
    } else {
      const cached = localStorage.getItem("latest_analysis");
      if (cached) {
        try {
          setResult(JSON.parse(cached));
        } catch {
          // invalid cache
        }
      }
    }
  }, [location]);

  const loadSampleAnalysis = async () => {
    setLoading(true);
    try {
      const sample = await resumeService.getSample();
      const res = await resumeService.analyzeJSON(sample);
      setResult(res);
      localStorage.setItem("latest_analysis", JSON.stringify(res));
    } catch (err) {
      console.error("Failed to load sample analysis:", err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 75) {
      return {
        text: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        stroke: "#10b981",
        badge: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40",
        tag: "Strong Fit - Recommended for Interview"
      };
    }
    if (score >= 50) {
      return {
        text: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
        stroke: "#f59e0b",
        badge: "bg-amber-500/20 text-amber-300 border border-amber-500/40",
        tag: "Moderate Fit - Potential Match with Minor Gaps"
      };
    }
    return {
      text: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
      stroke: "#f43f5e",
      badge: "bg-rose-500/20 text-rose-300 border border-rose-500/40",
      tag: "Low Fit - Significant Experience/Skills Gap"
    };
  };

  // Generate suggested alternate roles based on detected candidate skills
  const getSuggestedRoles = (matchedSkills = []) => {
    const list = matchedSkills.map((s) => s.toLowerCase());
    const roles = [];

    if (list.includes("python") || list.includes("fastapi") || list.includes("django")) {
      roles.push({
        title: "Python Backend Engineer",
        fit: 94,
        reason: "Direct match with your Python web framework and REST API background.",
        skills: ["Python", "FastAPI", "SQL"]
      });
    }
    if (list.includes("docker") || list.includes("ci/cd") || list.includes("aws")) {
      roles.push({
        title: "DevOps & Cloud Engineer",
        fit: 86,
        reason: "Strong foundation in containerization, deployment pipelines, and cloud tooling.",
        skills: ["Docker", "CI/CD", "Linux"]
      });
    }
    if (list.includes("react") || list.includes("javascript") || list.includes("html")) {
      roles.push({
        title: "Full-Stack Software Engineer",
        fit: 82,
        reason: "Demonstrated full-lifecycle capability across backend APIs and frontend UI.",
        skills: ["React", "FastAPI", "TailwindCSS"]
      });
    }
    if (roles.length < 3) {
      roles.push({
        title: "API & Microservices Architect",
        fit: 88,
        reason: "Core alignment with service isolation, REST conventions, and data layer optimization.",
        skills: ["Microservices", "PostgreSQL", "Docker"]
      });
    }
    return roles;
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
        <DashboardHistoryCard />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center pt-24">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6 text-indigo-400">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-3">No Active Analysis Report</h2>
          <p className="text-gray-400 max-w-md mb-8">
            Upload your resume and paste a job description on the dashboard, or load an instant sample report to explore the evaluation breakdown.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold transition cursor-pointer flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Go to Dashboard
            </button>
            <button
              onClick={loadSampleAnalysis}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gray-900 border border-gray-700 hover:border-gray-500 font-semibold transition cursor-pointer flex items-center gap-2 text-gray-200"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Analyzing Sample..." : "Run Sample Analysis"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const score = result.total_ats_score || 0;
  const colors = getScoreColor(score);
  const breakdown = result.section_breakdown || {};
  const skillsData = breakdown.skills || {};
  const expData = breakdown.experience || {};
  const respData = breakdown.responsibilities || {};
  const eduData = breakdown.education || {};
  const tierSummary = result.tier_summary || {};
  const recommendations = result.actionable_recommendations || [];

  // Safe skill extraction
  const matchedSkills = skillsData.matched_skills || [];
  const unmatchedSkills = skillsData.unmatched_skills || [];
  const suggestedRoles = getSuggestedRoles(matchedSkills);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      <DashboardHistoryCard />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Match Analysis Report
            </h1>
            <p className="text-gray-400 text-sm mt-1 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-gray-300">{result.job_title || "Target Role"}</span>
              <span>•</span>
              <span>{result.company || "Target Company"}</span>
              {result.created_at && (
                <>
                  <span>•</span>
                  <span>{new Date(result.created_at).toLocaleDateString()}</span>
                </>
              )}
            </p>
          </div>

          {/* Action Header Buttons */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setShowRoleFitModal(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/30 text-indigo-300 text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Compass className="w-4 h-4" />
              <span>Roles Fitting Your Profile</span>
            </button>

            <button
              onClick={() => setShowSkillsRoadmapModal(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Skills to Learn</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white text-xs sm:text-sm font-medium transition flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20"
            >
              <RefreshCw className="w-4 h-4" /> New Analysis
            </button>
          </div>
        </div>

        {/* Executive Score Hero Card */}
        <div className="bg-gradient-to-br from-gray-900/90 via-gray-900/60 to-slate-950 border border-gray-800 rounded-3xl p-6 sm:p-10 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Circular Gauge */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-gray-800"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={colors.stroke}
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * score) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-black tracking-tight ${colors.text}`}>
                    {Math.round(score)}%
                  </span>
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold mt-0.5">
                    ATS Score
                  </span>
                </div>
              </div>

              {/* Tag According to Score */}
              <div className={`mt-4 px-4 py-1.5 rounded-full text-xs font-bold ${colors.badge}`}>
                {colors.tag}
              </div>
            </div>

            {/* Quick Metrics & Call to Action Cards */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" /> Executive Score & Section Breakdown
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {score >= 75
                  ? "Outstanding candidate alignment! Your qualifications, direct keyword relevance, and demonstrated responsibilities demonstrate strong suitability for this requisition."
                  : score >= 50
                  ? "Moderate qualification match. While core competencies align with job duties, bridging key skill gaps and quantifying experience will significantly boost your ranking."
                  : "Low keyword and contextual alignment. Critical requirements and domain responsibilities from the job description are missing in your resume."}
              </p>

              {/* 4 Section Weighted Scores */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-gray-950/70 border border-gray-800 rounded-xl p-3.5">
                  <div className="text-xs text-gray-400 font-medium">Skills (35%)</div>
                  <div className="text-lg font-bold text-white mt-1">
                    {skillsData.base_score != null ? Math.round(skillsData.base_score) : 0}%
                  </div>
                  <div className="text-xs text-indigo-400 font-semibold">
                    +{skillsData.weighted_score != null ? skillsData.weighted_score.toFixed(1) : 0} pts
                  </div>
                </div>

                <div className="bg-gray-950/70 border border-gray-800 rounded-xl p-3.5">
                  <div className="text-xs text-gray-400 font-medium">Experience (30%)</div>
                  <div className="text-lg font-bold text-white mt-1">
                    {expData.base_score != null ? Math.round(expData.base_score) : 0}%
                  </div>
                  <div className="text-xs text-indigo-400 font-semibold">
                    +{expData.weighted_score != null ? expData.weighted_score.toFixed(1) : 0} pts
                  </div>
                </div>

                <div className="bg-gray-950/70 border border-gray-800 rounded-xl p-3.5">
                  <div className="text-xs text-gray-400 font-medium">Duties (20%)</div>
                  <div className="text-lg font-bold text-white mt-1">
                    {respData.base_score != null ? Math.round(respData.base_score) : 0}%
                  </div>
                  <div className="text-xs text-indigo-400 font-semibold">
                    +{respData.weighted_score != null ? respData.weighted_score.toFixed(1) : 0} pts
                  </div>
                </div>

                <div className="bg-gray-950/70 border border-gray-800 rounded-xl p-3.5">
                  <div className="text-xs text-gray-400 font-medium">Education (15%)</div>
                  <div className="text-lg font-bold text-white mt-1">
                    {eduData.base_score != null ? Math.round(eduData.base_score) : 0}%
                  </div>
                  <div className="text-xs text-indigo-400 font-semibold">
                    +{eduData.weighted_score != null ? eduData.weighted_score.toFixed(1) : 0} pts
                  </div>
                </div>
              </div>

              {/* Two Prominent Feature Banners */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setShowRoleFitModal(true)}
                  className="bg-indigo-950/30 border border-indigo-500/30 hover:border-indigo-500/60 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition">
                        Which roles fit your profile?
                      </div>
                      <div className="text-[11px] text-gray-400">Discover top career matches</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition" />
                </div>

                <div
                  onClick={() => setShowSkillsRoadmapModal(true)}
                  className="bg-amber-950/30 border border-amber-500/30 hover:border-amber-500/60 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                        Skills to learn for this role
                      </div>
                      <div className="text-[11px] text-gray-400">Roadmap to bridge ATS gap</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Section Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Section 1: Skills Breakdown */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 flex flex-col shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Skills Alignment</h3>
                  <p className="text-xs text-gray-400">Exact token & semantic recovery</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-indigo-400">
                  {skillsData.base_score != null ? Math.round(skillsData.base_score) : 0}%
                </span>
                <div className="text-xs text-gray-400">Weight: 35%</div>
              </div>
            </div>

            {/* Matched Skills */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Matched Skills ({matchedSkills.length})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {matchedSkills.map((s, idx) => (
                  <span
                    key={`matched-${idx}`}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                  >
                    ✓ {s}
                  </span>
                ))}
                {matchedSkills.length === 0 && (
                  <span className="text-xs text-gray-500 italic">No direct skills matched yet.</span>
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="mt-auto pt-3 border-t border-gray-800">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-400" /> Missing / Unmatched Skills ({unmatchedSkills.length})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {unmatchedSkills.map((s, idx) => (
                  <span
                    key={`unmatched-${idx}`}
                    className="px-2 py-0.5 rounded-md text-xs font-medium bg-rose-500/10 border border-rose-500/20 text-rose-300"
                  >
                    {s}
                  </span>
                ))}
                {unmatchedSkills.length === 0 && (
                  <span className="text-xs text-emerald-400">100% of required job skills matched!</span>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Experience & Seniority */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 flex flex-col shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Experience & Seniority</h3>
                  <p className="text-xs text-gray-400">Semantic Cosine + Conditional 60/40 LLM</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-amber-400">
                  {expData.base_score != null ? Math.round(expData.base_score) : 0}%
                </span>
                <div className="text-xs text-gray-400">Weight: 30%</div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-gray-950/60 rounded-xl p-3 border border-gray-800/80">
                <div className="text-xs text-gray-400">Triggered Evaluation Route:</div>
                <div className="text-sm font-semibold text-gray-200 mt-0.5">
                  {expData.tier_triggered || "Standard Semantic Evaluation"}
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Vector Semantic Similarity:</span>
                <span className="font-semibold text-gray-200">
                  {expData.semantic_score != null ? expData.semantic_score.toFixed(1) : 0}%
                </span>
              </div>

              {expData.llm_score != null && (
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Contextual Recruiter Score:</span>
                  <span className="font-semibold text-purple-300">
                    {expData.llm_score.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>

            <div className="mt-auto pt-3 border-t border-gray-800 text-xs text-gray-400 leading-relaxed">
              {expData.semantic_score >= 85
                ? "Direct high-match threshold reached (>=85%). Candidate experience strongly correlates with the core responsibilities."
                : expData.semantic_score >= 40
                ? "Moderate alignment (40-84%). Evaluated with composite (60% semantic + 40% contextual) scoring formula."
                : "Experience similarity fell below the 40% threshold required for qualified consideration."}
            </div>
          </div>

          {/* Section 3: Responsibilities Alignment */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 flex flex-col shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Responsibilities Alignment</h3>
                  <p className="text-xs text-gray-400">Action points & duties (50/50 formula)</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-sky-400">
                  {respData.base_score != null ? Math.round(respData.base_score) : 0}%
                </span>
                <div className="text-xs text-gray-400">Weight: 20%</div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-gray-950/60 rounded-xl p-3 border border-gray-800/80">
                <div className="text-xs text-gray-400">Triggered Duty Evaluation:</div>
                <div className="text-sm font-semibold text-gray-200 mt-0.5">
                  {respData.tier_triggered || "Duty Overlap Analysis"}
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Duty Vector Similarity:</span>
                <span className="font-semibold text-gray-200">
                  {respData.semantic_score != null ? respData.semantic_score.toFixed(1) : 0}%
                </span>
              </div>
            </div>

            <div className="mt-auto pt-3 border-t border-gray-800 text-xs text-gray-400 leading-relaxed">
              Evaluated active deliverables, team responsibilities, and operational scope against required daily responsibilities.
            </div>
          </div>

          {/* Section 4: Education & Credentials */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 flex flex-col shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Education & Credentials</h3>
                  <p className="text-xs text-gray-400">Waterfall: 80% Exact + 10% Semantic + 10% LLM</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-purple-400">
                  {eduData.base_score != null ? Math.round(eduData.base_score) : 0}%
                </span>
                <div className="text-xs text-gray-400">Weight: 15%</div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-gray-950/60 rounded-xl p-3 border border-gray-800/80">
                <div className="text-xs text-gray-400">Education Requirement Status:</div>
                <div className="text-sm font-semibold text-gray-200 mt-0.5">
                  {eduData.matched_education?.length
                    ? "Direct Degree Requirement Fulfilled"
                    : "Equivalent Technical / Practical Qualification"}
                </div>
              </div>

              <div className="text-xs text-gray-400 flex justify-between">
                <span>Evaluation Tier:</span>
                <span className="font-semibold text-gray-200">
                  {eduData.tier_triggered || "Tier 1 & 2 Processed"}
                </span>
              </div>
            </div>

            <div className="mt-auto pt-3 border-t border-gray-800 text-xs text-gray-400 leading-relaxed">
              Academic level, branch specialization, and technical degrees analyzed against job specifications.
            </div>
          </div>
        </div>

        {/* Actionable Recommendations Card */}
        {recommendations.length > 0 && (
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 sm:p-8 mb-8 shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Actionable Recommendations to Boost Match Score
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, idx) => (
                <div
                  key={`rec-${idx}`}
                  className="bg-gray-950/70 border border-gray-800/80 rounded-xl p-4 flex items-start gap-3"
                >
                  <div className="p-1 rounded-full bg-indigo-500/10 text-indigo-400 mt-0.5">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3-Tier Technical Architecture Breakdown (Safe String Rendering) */}
        <div className="bg-gray-900/40 border border-gray-800/60 rounded-2xl p-6">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4" /> Three-Tier Engine Execution Log
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-gray-950/80 rounded-xl p-4 border border-gray-800">
              <span className="font-bold text-emerald-400 block mb-1">Tier 1: Exact Keywords</span>
              <p className="text-gray-400 leading-relaxed">
                {tierSummary.tier1_keyword_matching?.description || "Exact token matching via O(1) hash lookups and substring scanning."}
              </p>
            </div>
            <div className="bg-gray-950/80 rounded-xl p-4 border border-gray-800">
              <span className="font-bold text-blue-400 block mb-1">Tier 2: Semantic Vectors</span>
              <p className="text-gray-400 leading-relaxed">
                {tierSummary.tier2_semantic_matching?.description || "Dense vector embeddings (all-MiniLM-L6-v2) cosine similarity."}
              </p>
            </div>
            <div className="bg-gray-950/80 rounded-xl p-4 border border-gray-800">
              <span className="font-bold text-purple-400 block mb-1">Tier 3: Contextual LLM</span>
              <p className="text-gray-400 leading-relaxed">
                {tierSummary.tier3_llm_matching?.description || "Contextual validation and conditional threshold scoring rules."}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ============================================================================== */}
      {/* MODAL 1: Roles That Fit Your Profile */}
      {/* ============================================================================== */}
      {showRoleFitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="max-w-2xl w-full bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowRoleFitModal(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Roles That Fit Your Profile
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  Based on your resume skills and technical experience blocks
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {suggestedRoles.map((role, idx) => (
                <div
                  key={idx}
                  className="bg-gray-950 border border-gray-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-base">{role.title}</h4>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {role.fit}% Match
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{role.reason}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {role.skills.map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gray-900 border border-gray-800 text-gray-300"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowRoleFitModal(false);
                      navigate("/dashboard");
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-200 hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto"
                  >
                    <span>Test for This Role</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowRoleFitModal(false)}
                className="px-6 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-semibold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================================== */}
      {/* MODAL 2: Skills To Learn For This Role (Upskill Roadmap) */}
      {/* ============================================================================== */}
      {showSkillsRoadmapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="max-w-2xl w-full bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowSkillsRoadmapModal(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Skills to Learn to Fit This Role
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  Targeted roadmap to elevate your ATS score from {Math.round(score)}% to 85%+
                </p>
              </div>
            </div>

            {unmatchedSkills.length > 0 ? (
              <div className="space-y-3.5 mb-6 max-h-96 overflow-y-auto pr-1">
                {unmatchedSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-950 border border-gray-800 rounded-2xl p-4 flex items-start gap-3.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-sm">{skill}</h4>
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                          +5 to +10 pts
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        Required in the target job description. Add hands-on project examples or quantify where you utilized {skill} to fulfill ATS keyword filters.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 text-center text-gray-300 text-sm mb-6">
                🎉 Great job! You matched all major technical skills listed in this job description. Focus on quantifying your business impact and scale in your work experience bullet points.
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => setShowSkillsRoadmapModal(false)}
                className="px-6 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-semibold transition cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
