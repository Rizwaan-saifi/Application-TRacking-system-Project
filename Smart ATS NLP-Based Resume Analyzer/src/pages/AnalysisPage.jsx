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
  ChevronRight
} from "lucide-react";
import { resumeService } from "../services/api";

const AnalysisPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
    if (score >= 75) return { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", stroke: "#10b981", badge: "bg-emerald-500/20 text-emerald-300" };
    if (score >= 50) return { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", stroke: "#f59e0b", badge: "bg-amber-500/20 text-amber-300" };
    return { text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", stroke: "#f43f5e", badge: "bg-rose-500/20 text-rose-300" };
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
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
            <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
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

          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white text-sm font-medium transition flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print Report
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition flex items-center gap-2 cursor-pointer"
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
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
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

              <div className={`mt-4 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colors.badge}`}>
                {result.score_interpretation || "Match Status"}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" /> Executive Evaluation Summary
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                {score >= 75
                  ? "Outstanding candidate alignment! Your qualifications, direct keyword relevance, and demonstrated responsibilities demonstrate strong suitability for this requisition."
                  : score >= 50
                  ? "Moderate qualification match. While core competencies align with job duties, optimizing specific technical keywords and experience bullet points will significantly elevate your ranking."
                  : "Low keyword and contextual alignment. Key requirements and domain responsibilities are missing or unrepresented in your resume text."}
              </p>

              {/* 4 Mini Progress Bars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gray-950/60 border border-gray-800 rounded-xl p-3">
                  <div className="text-xs text-gray-400 font-medium">Skills (35%)</div>
                  <div className="text-lg font-bold text-white mt-1">
                    {skillsData.base_score != null ? Math.round(skillsData.base_score) : 0}%
                  </div>
                  <div className="text-xs text-indigo-400 font-semibold">
                    +{skillsData.weighted_score != null ? skillsData.weighted_score.toFixed(1) : 0} pts
                  </div>
                </div>

                <div className="bg-gray-950/60 border border-gray-800 rounded-xl p-3">
                  <div className="text-xs text-gray-400 font-medium">Experience (30%)</div>
                  <div className="text-lg font-bold text-white mt-1">
                    {expData.experience_base_score != null ? Math.round(expData.experience_base_score) : 0}%
                  </div>
                  <div className="text-xs text-indigo-400 font-semibold">
                    +{expData.weighted_experience_score != null ? expData.weighted_experience_score.toFixed(1) : 0} pts
                  </div>
                </div>

                <div className="bg-gray-950/60 border border-gray-800 rounded-xl p-3">
                  <div className="text-xs text-gray-400 font-medium">Duties (20%)</div>
                  <div className="text-lg font-bold text-white mt-1">
                    {respData.responsibilities_base_score != null ? Math.round(respData.responsibilities_base_score) : 0}%
                  </div>
                  <div className="text-xs text-indigo-400 font-semibold">
                    +{respData.weighted_responsibilities_score != null ? respData.weighted_responsibilities_score.toFixed(1) : 0} pts
                  </div>
                </div>

                <div className="bg-gray-950/60 border border-gray-800 rounded-xl p-3">
                  <div className="text-xs text-gray-400 font-medium">Education (15%)</div>
                  <div className="text-lg font-bold text-white mt-1">
                    {eduData.education_base_score != null ? Math.round(eduData.education_base_score) : 0}%
                  </div>
                  <div className="text-xs text-indigo-400 font-semibold">
                    +{eduData.weighted_education_score != null ? eduData.weighted_education_score.toFixed(1) : 0} pts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Section Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Section 1: Skills Breakdown */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Skills Alignment</h3>
                  <p className="text-xs text-gray-400">3-Tier Waterfall: Exact → Semantic → LLM</p>
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
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Matched Skills (
                {(skillsData.exact_matched_skills?.length || 0) + (skillsData.semantic_matched_skills?.length || 0) + (skillsData.llm_matched_skills?.length || 0)}
                )
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skillsData.exact_matched_skills?.map((s, idx) => (
                  <span
                    key={`exact-${idx}`}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                    title="Matched via Tier 1 Exact Keyword"
                  >
                    ✓ {s}
                  </span>
                ))}
                {skillsData.semantic_matched_skills?.map((s, idx) => (
                  <span
                    key={`sem-${idx}`}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500/10 border border-blue-500/30 text-blue-300"
                    title="Matched via Tier 2 Semantic Embedding"
                  >
                    ≈ {s}
                  </span>
                ))}
                {skillsData.llm_matched_skills?.map((s, idx) => (
                  <span
                    key={`llm-${idx}`}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-purple-500/10 border border-purple-500/30 text-purple-300"
                    title="Matched via Tier 3 Contextual LLM"
                  >
                    ⚡ {s}
                  </span>
                ))}
                {(!skillsData.exact_matched_skills?.length && !skillsData.semantic_matched_skills?.length && !skillsData.llm_matched_skills?.length) && (
                  <span className="text-xs text-gray-500 italic">No skills matched directly.</span>
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="mt-auto pt-3 border-t border-gray-800">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-400" /> Missing / Unmatched Skills (
                {skillsData.unmatched_skills?.length || 0})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skillsData.unmatched_skills?.map((s, idx) => (
                  <span
                    key={`unmatch-${idx}`}
                    className="px-2 py-0.5 rounded-md text-xs font-medium bg-rose-500/10 border border-rose-500/20 text-rose-300"
                  >
                    {s}
                  </span>
                ))}
                {(!skillsData.unmatched_skills || skillsData.unmatched_skills.length === 0) && (
                  <span className="text-xs text-emerald-400">All required job skills matched!</span>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Experience & Seniority */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 flex flex-col">
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
                  {expData.experience_base_score != null ? Math.round(expData.experience_base_score) : 0}%
                </span>
                <div className="text-xs text-gray-400">Weight: 30%</div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-gray-950/60 rounded-xl p-3 border border-gray-800/80">
                <div className="text-xs text-gray-400">Evaluation Tier Route:</div>
                <div className="text-sm font-semibold text-gray-200 mt-0.5">
                  {expData.evaluation_tier_triggered || "Standard Semantic Evaluation"}
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Vector Semantic Similarity:</span>
                <span className="font-semibold text-gray-200">
                  {expData.tier2_semantic_score != null ? expData.tier2_semantic_score.toFixed(1) : 0}%
                </span>
              </div>

              {expData.tier3_llm_score != null && (
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Contextual LLM Fit Score:</span>
                  <span className="font-semibold text-purple-300">
                    {expData.tier3_llm_score.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>

            <div className="mt-auto pt-3 border-t border-gray-800 text-xs text-gray-400 leading-relaxed">
              {expData.tier2_semantic_score >= 85
                ? "Direct high-match threshold reached (>=85%). Candidate experience strongly correlates with the core responsibilities."
                : expData.tier2_semantic_score >= 40
                ? "Moderate alignment (40-84%). Evaluated with composite (60% semantic + 40% LLM) scoring formula."
                : "Experience similarity fell below the 40% threshold required for qualified consideration."}
            </div>
          </div>

          {/* Section 3: Responsibilities Alignment */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Responsibilities Alignment</h3>
                  <p className="text-xs text-gray-400">Bullet points & duty overlap (50/50 formula)</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-sky-400">
                  {respData.responsibilities_base_score != null ? Math.round(respData.responsibilities_base_score) : 0}%
                </span>
                <div className="text-xs text-gray-400">Weight: 20%</div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-gray-950/60 rounded-xl p-3 border border-gray-800/80">
                <div className="text-xs text-gray-400">Triggered Evaluation:</div>
                <div className="text-sm font-semibold text-gray-200 mt-0.5">
                  {respData.evaluation_tier_triggered || "Duty Overlap Analysis"}
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Duty Vector Similarity:</span>
                <span className="font-semibold text-gray-200">
                  {respData.tier2_semantic_score != null ? respData.tier2_semantic_score.toFixed(1) : 0}%
                </span>
              </div>
            </div>

            <div className="mt-auto pt-3 border-t border-gray-800 text-xs text-gray-400 leading-relaxed">
              Analyzed action verbs, daily deliverables, and team responsibilities described in work experience and key project contributions.
            </div>
          </div>

          {/* Section 4: Education & Credentials */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 flex flex-col">
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
                  {eduData.education_base_score != null ? Math.round(eduData.education_base_score) : 0}%
                </span>
                <div className="text-xs text-gray-400">Weight: 15%</div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-gray-950/60 rounded-xl p-3 border border-gray-800/80">
                <div className="text-xs text-gray-400">Education Match Status:</div>
                <div className="text-sm font-semibold text-gray-200 mt-0.5">
                  {eduData.tier1_matched_items?.length
                    ? "Direct Degree Requirement Fulfilled"
                    : eduData.tier2_semantic_approved_items?.length
                    ? "Equivalent Technical Qualification Approved"
                    : "Partial or Alternative Academic Background"}
                </div>
              </div>

              <div className="text-xs text-gray-400 flex justify-between">
                <span>Tier 1 Exact Match Score:</span>
                <span className="font-semibold text-gray-200">
                  {eduData.tier1_exact_score != null ? eduData.tier1_exact_score.toFixed(1) : 0}%
                </span>
              </div>
            </div>

            <div className="mt-auto pt-3 border-t border-gray-800 text-xs text-gray-400 leading-relaxed">
              Degree, major branch, and technical certifications evaluated across Computer Science and relevant disciplines.
            </div>
          </div>
        </div>

        {/* Actionable Recommendations Card */}
        {recommendations.length > 0 && (
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 sm:p-8 mb-8">
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

        {/* 3-Tier Technical Architecture Breakdown */}
        <div className="bg-gray-900/40 border border-gray-800/60 rounded-2xl p-6">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4" /> Three-Tier Engine Execution Log
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-gray-950/80 rounded-xl p-3 border border-gray-800">
              <span className="font-bold text-emerald-400">Tier 1: Exact Keywords</span>
              <p className="text-gray-400 mt-1">
                {tierSummary.tier1_keyword_matching || "Evaluated O(1) section string overlaps."}
              </p>
            </div>
            <div className="bg-gray-950/80 rounded-xl p-3 border border-gray-800">
              <span className="font-bold text-blue-400">Tier 2: Semantic Vectors</span>
              <p className="text-gray-400 mt-1">
                {tierSummary.tier2_semantic_matching || "Encoded via all-MiniLM-L6-v2 embeddings."}
              </p>
            </div>
            <div className="bg-gray-950/80 rounded-xl p-3 border border-gray-800">
              <span className="font-bold text-purple-400">Tier 3: Contextual LLM</span>
              <p className="text-gray-400 mt-1">
                {tierSummary.tier3_llm_matching || "Applied Pydantic schema validation."}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalysisPage;
