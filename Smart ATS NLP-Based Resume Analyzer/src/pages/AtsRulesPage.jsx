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
  Sliders,
  CheckSquare,
  HelpCircle,
  Sparkles
} from "lucide-react";

const AtsRulesPage = () => {
  // Tab State for Guidelines
  const [activeTab, setActiveTab] = useState("all"); // "all" | "layout" | "keywords" | "metrics" | "headings"

  // Interactive Checklist State
  const [checkedItems, setCheckedItems] = useState({});

  // Expandable FAQ State
  const [openFaq, setOpenFaq] = useState(null);

  const checklistItems = [
    { id: 1, text: "Single-column linear text layout without floating text boxes or tables", category: "Layout" },
    { id: 2, text: "Standard section headings (Work Experience, Technical Skills, Education)", category: "Structure" },
    { id: 3, text: "Technical skills isolated into clear categories matching JD terms verbatim", category: "Keywords" },
    { id: 4, text: "All acronyms defined alongside full names at least once (e.g. AWS - Amazon Web Services)", category: "Keywords" },
    { id: 5, text: "Bullet points begin with strong action verbs (Architected, Deployed, Reduced)", category: "Content" },
    { id: 6, text: "At least 60% of experience bullets contain quantified metrics (%, $, latency, users)", category: "Content" },
    { id: 7, text: "Saved as UTF-8 encoded .DOCX or selectable text-layer .PDF (not scanned images)", category: "Format" },
    { id: 8, text: "Contact information placed directly in the body text (never in Word header/footer zones)", category: "Layout" },
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
      a: "Both formats parse accurately if prepared correctly. Modern systems (Workday, Greenhouse, Lever, Taleo) parse standard PDFs with 99.8% accuracy. However, if your PDF is created using graphic design tools (Canva, Photoshop, Figma) without an underlying UTF-8 text layer, the parser reads zero text. In contrast, .DOCX always preserves readable text streams."
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
    <div className="min-h-screen bg-[#0b0c0e] text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* Editorial Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-[11px] uppercase tracking-widest text-neutral-400 font-semibold mb-3">
            Technical Standards & Reference
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-normal tracking-tight leading-tight">
            The Rules of ATS-Compliant Resumes
          </h1>
          <p className="mt-5 text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            A comprehensive, human-written guide to the layout geometry, keyword density formulas, and syntax rules required to pass automated applicant tracking systems.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs sm:text-sm transition shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Scan Your Resume Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/cv-standards"
              className="px-5 py-2.5 rounded-xl bg-[#14161a] hover:bg-[#1a1d22] border border-[#22262d] text-neutral-300 font-medium text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <FileCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>View CV Anatomy Standards</span>
            </Link>
          </div>
        </div>

        {/* Executive Summary Metrics Banner */}
        <section className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-8 mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#22262c]">
            <div className="pt-3 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-serif text-white font-medium">75%</div>
              <div className="text-xs text-neutral-400 mt-1 font-sans">Filtered Before Human Review</div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-serif text-white font-medium">99.8%</div>
              <div className="text-xs text-neutral-400 mt-1 font-sans">Single-Column Parse Rate</div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-serif text-white font-medium">35%</div>
              <div className="text-xs text-neutral-400 mt-1 font-sans">Weight on Technical Skills</div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-serif text-white font-medium">3.2x</div>
              <div className="text-xs text-neutral-400 mt-1 font-sans">Callback Lift with Metrics</div>
            </div>
          </div>
        </section>

        {/* Filterable 4 Core Pillars */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                The Four Core Pillars of ATS Compliance
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">
                Automated screening algorithms score resumes across four distinct layers.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-[#121417] p-1 rounded-xl border border-[#22262c] text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-medium ${
                  activeTab === "all" ? "bg-white text-neutral-950" : "text-neutral-400 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("layout")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-medium ${
                  activeTab === "layout" ? "bg-white text-neutral-950" : "text-neutral-400 hover:text-white"
                }`}
              >
                Layout
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("keywords")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-medium ${
                  activeTab === "keywords" ? "bg-white text-neutral-950" : "text-neutral-400 hover:text-white"
                }`}
              >
                Keywords
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("metrics")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-medium ${
                  activeTab === "metrics" ? "bg-white text-neutral-950" : "text-neutral-400 hover:text-white"
                }`}
              >
                Metrics
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("headings")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-medium ${
                  activeTab === "headings" ? "bg-white text-neutral-950" : "text-neutral-400 hover:text-white"
                }`}
              >
                Headings
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Pillar 1 */}
            {(activeTab === "all" || activeTab === "layout") && (
              <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 transition-all duration-300 hover:border-neutral-600">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Pillar 01</span>
                  <span className="text-xs text-neutral-400 font-medium">Layout & Text Flow</span>
                </div>
                <h3 className="text-base font-serif font-medium text-white mb-2">
                  Strict Single-Column Geometry
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
                  Multi-column layouts, tables, and text boxes scramble character sequences when parsed by OCR engines. Always structure your document from top to bottom with standard 0.5"–0.75" margins.
                </p>
                <div className="text-xs text-neutral-300 border-t border-[#22262c] pt-3 flex items-center justify-between">
                  <span>Standard Margin: <strong>0.5" to 0.75"</strong></span>
                  <span className="text-neutral-400">No header/footer traps</span>
                </div>
              </div>
            )}

            {/* Pillar 2 */}
            {(activeTab === "all" || activeTab === "keywords") && (
              <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 transition-all duration-300 hover:border-neutral-600">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Pillar 02</span>
                  <span className="text-xs text-neutral-400 font-medium">Lexical Matching</span>
                </div>
                <h3 className="text-base font-serif font-medium text-white mb-2">
                  Verbatim Keyword Integration
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
                  ATS engines perform O(1) set intersections between your skills and job description keywords. Include both the standard acronym and its full expanded name (e.g., "Natural Language Processing (NLP)").
                </p>
                <div className="text-xs text-neutral-300 border-t border-[#22262c] pt-3 flex items-center justify-between">
                  <span>Match Weight: <strong>35% of total score</strong></span>
                  <span className="text-neutral-400">Exact & semantic</span>
                </div>
              </div>
            )}

            {/* Pillar 3 */}
            {(activeTab === "all" || activeTab === "metrics") && (
              <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 transition-all duration-300 hover:border-neutral-600">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Pillar 03</span>
                  <span className="text-xs text-neutral-400 font-medium">Impact Evidence</span>
                </div>
                <h3 className="text-base font-serif font-medium text-white mb-2">
                  Quantified STAR Experience Bullets
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
                  Passive duty descriptions receive low semantic embedding scores. Structure bullets with: [Action Verb] + [Duty/Scope] + [Quantified Result (% reduction, $ savings, request scale)].
                </p>
                <div className="text-xs text-neutral-300 border-t border-[#22262c] pt-3 flex items-center justify-between">
                  <span>Target Metric Density: <strong>≥60% of bullets</strong></span>
                  <span className="text-neutral-400">STAR formula</span>
                </div>
              </div>
            )}

            {/* Pillar 4 */}
            {(activeTab === "all" || activeTab === "headings") && (
              <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 transition-all duration-300 hover:border-neutral-600">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Pillar 04</span>
                  <span className="text-xs text-neutral-400 font-medium">Section Tagging</span>
                </div>
                <h3 className="text-base font-serif font-medium text-white mb-2">
                  Standard Section Naming Conventions
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
                  Never replace standard headings with creative titles. Parsers recognize: "Work Experience", "Professional Experience", "Technical Skills", and "Education". Creative labels cause parser dropouts.
                </p>
                <div className="text-xs text-neutral-300 border-t border-[#22262c] pt-3 flex items-center justify-between">
                  <span>Section Headers: <strong>100% Standardized</strong></span>
                  <span className="text-neutral-400">Zero custom titles</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Side-by-Side Clean Do's and Don'ts */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
              ATS Compliance: Approved vs. Prohibited
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">
              Specific practices that ensure clean database ingestion versus triggers that lead to immediate parsing failure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Don'ts */}
            <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-7">
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#22262c]">
                <XCircle className="w-4 h-4 text-neutral-400" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
                  Prohibited (Causes Parsing Failure)
                </h3>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-neutral-300">
                <li className="flex items-start gap-3">
                  <span className="text-neutral-400 font-mono select-none">✕</span>
                  <div>
                    <strong className="text-white">Graphic Skill Rating Bars:</strong>
                    <p className="text-neutral-400 text-xs mt-0.5">Graphic progress bars, star ratings, or colored dots cannot be parsed by text extractors.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-400 font-mono select-none">✕</span>
                  <div>
                    <strong className="text-white">Two-Column Magazine Layouts:</strong>
                    <p className="text-neutral-400 text-xs mt-0.5">Text extractors read across both columns simultaneously, creating scrambled, disjointed sentences.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-400 font-mono select-none">✕</span>
                  <div>
                    <strong className="text-white">Contact Info in Document Headers/Footers:</strong>
                    <p className="text-neutral-400 text-xs mt-0.5">Many enterprise parsers discard Word and PDF header/footer margins to optimize processing speed.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-400 font-mono select-none">✕</span>
                  <div>
                    <strong className="text-white">Invisible White-Text Keyword Stuffing:</strong>
                    <p className="text-neutral-400 text-xs mt-0.5">Stripped CSS reveals all hidden text, triggering spam penalties and immediate applicant disqualification.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* The Do's */}
            <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-7">
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#22262c]">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  Approved (Guarantees High Scoring)
                </h3>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-neutral-300">
                <li className="flex items-start gap-3">
                  <span className="text-white font-mono select-none">✓</span>
                  <div>
                    <strong className="text-white">Categorized Plain-Text Skill Lists:</strong>
                    <p className="text-neutral-400 text-xs mt-0.5">Structured lists under clear headings: Languages, Frameworks, Cloud, and Databases.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white font-mono select-none">✓</span>
                  <div>
                    <strong className="text-white">Single-Column Linear Reading Order:</strong>
                    <p className="text-neutral-400 text-xs mt-0.5">Sequential top-to-bottom layout with consistent 0.5"–0.75" margins and universal typography.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white font-mono select-none">✓</span>
                  <div>
                    <strong className="text-white">STAR Action Bullet Points with Metrics:</strong>
                    <p className="text-neutral-400 text-xs mt-0.5">Action verb followed by technical context and measured outcome (e.g. "Reduced API latency by 42%").</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white font-mono select-none">✓</span>
                  <div>
                    <strong className="text-white">Dual Acronym and Full Title Mentions:</strong>
                    <p className="text-neutral-400 text-xs mt-0.5">Satisfies both automated regex searches and recruiter keyword queries across variations.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive Self-Audit Checklist */}
        <section className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-8 mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-[#22262c]">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                Self-Audit Tool
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                Interactive ATS Readiness Checklist
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">
                Check off compliance items to compute your resume's parsing probability.
              </p>
            </div>

            {/* Score Pill */}
            <div className="flex items-center gap-3 bg-[#0b0c0e] px-4 py-2 rounded-xl border border-[#22262c]">
              <div className="text-right">
                <div className="text-[10px] text-neutral-400 font-medium">Readiness</div>
                <div className="text-base font-serif font-medium text-white">{readinessPercent}%</div>
              </div>
              <div className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center font-mono text-xs text-neutral-200">
                {completedCount}/8
              </div>
            </div>
          </div>

          {/* Animated Progress Line */}
          <div className="w-full bg-[#0b0c0e] h-1.5 rounded-full overflow-hidden mb-6 border border-[#22262c]">
            <div
              className="bg-white h-full transition-all duration-500 ease-out"
              style={{ width: `${readinessPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {checklistItems.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                    isChecked
                      ? "bg-[#181a1f] border-neutral-600 text-white"
                      : "bg-[#0b0c0e] border-[#22262c] text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-colors flex-shrink-0 ${
                      isChecked ? "bg-white border-white text-neutral-950" : "border-neutral-600 bg-transparent"
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </div>
                  <div className="text-xs sm:text-sm">
                    <span className="text-[10px] font-mono text-neutral-400 mr-2 uppercase">
                      [{item.category}]
                    </span>
                    <span className={isChecked ? "text-white font-medium" : "text-neutral-300"}>
                      {item.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {readinessPercent === 100 ? (
            <div className="p-3.5 rounded-xl bg-[#181a1f] border border-neutral-600 text-neutral-200 text-xs sm:text-sm flex items-center justify-between">
              <span>All 8 essential criteria satisfied. Your resume will parse cleanly into enterprise databases.</span>
              <Link to="/dashboard" className="text-white font-medium underline ml-2">
                Scan Document →
              </Link>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-[#0b0c0e] border border-[#22262c] text-neutral-400 text-xs flex items-center justify-between">
              <span>Satisfy all items to minimize the probability of automated parser rejection.</span>
              <span className="text-neutral-300 font-mono">{8 - completedCount} pending</span>
            </div>
          )}
        </section>

        {/* Expandable Technical Questions (FAQ Accordion with smooth animation) */}
        <section className="mb-20">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
              Frequently Clarified Technical Questions
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">
              Practical answers to edge cases encountered when building ATS-compliant applications.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#121417] border border-[#22262c] rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#16181d] transition-colors"
                  >
                    <span className="text-sm font-medium text-white">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden px-4 sm:px-5 ${
                      isOpen ? "max-h-48 pb-5 pt-1 opacity-100 border-t border-[#22262c]" : "max-h-0 pb-0 pt-0 opacity-0"
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Clean Editorial Footer Callout */}
        <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-serif font-medium text-white mb-1">
              Test your resume against these standards
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Upload your resume and any target Job Description to receive a section-by-section ATS evaluation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs sm:text-sm transition cursor-pointer shadow-sm"
            >
              Scan Resume Now
            </Link>
            <Link
              to="/cv-standards"
              className="px-5 py-2.5 rounded-xl bg-transparent hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-medium text-xs sm:text-sm transition cursor-pointer"
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
