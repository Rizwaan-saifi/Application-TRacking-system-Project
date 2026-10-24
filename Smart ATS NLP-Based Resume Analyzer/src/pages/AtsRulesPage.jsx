import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  Cpu,
  Layers,
  Award,
  CheckSquare,
  HelpCircle,
  FileCheck
} from "lucide-react";

const AtsRulesPage = () => {
  // Interactive Checklist State
  const [checkedItems, setCheckedItems] = useState({});

  const checklistItems = [
    { id: 1, text: "Single-column layout with no floating text boxes or tables", category: "Formatting" },
    { id: 2, text: "Standard section headings (Work Experience, Technical Skills, Education)", category: "Structure" },
    { id: 3, text: "All acronyms written out at least once (e.g. AWS - Amazon Web Services)", category: "Keywords" },
    { id: 4, text: "Bullet points start with strong action verbs (Architected, Engineered, Optimized)", category: "Content" },
    { id: 5, text: "Every job has at least 2 quantified metrics (e.g., 'reduced latency by 42%')", category: "Content" },
    { id: 6, text: "Saved as a clean text-based PDF or standard .DOCX (no scanned images)", category: "File Format" },
    { id: 7, text: "No graphics, skill rating bars, or logos used to represent proficiency", category: "Formatting" },
    { id: 8, text: "Contact info (email, phone, LinkedIn, city) placed in main body, not header/footer", category: "Headers" },
  ];

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const readinessPercent = Math.round((completedCount / checklistItems.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs sm:text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Master The Algorithms</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            The Golden Rules to <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">
              Beat Any ATS Machine
            </span>
          </h1>
          <p className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed">
            Over 75% of resumes are auto-rejected by Applicant Tracking Systems before a human recruiter ever sees them. Learn the strict rules that ensure your CV parses cleanly and scores in the top 5%.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition shadow-lg shadow-indigo-600/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Test Your Resume Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/cv-standards"
              className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 font-bold text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <FileCheck className="w-4 h-4 text-indigo-400" />
              <span>View CV Anatomy Standards</span>
            </Link>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">The 4 Pillars of ATS Compliance</h2>
            <p className="text-gray-400 text-sm mt-1">Every automated screener evaluates candidates across these dimensions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-indigo-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">1. Layout & Format</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Strict single-column text flow. Avoid multi-column layouts, graphics, tables, or floating text boxes which scramble parser reading order.
              </p>
            </div>

            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">2. Exact & Semantic Match</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Include technical skills verbatim as listed in the JD, combined with dense sentence embeddings that prove you applied those skills.
              </p>
            </div>

            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-amber-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">3. Quantified Impact</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Use the STAR formula (Action Verb + Duty + Metric). High-performing resumes feature metrics (%, $, scale, users) in at least 60% of bullet points.
              </p>
            </div>

            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-purple-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">4. Standard Sectioning</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Use conventional headings like "Work Experience", "Education", and "Technical Skills". Exotic headings cause the parser to drop entire sections.
              </p>
            </div>
          </div>
        </section>

        {/* Fatal Mistakes vs Best Practices Comparison */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">ATS Do's vs. Don'ts</h2>
            <p className="text-gray-400 text-sm mt-1">Side-by-side comparison of what works vs what triggers automated rejection.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* The Don'ts */}
            <div className="bg-rose-950/20 border border-rose-900/40 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">The Fatal Mistakes (ATS Rejection)</h3>
                  <p className="text-xs text-rose-300">Never include these in your resume or CV</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold mt-0.5">✕</span>
                  <div>
                    <strong className="text-rose-200">Graphic Skill Bars & Rating Stars:</strong>
                    <p className="text-gray-400 text-xs mt-0.5">ATS engines cannot parse visual graphics or ratings like "Python ★★★★☆". They only index plain text strings.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold mt-0.5">✕</span>
                  <div>
                    <strong className="text-rose-200">Two-Column Magazine Layouts:</strong>
                    <p className="text-gray-400 text-xs mt-0.5">Parsers read left-to-right across the entire page, merging text across columns into unintelligible gibberish.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold mt-0.5">✕</span>
                  <div>
                    <strong className="text-rose-200">Contact Details in Header/Footer:</strong>
                    <p className="text-gray-400 text-xs mt-0.5">Many legacy ATS engines strip headers and footers to save memory, discarding your email and phone number entirely.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold mt-0.5">✕</span>
                  <div>
                    <strong className="text-rose-200">White Text "Keyword Stuffing":</strong>
                    <p className="text-gray-400 text-xs mt-0.5">Modern ATS engines strip CSS color styling and flag hidden invisible text as malicious spam, permanently blacklisting the applicant.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold mt-0.5">✕</span>
                  <div>
                    <strong className="text-rose-200">Vague Non-Quantified Responsibilities:</strong>
                    <p className="text-gray-400 text-xs mt-0.5">Phrases like "Responsible for coding and attending meetings" receive a low semantic relevance score.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* The Do's */}
            <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">The Winning Formula (ATS Pass)</h3>
                  <p className="text-xs text-emerald-300">Guaranteed to parse cleanly into candidate profiles</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <div>
                    <strong className="text-emerald-200">Clean Plain-Text Categorized Skills:</strong>
                    <p className="text-gray-400 text-xs mt-0.5">Group technical proficiencies under clear tags: Languages, Frameworks, Databases, Cloud & Tools.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <div>
                    <strong className="text-emerald-200">Single-Column Linear Flow:</strong>
                    <p className="text-gray-400 text-xs mt-0.5">Sequential chronological layout with standard 0.5"–0.75" margins and universal fonts (Calibri, Arial, Inter).</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <div>
                    <strong className="text-emerald-200">STAR Method Action Bullets:</strong>
                    <p className="text-gray-400 text-xs mt-0.5">"Architected RESTful microservices with FastAPI and Docker, handling 1.5M requests/day and decreasing latency by 42%."</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <div>
                    <strong className="text-emerald-200">Standard Section Headings:</strong>
                    <p className="text-gray-400 text-xs mt-0.5">Use exact headings: "Work Experience", "Education", "Skills", "Projects", "Certifications".</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <div>
                    <strong className="text-emerald-200">Both Acronym and Full Form:</strong>
                    <p className="text-gray-400 text-xs mt-0.5">Include both variations: "Natural Language Processing (NLP)", "Continuous Integration / Continuous Deployment (CI/CD)".</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive ATS Compliance Checklist */}
        <section className="bg-gray-900/80 border border-gray-800 rounded-3xl p-6 sm:p-10 mb-20 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                <CheckSquare className="w-4 h-4" /> Interactive Audit
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Interactive ATS Readiness Checklist
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Check off each item to calculate your resume's automated parsing readiness.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-gray-950 px-5 py-3 rounded-2xl border border-gray-800">
              <div className="text-right">
                <div className="text-xs text-gray-400 font-medium">Readiness Score</div>
                <div className="text-xl font-black text-indigo-400">{readinessPercent}%</div>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-indigo-500/40 flex items-center justify-center font-bold text-xs text-white">
                {completedCount}/8
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {checklistItems.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-center gap-3.5 ${
                    isChecked
                      ? "bg-indigo-600/10 border-indigo-500/40 text-white"
                      : "bg-gray-950/60 border-gray-800/80 text-gray-300 hover:border-gray-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition flex-shrink-0 ${
                      isChecked
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "border-gray-600 bg-gray-900"
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <div className="text-sm">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider mr-2 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className={isChecked ? "font-medium" : "text-gray-300"}>{item.text}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {readinessPercent === 100 ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Outstanding! Your resume meets all 8 essential ATS compliance standards.
              </span>
              <Link to="/dashboard" className="underline font-bold hover:text-white">Run Free Scan →</Link>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-gray-950/60 border border-gray-800 text-gray-400 text-xs sm:text-sm flex items-center justify-between">
              <span>Complete all checks to guarantee seamless parsing by Workday, Greenhouse, Lever, and Taleo.</span>
              <span className="text-indigo-400 font-semibold">{8 - completedCount} checks remaining</span>
            </div>
          )}
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
            Ready to test your resume against these rules?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Upload your resume and any target Job Description to see your section-by-section score and exact keyword gaps.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-3.5 rounded-xl bg-white text-gray-950 font-black text-sm hover:bg-gray-100 transition shadow-xl cursor-pointer"
            >
              Analyze Resume Now
            </Link>
            <Link
              to="/cv-standards"
              className="px-8 py-3.5 rounded-xl bg-gray-900/80 hover:bg-gray-900 border border-gray-700 text-white font-bold text-sm transition cursor-pointer"
            >
              Read CV Standards
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AtsRulesPage;
