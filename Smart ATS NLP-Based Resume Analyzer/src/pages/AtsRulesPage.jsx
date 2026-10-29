import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import {
  FileText,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Layers,
  Award,
  Target,
  FileCheck,
  CheckSquare,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  HelpCircle,
  Zap,
  TrendingUp,
  Sliders
} from "lucide-react";

const AtsRulesPage = () => {
  // Tab Filter State for Guidelines
  const [activeTab, setActiveTab] = useState("all");

  // Interactive Checklist State
  const [checkedItems, setCheckedItems] = useState({});

  // Expandable FAQ State
  const [openFaq, setOpenFaq] = useState(null);

  // Bookmark Save State for Cards
  const [savedPillars, setSavedPillars] = useState({});

  const toggleBookmark = (id) => {
    setSavedPillars((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const checklistItems = [
    { id: 1, text: "Single-column linear text layout without floating text boxes or tables", category: "Layout", weight: "Critical" },
    { id: 2, text: "Standard section headings (Work Experience, Technical Skills, Education)", category: "Structure", weight: "Critical" },
    { id: 3, text: "Technical skills isolated into clear categories matching JD terms verbatim", category: "Keywords", weight: "35% Score" },
    { id: 4, text: "All acronyms defined alongside full names at least once (e.g. AWS - Amazon Web Services)", category: "Keywords", weight: "Search" },
    { id: 5, text: "Bullet points begin with strong action verbs (Architected, Deployed, Reduced)", category: "Content", weight: "Semantic" },
    { id: 6, text: "At least 60% of experience bullets contain quantified metrics (%, $, latency, users)", category: "Content", weight: "3x Impact" },
    { id: 7, text: "Saved as UTF-8 encoded .DOCX or selectable text-layer .PDF (not scanned images)", category: "Format", weight: "Parser" },
    { id: 8, text: "Contact information placed directly in the body text (never in Word header/footer zones)", category: "Layout", weight: "Contact" },
  ];

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const readinessPercent = Math.round((completedCount / checklistItems.length) * 100);

  const faqs = [
    {
      q: "Does an ATS prefer .PDF or .DOCX format?",
      a: "Both formats parse accurately if prepared correctly. Modern enterprise systems (Workday, Greenhouse, Lever, Taleo) parse standard PDFs with 99.8% accuracy. However, if your PDF is created using graphic design tools (Canva, Photoshop, Figma) without an underlying UTF-8 text layer, the parser reads zero text. In contrast, standard .DOCX always preserves readable text streams."
    },
    {
      q: "Why do tables and two-column layouts cause auto-rejections?",
      a: "Applicant Tracking Systems use horizontal text-stream extractors. When parsing a two-column resume, the parser reads across the whole page line by line: column A line 1 merges into column B line 1. Dates, company names, and technical skills get completely scrambled into nonsensical sentences, causing candidate scoring algorithms to fail."
    },
    {
      q: "Can I use creative section titles like 'Where I've Worked' or 'My Passion'?",
      a: "No. ATS software utilizes strict regular-expression tokenizers trained on conventional headings. If you use 'Where I've Been' instead of 'Work Experience', or 'Capabilities' instead of 'Technical Skills', the parser may skip the entire section, leaving your profile blank for recruiter filters."
    },
    {
      q: "Is white-text keyword stuffing still a viable shortcut?",
      a: "Absolutely not. Modern parsers strip all CSS color styling, fonts, and inline styles into raw plaintext. Any hidden white text becomes immediately visible to recruiters and triggers automated spam detection algorithms that permanently flag or blacklist the applicant."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans relative selection:bg-indigo-500 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-gradient-to-b from-indigo-600/12 via-purple-600/8 to-transparent blur-3xl pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* Editorial Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/15 to-purple-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Master The Automated Hiring Pipeline</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white font-normal tracking-tight leading-tight">
            The Rules of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-medium">ATS-Compliant</span> Resumes
          </h1>
          <p className="mt-5 text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            A comprehensive, human-written guide to the layout geometry, keyword density formulas, and syntax rules required to pass automated applicant tracking systems.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Link
              to="/dashboard"
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
            >
              <span>Scan Your Resume Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/cv-standards"
              className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <FileCheck className="w-4 h-4 text-purple-400" />
              <span>View CV Anatomy Standards</span>
            </Link>
          </div>
        </div>

        {/* Executive Summary Metrics Banner */}
        <section className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 mb-16 shadow-xl backdrop-blur-md relative overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
            <div className="pt-3 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-serif text-rose-400 font-semibold">75%</div>
              <div className="text-xs text-slate-400 mt-1.5 font-sans">Filtered Before Human Review</div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-serif text-indigo-400 font-semibold">99.8%</div>
              <div className="text-xs text-slate-400 mt-1.5 font-sans">Single-Column Parse Rate</div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-serif text-purple-400 font-semibold">35%</div>
              <div className="text-xs text-slate-400 mt-1.5 font-sans">Weight on Technical Skills</div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-serif text-emerald-400 font-semibold">3.2x</div>
              <div className="text-xs text-slate-400 mt-1.5 font-sans">Callback Lift with Metrics</div>
            </div>
          </div>
        </section>

        {/* Filterable 4 Core Pillars with Framer Bookmark Cards */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium">
                The Four Core Pillars of ATS Compliance
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Automated screening algorithms score candidates across four distinct layers.
              </p>
            </div>

            {/* Filter Pills with active indigo highlights */}
            <div className="flex flex-wrap gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs shadow-sm">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer font-semibold ${
                  activeTab === "all"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("layout")}
                className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer font-semibold ${
                  activeTab === "layout"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Layout
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("keywords")}
                className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer font-semibold ${
                  activeTab === "keywords"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Keywords
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("metrics")}
                className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer font-semibold ${
                  activeTab === "metrics"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Metrics
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("headings")}
                className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer font-semibold ${
                  activeTab === "headings"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Headings
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* Pillar 1 */}
            {(activeTab === "all" || activeTab === "layout") && (
              <div className="bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-7 transition-all duration-500 hover:border-indigo-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/15 group relative overflow-visible cursor-pointer">
                {/* Hanging Bookmark Ribbon */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark("pillar1");
                  }}
                  className="absolute -top-3.5 right-6 z-20 cursor-pointer"
                  title={savedPillars.pillar1 ? "Bookmarked!" : "Bookmark this rule"}
                >
                  <div
                    style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 82%, 0% 100%)" }}
                    className={`w-9 h-14 sm:w-10 sm:h-16 flex flex-col items-center pt-2.5 transition-all duration-300 ease-out group-hover:translate-y-1.5 shadow-lg ${
                      savedPillars.pillar1
                        ? "bg-gradient-to-b from-indigo-500 to-indigo-700 text-white shadow-indigo-500/40"
                        : "bg-gradient-to-b from-indigo-600 to-indigo-800 text-white/90 shadow-indigo-600/30"
                    }`}
                  >
                    {savedPillars.pillar1 ? (
                      <BookmarkCheck className="w-4 h-4 fill-current animate-bounce" />
                    ) : (
                      <Bookmark className="w-4 h-4 transition-transform group-hover:scale-110" />
                    )}
                    <span className="text-[9px] font-mono font-bold tracking-tighter mt-1 opacity-90">01</span>
                  </div>
                </div>

                {/* Graphic Preview */}
                <div className="bg-[#050811] rounded-2xl p-4 border border-slate-800/90 mb-5 relative overflow-hidden group-hover:border-indigo-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-800/80">
                    <span className="text-[10px] font-mono text-slate-400">Layout_Hierarchy.pdf</span>
                    <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      Single-Column
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 w-3/4 bg-indigo-500/50 rounded transition-all duration-300 group-hover:w-5/6" />
                    <div className="h-1.5 w-full bg-slate-700/50 rounded" />
                    <div className="h-1.5 w-4/5 bg-slate-700/50 rounded" />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
                    Pillar 01 • Layout & Geometry
                  </span>
                </div>
                <h3 className="text-xl font-serif font-medium text-white mb-2.5 group-hover:text-indigo-300 transition-colors">
                  Strict Single-Column Geometry
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  Multi-column layouts, tables, and text boxes scramble character sequences when parsed by OCR engines. Always structure your document from top to bottom with standard 0.5"–0.75" margins.
                </p>

                <div className="text-xs text-slate-300 border-t border-slate-800/80 pt-4 flex items-center justify-between">
                  <span>Standard Margin: <strong className="text-white">0.5" to 0.75"</strong></span>
                  <span className="text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                    99.8% Reliability
                  </span>
                </div>
              </div>
            )}

            {/* Pillar 2 */}
            {(activeTab === "all" || activeTab === "keywords") && (
              <div className="bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-7 transition-all duration-500 hover:border-purple-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/15 group relative overflow-visible cursor-pointer">
                {/* Hanging Bookmark Ribbon */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark("pillar2");
                  }}
                  className="absolute -top-3.5 right-6 z-20 cursor-pointer"
                  title={savedPillars.pillar2 ? "Bookmarked!" : "Bookmark this rule"}
                >
                  <div
                    style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 82%, 0% 100%)" }}
                    className={`w-9 h-14 sm:w-10 sm:h-16 flex flex-col items-center pt-2.5 transition-all duration-300 ease-out group-hover:translate-y-1.5 shadow-lg ${
                      savedPillars.pillar2
                        ? "bg-gradient-to-b from-purple-500 to-purple-700 text-white shadow-purple-500/40"
                        : "bg-gradient-to-b from-purple-600 to-purple-800 text-white/90 shadow-purple-600/30"
                    }`}
                  >
                    {savedPillars.pillar2 ? (
                      <BookmarkCheck className="w-4 h-4 fill-current animate-bounce" />
                    ) : (
                      <Bookmark className="w-4 h-4 transition-transform group-hover:scale-110" />
                    )}
                    <span className="text-[9px] font-mono font-bold tracking-tighter mt-1 opacity-90">02</span>
                  </div>
                </div>

                {/* Graphic Preview */}
                <div className="bg-[#050811] rounded-2xl p-4 border border-slate-800/90 mb-5 relative overflow-hidden group-hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-800/80">
                    <span className="text-[10px] font-mono text-slate-400">Lexical_Intersection</span>
                    <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      O(1) Set Match
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                      Python: Matched
                    </span>
                    <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                      FastAPI: 100%
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400">
                    Pillar 02 • Lexical Matching
                  </span>
                </div>
                <h3 className="text-xl font-serif font-medium text-white mb-2.5 group-hover:text-purple-300 transition-colors">
                  Verbatim Keyword Integration
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  ATS engines perform O(1) set intersections between your skills and job description keywords. Include both the standard acronym and its full expanded name (e.g., "Natural Language Processing (NLP)").
                </p>

                <div className="text-xs text-slate-300 border-t border-slate-800/80 pt-4 flex items-center justify-between">
                  <span>Scoring Weight: <strong className="text-white">35% of total</strong></span>
                  <span className="text-purple-400 font-semibold bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                    Exact & Semantic
                  </span>
                </div>
              </div>
            )}

            {/* Pillar 3 */}
            {(activeTab === "all" || activeTab === "metrics") && (
              <div className="bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-7 transition-all duration-500 hover:border-emerald-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/15 group relative overflow-visible cursor-pointer">
                {/* Hanging Bookmark Ribbon */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark("pillar3");
                  }}
                  className="absolute -top-3.5 right-6 z-20 cursor-pointer"
                  title={savedPillars.pillar3 ? "Bookmarked!" : "Bookmark this rule"}
                >
                  <div
                    style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 82%, 0% 100%)" }}
                    className={`w-9 h-14 sm:w-10 sm:h-16 flex flex-col items-center pt-2.5 transition-all duration-300 ease-out group-hover:translate-y-1.5 shadow-lg ${
                      savedPillars.pillar3
                        ? "bg-gradient-to-b from-emerald-500 to-emerald-700 text-white shadow-emerald-500/40"
                        : "bg-gradient-to-b from-emerald-600 to-teal-800 text-white/90 shadow-emerald-600/30"
                    }`}
                  >
                    {savedPillars.pillar3 ? (
                      <BookmarkCheck className="w-4 h-4 fill-current animate-bounce" />
                    ) : (
                      <Bookmark className="w-4 h-4 transition-transform group-hover:scale-110" />
                    )}
                    <span className="text-[9px] font-mono font-bold tracking-tighter mt-1 opacity-90">03</span>
                  </div>
                </div>

                {/* Graphic Preview */}
                <div className="bg-[#050811] rounded-2xl p-4 border border-slate-800/90 mb-5 relative overflow-hidden group-hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800/80">
                    <span className="text-[10px] font-mono text-slate-400">STAR_Outcome</span>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      +42% Latency
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full w-4/5" />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                    Pillar 03 • Impact Evidence
                  </span>
                </div>
                <h3 className="text-xl font-serif font-medium text-white mb-2.5 group-hover:text-emerald-300 transition-colors">
                  Quantified STAR Experience Bullets
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  Passive duty descriptions receive low semantic embedding scores. Structure bullets with: [Action Verb] + [Duty/Scope] + [Quantified Result (% reduction, $ savings, request scale)].
                </p>

                <div className="text-xs text-slate-300 border-t border-slate-800/80 pt-4 flex items-center justify-between">
                  <span>Target Density: <strong className="text-white">≥60% of bullets</strong></span>
                  <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    STAR Formula
                  </span>
                </div>
              </div>
            )}

            {/* Pillar 4 */}
            {(activeTab === "all" || activeTab === "headings") && (
              <div className="bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-7 transition-all duration-500 hover:border-sky-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-500/15 group relative overflow-visible cursor-pointer">
                {/* Hanging Bookmark Ribbon */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark("pillar4");
                  }}
                  className="absolute -top-3.5 right-6 z-20 cursor-pointer"
                  title={savedPillars.pillar4 ? "Bookmarked!" : "Bookmark this rule"}
                >
                  <div
                    style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 82%, 0% 100%)" }}
                    className={`w-9 h-14 sm:w-10 sm:h-16 flex flex-col items-center pt-2.5 transition-all duration-300 ease-out group-hover:translate-y-1.5 shadow-lg ${
                      savedPillars.pillar4
                        ? "bg-gradient-to-b from-sky-500 to-sky-700 text-white shadow-sky-500/40"
                        : "bg-gradient-to-b from-sky-600 to-blue-800 text-white/90 shadow-sky-600/30"
                    }`}
                  >
                    {savedPillars.pillar4 ? (
                      <BookmarkCheck className="w-4 h-4 fill-current animate-bounce" />
                    ) : (
                      <Bookmark className="w-4 h-4 transition-transform group-hover:scale-110" />
                    )}
                    <span className="text-[9px] font-mono font-bold tracking-tighter mt-1 opacity-90">04</span>
                  </div>
                </div>

                {/* Graphic Preview */}
                <div className="bg-[#050811] rounded-2xl p-4 border border-slate-800/90 mb-5 relative overflow-hidden group-hover:border-sky-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-800/80">
                    <span className="text-[10px] font-mono text-slate-400">Headings_Token_Map</span>
                    <span className="text-[9px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                      Recognized
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-300 flex items-center justify-between">
                    <span>Work Experience</span>
                    <span className="text-emerald-400">Valid ✓</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">
                    Pillar 04 • Section Tagging
                  </span>
                </div>
                <h3 className="text-xl font-serif font-medium text-white mb-2.5 group-hover:text-sky-300 transition-colors">
                  Standard Section Naming Conventions
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  Never replace standard headings with creative titles. Parsers recognize: "Work Experience", "Professional Experience", "Technical Skills", and "Education". Creative labels cause parser dropouts.
                </p>

                <div className="text-xs text-slate-300 border-t border-slate-800/80 pt-4 flex items-center justify-between">
                  <span>Headings: <strong className="text-white">Standardized</strong></span>
                  <span className="text-sky-400 font-semibold bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
                    Zero Custom Titles
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Side-by-Side Professional Do's and Don'ts */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium">
              ATS Compliance: Approved vs. Prohibited
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Specific practices that ensure clean database ingestion versus triggers that lead to immediate parsing failure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* The Don'ts */}
            <div className="bg-gradient-to-b from-rose-950/20 via-slate-900/60 to-slate-950/90 border border-rose-900/35 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 pb-5 mb-5 border-b border-rose-900/30">
                <div className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-rose-300">
                    Prohibited ATS Traps
                  </h3>
                  <p className="text-xs text-rose-400/80">Causes 75% of automated parsing rejections</p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold select-none text-base leading-tight">✕</span>
                  <div>
                    <strong className="text-white">Graphic Skill Rating Bars:</strong>
                    <p className="text-slate-400 text-xs mt-0.5">Graphic progress bars, star ratings, or colored dots cannot be parsed by text extractors.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold select-none text-base leading-tight">✕</span>
                  <div>
                    <strong className="text-white">Two-Column Magazine Layouts:</strong>
                    <p className="text-slate-400 text-xs mt-0.5">Text extractors read across both columns simultaneously, creating scrambled, disjointed sentences.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold select-none text-base leading-tight">✕</span>
                  <div>
                    <strong className="text-white">Contact Info in Document Headers/Footers:</strong>
                    <p className="text-slate-400 text-xs mt-0.5">Many enterprise parsers discard Word and PDF header/footer margins to optimize processing speed.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold select-none text-base leading-tight">✕</span>
                  <div>
                    <strong className="text-white">Invisible White-Text Keyword Stuffing:</strong>
                    <p className="text-slate-400 text-xs mt-0.5">Stripped CSS reveals all hidden text, triggering spam penalties and immediate applicant disqualification.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* The Do's */}
            <div className="bg-gradient-to-b from-emerald-950/20 via-slate-900/60 to-slate-950/90 border border-emerald-900/35 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 pb-5 mb-5 border-b border-emerald-900/30">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-emerald-300">
                    Approved Winning Formula
                  </h3>
                  <p className="text-xs text-emerald-400/80">Guarantees clean 99.8% database ingestion</p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold select-none text-base leading-tight">✓</span>
                  <div>
                    <strong className="text-white">Categorized Plain-Text Skill Lists:</strong>
                    <p className="text-slate-400 text-xs mt-0.5">Structured lists under clear headings: Languages, Frameworks, Cloud, and Databases.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold select-none text-base leading-tight">✓</span>
                  <div>
                    <strong className="text-white">Single-Column Linear Reading Order:</strong>
                    <p className="text-slate-400 text-xs mt-0.5">Sequential top-to-bottom layout with consistent 0.5"–0.75" margins and universal typography.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold select-none text-base leading-tight">✓</span>
                  <div>
                    <strong className="text-white">STAR Action Bullet Points with Metrics:</strong>
                    <p className="text-slate-400 text-xs mt-0.5">Action verb followed by technical context and measured outcome (e.g. "Reduced API latency by 42%").</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold select-none text-base leading-tight">✓</span>
                  <div>
                    <strong className="text-white">Dual Acronym and Full Title Mentions:</strong>
                    <p className="text-slate-400 text-xs mt-0.5">Satisfies both automated regex searches and recruiter keyword queries across variations.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive Self-Audit Checklist */}
        <section className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
                <CheckSquare className="w-4 h-4" /> Interactive Audit
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium">
                Interactive ATS Readiness Checklist
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                Check off compliance items to compute your resume's automated parsing probability.
              </p>
            </div>

            {/* Score Pill */}
            <div className="flex items-center gap-3 bg-[#050811] px-5 py-2.5 rounded-2xl border border-slate-800">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-medium">Readiness</div>
                <div className="text-xl font-serif font-bold text-indigo-400">{readinessPercent}%</div>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-indigo-500/40 bg-indigo-500/10 flex items-center justify-center font-mono text-xs font-bold text-indigo-300">
                {completedCount}/8
              </div>
            </div>
          </div>

          {/* Animated Progress Line with smooth gradient */}
          <div className="w-full bg-[#050811] h-2.5 rounded-full overflow-hidden mb-7 border border-slate-800">
            <div
              className="bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${readinessPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-7">
            {checklistItems.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-3.5 ${
                    isChecked
                      ? "bg-indigo-600/10 border-indigo-500/50 text-white shadow-md shadow-indigo-500/5 scale-[1.01]"
                      : "bg-[#050811] border-slate-800/80 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all flex-shrink-0 ${
                      isChecked
                        ? "bg-indigo-600 border-indigo-600 text-white scale-110"
                        : "border-slate-600 bg-transparent"
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />}
                  </div>
                  <div className="text-xs sm:text-sm">
                    <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md mr-2 uppercase">
                      {item.category}
                    </span>
                    <span className={isChecked ? "text-white font-medium" : "text-slate-300"}>
                      {item.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {readinessPercent === 100 ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                All 8 essential criteria satisfied. Your resume will parse cleanly into enterprise databases.
              </span>
              <Link to="/dashboard" className="text-emerald-400 font-bold underline hover:text-white ml-2">
                Scan Document →
              </Link>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[#050811] border border-slate-800 text-slate-400 text-xs flex items-center justify-between">
              <span>Satisfy all items to minimize the probability of automated parser rejection.</span>
              <span className="text-indigo-400 font-semibold">{8 - completedCount} pending checks</span>
            </div>
          )}
        </section>

        {/* Expandable Technical Questions (FAQ Accordion with smooth animation) */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium">
              Frequently Clarified Technical Questions
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Practical answers to edge cases encountered when building ATS-compliant applications.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`bg-slate-900/80 border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-indigo-500/40 shadow-xl shadow-indigo-500/5 bg-slate-900" : "border-slate-800"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                  >
                    <span className={`text-sm sm:text-base font-medium transition-colors ${isOpen ? "text-indigo-300" : "text-white"}`}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180 text-indigo-400" : "text-slate-400"
                      }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden px-5 ${
                      isOpen ? "max-h-56 pb-5 pt-1 opacity-100 border-t border-slate-800/80" : "max-h-0 pb-0 pt-0 opacity-0"
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Editorial Footer Callout with refined Indigo accent */}
        <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900/90 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-xl font-serif font-medium text-white mb-1.5">
              Test your resume against these standards
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Upload your resume and any target Job Description to receive a section-by-section ATS evaluation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-lg shadow-indigo-600/30"
            >
              Scan Resume Now
            </Link>
            <Link
              to="/cv-standards"
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition cursor-pointer"
            >
              CV Standards
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AtsRulesPage;
