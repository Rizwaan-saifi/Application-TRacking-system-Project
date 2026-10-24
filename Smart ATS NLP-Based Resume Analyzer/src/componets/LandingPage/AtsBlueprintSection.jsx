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
  FileCheck
} from "lucide-react";

const AtsBlueprintSection = () => {
  const [showFormatDetails, setShowFormatDetails] = useState(false);

  return (
    <section className="bg-[#0b0c0e] text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1f2328]">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading - Simple, Classic, Human-crafted */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs uppercase tracking-widest text-neutral-400 font-medium mb-3">
            Standards & Guidelines
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-normal tracking-tight leading-tight">
            What Makes a Resume Pass the ATS?
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            A practical reference on the layout structures, keyword patterns, and formatting conventions required by modern applicant tracking systems.
          </p>
        </div>

        {/* 3 Core Rules Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Box 1: Single-Column Text Flow */}
          <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-neutral-600 transition">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-300 mb-5">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Rule 01 • Structure
              </div>
              <h3 className="text-lg font-serif font-medium text-white mb-2.5">
                Single-Column Text Flow
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-sans">
                Never use multi-column templates, tables, or floating text boxes. Parsers read horizontally left-to-right across the page and will scramble your work experience and dates into unreadable text.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium bg-neutral-800/50 py-1.5 px-3 rounded-lg border border-neutral-700/50 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>99.8% Parse Reliability</span>
            </div>
          </div>

          {/* Box 2: Categorized Skills Matrix */}
          <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-neutral-600 transition">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-300 mb-5">
                <Target className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Rule 02 • Indexing
              </div>
              <h3 className="text-lg font-serif font-medium text-white mb-2.5">
                Categorized Skills Matrix
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-sans">
                Technical proficiencies account for 35% of overall match scoring. Group your skills under explicit labels: Languages, Frameworks, Databases, and Tools, matching keywords verbatim from the job description.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium bg-neutral-800/50 py-1.5 px-3 rounded-lg border border-neutral-700/50 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>35% Scoring Weight</span>
            </div>
          </div>

          {/* Box 3: Quantified Achievement Bullets */}
          <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-neutral-600 transition">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-300 mb-5">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Rule 03 • Impact
              </div>
              <h3 className="text-lg font-serif font-medium text-white mb-2.5">
                Quantified Achievement Bullets
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-sans">
                Begin every bullet with an active verb (Architected, Deployed, Reduced) followed by specific metrics (%, $, latency, user volume). Resumes with measurable impact receive significantly higher semantic rankings.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium bg-neutral-800/50 py-1.5 px-3 rounded-lg border border-neutral-700/50 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>3x Interview Callback Rate</span>
            </div>
          </div>
        </div>

        {/* 4th Box: Interactive Detailed Resume Format Specifications */}
        <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-8 mb-12 transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-300 flex-shrink-0 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  Rule 04 • Technical Formatting Details
                </div>
                <h3 className="text-lg font-serif font-medium text-white mt-0.5">
                  Typography, Margins & Document Syntax
                </h3>
                <p className="text-neutral-400 text-sm mt-1 max-w-2xl">
                  Precise technical parameters for margins, typography sizes, date formats, and file encoding required for 100% optical readability.
                </p>
              </div>
            </div>

            {/* Interactive Toggle Button */}
            <button
              type="button"
              onClick={() => setShowFormatDetails(!showFormatDetails)}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white text-xs sm:text-sm font-semibold transition flex items-center gap-2 cursor-pointer flex-shrink-0 shadow-sm"
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
              showFormatDetails ? "max-h-[850px] opacity-100 mt-8 pt-6 border-t border-[#22262c]" : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Detail 1: Typography */}
              <div className="bg-[#0b0c0e] border border-[#1f2328] rounded-xl p-5">
                <div className="flex items-center gap-2.5 text-neutral-200 text-sm font-semibold mb-2">
                  <Type className="w-4 h-4 text-neutral-400" />
                  <span>Approved Fonts & Font Sizing</span>
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed mb-3">
                  Stick to universal, pre-installed fonts that all ATS parsers recognize without substitution errors:
                </p>
                <ul className="text-xs text-neutral-300 space-y-1.5 list-disc pl-4 font-mono">
                  <li><strong className="text-white">Sans-serif:</strong> Calibri, Arial, Helvetica (Body: 10–11pt | Headers: 13–15pt)</li>
                  <li><strong className="text-white">Serif:</strong> Georgia, Garamond, Times New Roman (Body: 10.5–11.5pt)</li>
                  <li><strong className="text-white">Bullets:</strong> Standard solid black circle (•) only. Never use custom wingdings, arrows, or checkmark icons.</li>
                </ul>
              </div>

              {/* Detail 2: Margins & Spacing */}
              <div className="bg-[#0b0c0e] border border-[#1f2328] rounded-xl p-5">
                <div className="flex items-center gap-2.5 text-neutral-200 text-sm font-semibold mb-2">
                  <Maximize2 className="w-4 h-4 text-neutral-400" />
                  <span>Page Margins & Line Geometry</span>
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed mb-3">
                  Strict boundary parameters to prevent text truncation during conversion:
                </p>
                <ul className="text-xs text-neutral-300 space-y-1.5 list-disc pl-4 font-mono">
                  <li><strong className="text-white">Margins:</strong> Exactly 0.5" to 0.75" on top, bottom, left, and right. Never use 0" or 0.25".</li>
                  <li><strong className="text-white">Line Spacing:</strong> 1.0 to 1.15. Setting line height below 0.9 causes overlapping lines in PDF text-stream extractors.</li>
                  <li><strong className="text-white">Headers & Footers:</strong> Never put phone/email in Word header/footer zones (many ATS ignore headers to save memory).</li>
                </ul>
              </div>

              {/* Detail 3: Date Formats */}
              <div className="bg-[#0b0c0e] border border-[#1f2328] rounded-xl p-5">
                <div className="flex items-center gap-2.5 text-neutral-200 text-sm font-semibold mb-2">
                  <Calendar className="w-4 h-4 text-neutral-400" />
                  <span>Date Syntaxes & Chronology</span>
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed mb-3">
                  Parsers calculate your total years of experience using regular expression date extractors:
                </p>
                <ul className="text-xs text-neutral-300 space-y-1.5 list-disc pl-4 font-mono">
                  <li><strong className="text-white">Format:</strong> Use <span className="text-neutral-200">MM/YYYY – MM/YYYY</span> (e.g. 04/2021 – Present) or <span className="text-neutral-200">Month YYYY – Month YYYY</span>.</li>
                  <li><strong className="text-white">Consistency:</strong> Never mix "Apr 2021" with "04/2021" across different roles.</li>
                  <li><strong className="text-white">Always include months:</strong> Stating just "2021 – 2022" can be interpreted as either 2 months or 24 months, triggering seniority penalties.</li>
                </ul>
              </div>

              {/* Detail 4: File Encoding */}
              <div className="bg-[#0b0c0e] border border-[#1f2328] rounded-xl p-5">
                <div className="flex items-center gap-2.5 text-neutral-200 text-sm font-semibold mb-2">
                  <FileCheck className="w-4 h-4 text-neutral-400" />
                  <span>File Type & Text Encoding</span>
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed mb-3">
                  How the file must be encoded on the binary level for parsing:
                </p>
                <ul className="text-xs text-neutral-300 space-y-1.5 list-disc pl-4 font-mono">
                  <li><strong className="text-white">Safe Types:</strong> Clean Microsoft Word (.DOCX) or standard text-layer PDF (.PDF) encoded in UTF-8.</li>
                  <li><strong className="text-white">Scanned PDF Warning:</strong> If you cannot highlight and copy text with your mouse inside the PDF, the ATS parser reads 0 words.</li>
                  <li><strong className="text-white">File Naming:</strong> Use clear naming without spaces: <span className="text-neutral-200">Firstname_Lastname_Resume.pdf</span>.</li>
                </ul>
              </div>
            </div>

            {/* Quick Summary Note */}
            <div className="mt-4 p-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
              <span>Following these 4 format standards guarantees clean text extraction across Workday, Taleo, Greenhouse, and Lever.</span>
              <Link to="/ats-rules" className="text-white font-medium underline hover:text-neutral-200 ml-3 flex-shrink-0">
                Read Full Rules →
              </Link>
            </div>
          </div>
        </div>

        {/* Guides Footer Navigation Card */}
        <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-serif font-medium text-white mb-1">
              Want to see these rules in a complete template?
            </h4>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Explore our section-by-section CV anatomy guide or copy an ATS-compliant template.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/ats-rules"
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-medium text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>ATS Algorithm Rules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/cv-standards"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
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
