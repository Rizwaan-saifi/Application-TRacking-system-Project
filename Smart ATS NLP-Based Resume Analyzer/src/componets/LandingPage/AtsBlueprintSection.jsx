import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Layers,
  Award,
  Target,
  Type,
  Calendar,
  Maximize2,
  FileCheck,
  Sparkles,
  Bookmark,
  BookmarkCheck
} from "lucide-react";

const AtsBlueprintSection = () => {
  const [showFormatDetails, setShowFormatDetails] = useState(false);
  const [bookmarkedRules, setBookmarkedRules] = useState({ 1: false, 2: false, 3: false });

  const toggleBookmark = (id) => {
    setBookmarkedRules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="bg-[#090d16] text-slate-100 py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Essential Candidate Knowledge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-normal tracking-tight leading-tight">
            What Makes a Resume <span className="text-indigo-400 font-medium">Pass the ATS?</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            A practical reference on the layout structures, keyword patterns, and formatting conventions required by modern applicant tracking systems.
          </p>
        </div>

        {/* 3 Core Rules Boxes Styled as Framer 'Card — Bookmark' */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-10 pt-4">
          {/* Card 1: Single-Column Text Flow */}
          <div className="bg-[#0f1422] border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/15 group relative overflow-visible cursor-pointer">
            {/* Hanging Bookmark Ribbon */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(1);
              }}
              className="absolute -top-3.5 right-6 z-20 cursor-pointer group/bookmark"
              title={bookmarkedRules[1] ? "Saved in your bookmarks" : "Click to bookmark this rule"}
            >
              <div
                style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 82%, 0% 100%)" }}
                className={`w-9 h-14 sm:w-10 sm:h-16 flex flex-col items-center pt-2.5 transition-all duration-300 ease-out group-hover:translate-y-1.5 shadow-lg ${
                  bookmarkedRules[1]
                    ? "bg-gradient-to-b from-indigo-500 to-indigo-700 text-white shadow-indigo-500/40"
                    : "bg-gradient-to-b from-indigo-600 to-indigo-800 text-white/90 group-hover/bookmark:from-indigo-500 group-hover/bookmark:to-indigo-700 shadow-indigo-600/30"
                }`}
              >
                {bookmarkedRules[1] ? (
                  <BookmarkCheck className="w-4 h-4 fill-current animate-bounce" />
                ) : (
                  <Bookmark className="w-4 h-4 transition-transform group-hover/bookmark:scale-110" />
                )}
                <span className="text-[9px] font-mono font-bold tracking-tighter mt-1 opacity-90">
                  01
                </span>
              </div>
            </div>

            {/* Top Interactive Graphic Preview Box */}
            <div className="bg-[#080b12] rounded-2xl p-4 border border-slate-800/80 mb-5 relative overflow-hidden group-hover:border-indigo-500/30 transition-colors">
              <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-mono text-slate-400">Layout_v1.0.docx</span>
                </div>
                <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                  Linear Flow
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-3/4 bg-indigo-500/40 rounded transition-all duration-300 group-hover:w-5/6" />
                <div className="h-1.5 w-full bg-slate-700/50 rounded" />
                <div className="h-1.5 w-5/6 bg-slate-700/50 rounded" />
                <div className="h-1.5 w-2/3 bg-slate-700/40 rounded" />
              </div>
            </div>

            {/* Card Body */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
                  Rule 01 • Structure
                </span>
              </div>
              <h3 className="text-xl font-serif font-medium text-white mb-2.5 group-hover:text-indigo-300 transition-colors">
                Single-Column Text Flow
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
                Never use multi-column templates, tables, or floating text boxes. Parsers read horizontally left-to-right across the page and will scramble your work experience and dates into unreadable text.
              </p>
            </div>

            {/* Card Footer Bar */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-indigo-300 font-semibold bg-indigo-500/10 py-1.5 px-3 rounded-xl border border-indigo-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>99.8% Parse Reliability</span>
              </div>
              <span className="text-xs text-slate-500 group-hover:text-indigo-400 transition-colors flex items-center gap-1 font-medium">
                {bookmarkedRules[1] ? "Bookmarked ✓" : "Save Rule"}
              </span>
            </div>
          </div>

          {/* Card 2: Categorized Skills Matrix */}
          <div className="bg-[#0f1422] border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/15 group relative overflow-visible cursor-pointer">
            {/* Hanging Bookmark Ribbon */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(2);
              }}
              className="absolute -top-3.5 right-6 z-20 cursor-pointer group/bookmark"
              title={bookmarkedRules[2] ? "Saved in your bookmarks" : "Click to bookmark this rule"}
            >
              <div
                style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 82%, 0% 100%)" }}
                className={`w-9 h-14 sm:w-10 sm:h-16 flex flex-col items-center pt-2.5 transition-all duration-300 ease-out group-hover:translate-y-1.5 shadow-lg ${
                  bookmarkedRules[2]
                    ? "bg-gradient-to-b from-purple-500 to-purple-700 text-white shadow-purple-500/40"
                    : "bg-gradient-to-b from-purple-600 to-purple-800 text-white/90 group-hover/bookmark:from-purple-500 group-hover/bookmark:to-purple-700 shadow-purple-600/30"
                }`}
              >
                {bookmarkedRules[2] ? (
                  <BookmarkCheck className="w-4 h-4 fill-current animate-bounce" />
                ) : (
                  <Bookmark className="w-4 h-4 transition-transform group-hover/bookmark:scale-110" />
                )}
                <span className="text-[9px] font-mono font-bold tracking-tighter mt-1 opacity-90">
                  02
                </span>
              </div>
            </div>

            {/* Top Interactive Graphic Preview Box */}
            <div className="bg-[#080b12] rounded-2xl p-4 border border-slate-800/80 mb-5 relative overflow-hidden group-hover:border-purple-500/30 transition-colors">
              <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-[10px] font-mono text-slate-400">Skills_Vector_Matrix</span>
                </div>
                <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                  O(1) Match
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                  Python: 100%
                </span>
                <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                  FastAPI: Match
                </span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  Docker: Match
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400">
                  Rule 02 • Indexing
                </span>
              </div>
              <h3 className="text-xl font-serif font-medium text-white mb-2.5 group-hover:text-purple-300 transition-colors">
                Categorized Skills Matrix
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
                Technical proficiencies account for 35% of overall match scoring. Group your skills under explicit labels: Languages, Frameworks, Databases, and Tools, matching keywords verbatim from the job description.
              </p>
            </div>

            {/* Card Footer Bar */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-purple-300 font-semibold bg-purple-500/10 py-1.5 px-3 rounded-xl border border-purple-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>35% Scoring Weight</span>
              </div>
              <span className="text-xs text-slate-500 group-hover:text-purple-400 transition-colors flex items-center gap-1 font-medium">
                {bookmarkedRules[2] ? "Bookmarked ✓" : "Save Rule"}
              </span>
            </div>
          </div>

          {/* Card 3: Quantified Achievement Bullets */}
          <div className="bg-[#0f1422] border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/15 group relative overflow-visible cursor-pointer">
            {/* Hanging Bookmark Ribbon */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(3);
              }}
              className="absolute -top-3.5 right-6 z-20 cursor-pointer group/bookmark"
              title={bookmarkedRules[3] ? "Saved in your bookmarks" : "Click to bookmark this rule"}
            >
              <div
                style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 82%, 0% 100%)" }}
                className={`w-9 h-14 sm:w-10 sm:h-16 flex flex-col items-center pt-2.5 transition-all duration-300 ease-out group-hover:translate-y-1.5 shadow-lg ${
                  bookmarkedRules[3]
                    ? "bg-gradient-to-b from-emerald-500 to-emerald-700 text-white shadow-emerald-500/40"
                    : "bg-gradient-to-b from-emerald-600 to-emerald-800 text-white/90 group-hover/bookmark:from-emerald-500 group-hover/bookmark:to-emerald-700 shadow-emerald-600/30"
                }`}
              >
                {bookmarkedRules[3] ? (
                  <BookmarkCheck className="w-4 h-4 fill-current animate-bounce" />
                ) : (
                  <Bookmark className="w-4 h-4 transition-transform group-hover/bookmark:scale-110" />
                )}
                <span className="text-[9px] font-mono font-bold tracking-tighter mt-1 opacity-90">
                  03
                </span>
              </div>
            </div>

            {/* Top Interactive Graphic Preview Box */}
            <div className="bg-[#080b12] rounded-2xl p-4 border border-slate-800/80 mb-5 relative overflow-hidden group-hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400">STAR_Metric_Lift</span>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  +42% Latency
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full w-4/5 transition-all duration-500 group-hover:w-full" />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-slate-500">
                  <span>Action: Architected</span>
                  <span>Impact: 1.5M Req</span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                  Rule 03 • Impact
                </span>
              </div>
              <h3 className="text-xl font-serif font-medium text-white mb-2.5 group-hover:text-emerald-300 transition-colors">
                Quantified Achievement Bullets
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
                Begin every bullet with an active verb (Architected, Deployed, Reduced) followed by specific metrics (%, $, latency, user volume). Resumes with measurable impact receive significantly higher semantic rankings.
              </p>
            </div>

            {/* Card Footer Bar */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold bg-emerald-500/10 py-1.5 px-3 rounded-xl border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>3x Interview Callback Rate</span>
              </div>
              <span className="text-xs text-slate-500 group-hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium">
                {bookmarkedRules[3] ? "Bookmarked ✓" : "Save Rule"}
              </span>
            </div>
          </div>
        </div>

        {/* 4th Box: Interactive Detailed Resume Format Specifications */}
        <div className="bg-[#0f1422] border border-slate-800 rounded-3xl p-6 sm:p-8 mb-12 transition-all duration-300 hover:border-slate-700 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 flex-shrink-0 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">
                  Rule 04 • Technical Formatting Details
                </div>
                <h3 className="text-lg font-serif font-medium text-white mt-0.5">
                  Typography, Margins & Document Syntax
                </h3>
                <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                  Precise technical parameters for margins, typography sizes, date formats, and file encoding required for 100% optical readability.
                </p>
              </div>
            </div>

            {/* Interactive Toggle Button */}
            <button
              type="button"
              onClick={() => setShowFormatDetails(!showFormatDetails)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition flex items-center gap-2 cursor-pointer flex-shrink-0 shadow-md shadow-indigo-600/25"
            >
              <span>{showFormatDetails ? "Hide Format Details" : "View Format Details"}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  showFormatDetails ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Animated Detail Container */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showFormatDetails ? "max-h-[850px] opacity-100 mt-8 pt-6 border-t border-slate-800" : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Detail 1: Typography */}
              <div className="bg-[#090d16] border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition">
                <div className="flex items-center gap-2.5 text-indigo-300 text-sm font-semibold mb-2">
                  <Type className="w-4 h-4 text-indigo-400" />
                  <span>Approved Fonts & Font Sizing</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-3">
                  Stick to universal, pre-installed fonts that all ATS parsers recognize without substitution errors:
                </p>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 font-mono">
                  <li><strong className="text-white">Sans-serif:</strong> Calibri, Arial, Helvetica (Body: 10–11pt | Headers: 13–15pt)</li>
                  <li><strong className="text-white">Serif:</strong> Georgia, Garamond, Times New Roman (Body: 10.5–11.5pt)</li>
                  <li><strong className="text-white">Bullets:</strong> Standard solid black circle (•) only. Never use custom wingdings, arrows, or checkmark icons.</li>
                </ul>
              </div>

              {/* Detail 2: Margins & Spacing */}
              <div className="bg-[#090d16] border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition">
                <div className="flex items-center gap-2.5 text-purple-300 text-sm font-semibold mb-2">
                  <Maximize2 className="w-4 h-4 text-purple-400" />
                  <span>Page Margins & Line Geometry</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-3">
                  Strict boundary parameters to prevent text truncation during conversion:
                </p>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 font-mono">
                  <li><strong className="text-white">Margins:</strong> Exactly 0.5" to 0.75" on top, bottom, left, and right. Never use 0" or 0.25".</li>
                  <li><strong className="text-white">Line Spacing:</strong> 1.0 to 1.15. Setting line height below 0.9 causes overlapping lines in PDF text-stream extractors.</li>
                  <li><strong className="text-white">Headers & Footers:</strong> Never put phone/email in Word header/footer zones (many ATS ignore headers to save memory).</li>
                </ul>
              </div>

              {/* Detail 3: Date Formats */}
              <div className="bg-[#090d16] border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition">
                <div className="flex items-center gap-2.5 text-emerald-300 text-sm font-semibold mb-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Date Syntaxes & Chronology</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-3">
                  Parsers calculate your total years of experience using regular expression date extractors:
                </p>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 font-mono">
                  <li><strong className="text-white">Format:</strong> Use <span className="text-emerald-300 font-semibold">MM/YYYY – MM/YYYY</span> (e.g. 04/2021 – Present) or <span className="text-emerald-300 font-semibold">Month YYYY – Month YYYY</span>.</li>
                  <li><strong className="text-white">Consistency:</strong> Never mix "Apr 2021" with "04/2021" across different roles.</li>
                  <li><strong className="text-white">Always include months:</strong> Stating just "2021 – 2022" can be interpreted as either 2 months or 24 months, triggering seniority penalties.</li>
                </ul>
              </div>

              {/* Detail 4: File Encoding */}
              <div className="bg-[#090d16] border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition">
                <div className="flex items-center gap-2.5 text-sky-300 text-sm font-semibold mb-2">
                  <FileCheck className="w-4 h-4 text-sky-400" />
                  <span>File Type & Text Encoding</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-3">
                  How the file must be encoded on the binary level for parsing:
                </p>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 font-mono">
                  <li><strong className="text-white">Safe Types:</strong> Clean Microsoft Word (.DOCX) or standard text-layer PDF (.PDF) encoded in UTF-8.</li>
                  <li><strong className="text-white">Scanned PDF Warning:</strong> If you cannot highlight and copy text with your mouse inside the PDF, the ATS parser reads 0 words.</li>
                  <li><strong className="text-white">File Naming:</strong> Use clear naming without spaces: <span className="text-sky-300">Firstname_Lastname_Resume.pdf</span>.</li>
                </ul>
              </div>
            </div>

            {/* Quick Summary Note */}
            <div className="mt-4 p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-slate-300 flex items-center justify-between">
              <span>Following these 4 format standards guarantees clean text extraction across Workday, Taleo, Greenhouse, and Lever.</span>
              <Link to="/ats-rules" className="text-indigo-400 font-semibold underline hover:text-white ml-3 flex-shrink-0">
                Read Full Rules →
              </Link>
            </div>
          </div>
        </div>

        {/* Guides Footer Navigation Card */}
        <div className="bg-[#0f1422] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h4 className="text-base font-serif font-medium text-white mb-1">
              Want to see these rules in a complete template?
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm">
              Explore our section-by-section CV anatomy guide or copy an ATS-compliant template.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/ats-rules"
              className="px-5 py-2.5 rounded-xl bg-[#111624] hover:bg-[#182032] border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>ATS Algorithm Rules</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            </Link>
            <Link
              to="/cv-standards"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20"
            >
              <span>CV Anatomy Standards</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtsBlueprintSection;
