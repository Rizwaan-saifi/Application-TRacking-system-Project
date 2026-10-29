import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import {
  FileText,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Layers,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

const SAMPLE_TEMPLATE = `FIRSTNAME LASTNAME
City, State, Zip | phone@example.com | (555) 000-0000
linkedin.com/in/yourprofile | github.com/yourprofile

PROFESSIONAL SUMMARY
Results-driven Software Engineer with 4+ years of experience designing, architecting, and deploying high-concurrency microservices, cloud systems, and responsive web platforms. Proven track record of reducing system latency by 40% and increasing test coverage from 62% to 94% across distributed environments.

CORE TECHNICAL SKILLS
- Languages: Python, JavaScript, TypeScript, Go, SQL
- Frameworks & Libraries: FastAPI, React.js, Node.js, Express, TailwindCSS
- Databases & Caching: PostgreSQL, MongoDB, Redis, SQLAlchemy
- Cloud & DevOps: Docker, Kubernetes, AWS (EC2, S3, RDS), GitHub Actions, CI/CD
- Methodologies: Agile/Scrum, Microservices Architecture, Test-Driven Development (TDD)

PROFESSIONAL EXPERIENCE
Senior Software Engineer | TechPulse Solutions, San Francisco, CA
03/2022 - Present
- Architected and deployed 8+ RESTful microservices with FastAPI and Docker, handling over 1.8M daily user requests with 99.98% uptime.
- Optimized PostgreSQL database indexing and query connection pooling, reducing p99 latency from 320ms to 95ms (a 70% performance improvement).
- Spearheaded CI/CD automation pipeline using GitHub Actions, cutting release deployment cycles from 45 minutes to under 8 minutes.
- Mentored 4 junior engineers on clean architecture, unit testing patterns, and asynchronous Python programming.

Software Engineer | NexaDigital Labs, Austin, TX
06/2020 - 02/2022
- Developed customer-facing React.js web dashboard integrated with secure OAuth2 and JWT authentication.
- Built automated background worker queues with Redis and Celery, processing 25,000+ daily email and billing notifications.
- Integrated automated testing suites using Pytest, boosting unit test coverage from 58% to 91%.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | 2016 - 2020
Relevant Coursework: Data Structures, Algorithms, Distributed Systems, Database Management.

PROJECTS & CERTIFICATIONS
- Cloud File Synchronization Engine | Python, FastAPI, AWS S3, Docker
  Architected open-source distributed file sync utility with SHA-256 deduplication and end-to-end encryption.
- AWS Certified Solutions Architect - Associate (SAA-C03) | 2023`;

const SECTIONS_DATA = [
  {
    id: 1,
    name: "Header & Contact",
    tag: "Section 01",
    weight: "Pass/Fail",
    icon: <FileText className="w-4 h-4 text-indigo-400" />,
    summary: "Place directly in body text — never inside Word header margins. Many legacy ATS extractors discard header margins to optimize parsing speed.",
    formula: "Legal Name • Location (City, ST) • Email • Phone • LinkedIn • Portfolio/GitHub",
    snippet: "Alex Mercer | Seattle, WA | alex.mercer@email.com | (206) 555-0199 | linkedin.com/in/alex-mercer | github.com/alex-mercer",
    advice: "Do not include full physical street addresses or personal photos. Ensure email is professional (no nicknames)."
  },
  {
    id: 2,
    name: "Professional Summary",
    tag: "Section 02",
    weight: "Semantic Match",
    icon: <Sparkles className="w-4 h-4 text-purple-400" />,
    summary: "A targeted 3-4 sentence elevator pitch establishing your seniority, core technical domain, and flagship quantified metric.",
    formula: "[Target Title] + [Years of Experience] + [Core Technical Stack] + [Flagship Impact Metric]",
    snippet: "Results-driven Senior Backend Engineer with 5+ years of experience building distributed microservices and event-driven data pipelines using Python, FastAPI, and Kafka. Spearheaded architecture overhaul resulting in 45% lower cloud compute costs and 99.99% uptime.",
    advice: "Avoid generic subjective cliches like 'hard worker'. Focus on verified technical scope."
  },
  {
    id: 3,
    name: "Categorized Skills Matrix",
    tag: "Section 03",
    weight: "35% of Total Score",
    icon: <Code2 className="w-4 h-4 text-emerald-400" />,
    summary: "Skills make up 35% of candidate match scores. Group competencies into explicit functional domains so NLP entity segmenters map them directly to requirements.",
    formula: "Languages: [...] | Frameworks: [...] | Cloud: [...] | Databases: [...]",
    snippet: "• Languages: Python, Go, TypeScript, JavaScript, SQL\n• Frameworks: FastAPI, React, Node.js, Next.js, Django\n• Cloud & DevOps: Docker, Kubernetes, AWS (EC2, S3, RDS), Terraform\n• Databases: PostgreSQL, MongoDB, Redis, Elasticsearch",
    advice: "Always match skill spellings verbatim as listed in the target job description (e.g. React.js vs React)."
  },
  {
    id: 4,
    name: "Work Experience (STAR)",
    tag: "Section 04",
    weight: "30% + 20% Score",
    icon: <Briefcase className="w-4 h-4 text-amber-400" />,
    summary: "Reverse chronological order. Every bullet point must begin with an active verb followed by what was engineered and the measured outcome.",
    formula: "[Active Verb] + [Duty/Scope] + [Measured Quantified Metric (% / $ / Scale)]",
    snippet: "Senior Cloud Engineer | Datacore Systems (03/2022 – Present)\n• Architected automated serverless ETL pipeline with AWS Lambda and S3, ingesting 4TB daily logs with zero data loss.\n• Reduced API response times by 38% through Redis query caching and asynchronous connection pooling.\n• Implemented CI/CD pipeline in GitHub Actions, slashing release cycle time from 2 hours to 12 minutes.",
    advice: "Aim for at least 2 quantified numbers per job entry. Bullet points with metrics see 3.2x higher interview callbacks."
  },
  {
    id: 5,
    name: "Education & Credentials",
    tag: "Section 05",
    weight: "15% of Total Score",
    icon: <GraduationCap className="w-4 h-4 text-sky-400" />,
    summary: "State your exact degree title and accredited university name so automated qualification verification rules pass without manual flags.",
    formula: "[Exact Degree Title] | [Accredited University] | [Graduation Year]",
    snippet: "Bachelor of Science in Computer Science | University of Illinois Urbana-Champaign | 2018 - 2022\nRelevant Coursework: Data Structures, Algorithms, Distributed Systems, Database Management.",
    advice: "Only list GPA if it is above 3.5 and you graduated within the past 3 years."
  },
  {
    id: 6,
    name: "Projects & Certifications",
    tag: "Section 06",
    weight: "Bonus Authority",
    icon: <FolderGit2 className="w-4 h-4 text-indigo-400" />,
    summary: "Validate technical depth through public repositories, published utilities, or accredited certifications (AWS, GCP, CKA).",
    formula: "[Project Name] + [Tech Stack] + [1-Sentence Problem Solved + Link]",
    snippet: "• Distributed Cache Engine (GitHub): Open-source key-value store in Go with Raft consensus.\n• AWS Certified Solutions Architect - Associate: Validation ID: SAA-123456 (2024)",
    advice: "Include clickable links to live GitHub repositories or certification validation IDs."
  }
];

const CvStandardsPage = () => {
  const [copied, setCopied] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(1);
  const [copiedSection, setCopiedSection] = useState(false);

  const handleCopyFull = () => {
    navigator.clipboard.writeText(SAMPLE_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const activeSection = SECTIONS_DATA.find((s) => s.id === activeSectionId) || SECTIONS_DATA[0];

  const handleCopySection = () => {
    navigator.clipboard.writeText(activeSection.snippet);
    setCopiedSection(true);
    setTimeout(() => setCopiedSection(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans relative selection:bg-purple-500 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-gradient-to-b from-purple-600/12 via-indigo-600/8 to-transparent blur-3xl pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* Editorial Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/15 to-indigo-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-5 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Executive Resume Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white font-normal tracking-tight leading-tight">
            Anatomy of an <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-medium">Executive-Ready</span> CV & Resume
          </h1>
          <p className="mt-5 text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            The exact section-by-section breakdown that satisfies both automated ATS parsing algorithms (3-Tier evaluation) and elite human hiring managers.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <button
              type="button"
              onClick={handleCopyFull}
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Template Copied to Clipboard!" : "Copy Full ATS-Compliant Template"}</span>
            </button>
            <Link
              to="/ats-rules"
              className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Read ATS Algorithm Rules</span>
            </Link>
          </div>
        </div>

        {/* Section Weighting Matrix Banner */}
        <section className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 mb-16 shadow-xl backdrop-blur-md relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
              How ATS Evaluates Each Section
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Weighted scoring breakdown based on enterprise recruitment benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#050811] border border-indigo-500/30 rounded-2xl p-5 text-center transition-all hover:border-indigo-500/50 hover:-translate-y-1">
              <div className="text-3xl sm:text-4xl font-serif text-indigo-400 font-bold">35%</div>
              <div className="text-xs font-semibold text-white mt-1.5">Technical Skills</div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">Exact keyword intersection</p>
            </div>

            <div className="bg-[#050811] border border-purple-500/30 rounded-2xl p-5 text-center transition-all hover:border-purple-500/50 hover:-translate-y-1">
              <div className="text-3xl sm:text-4xl font-serif text-purple-400 font-bold">30%</div>
              <div className="text-xs font-semibold text-white mt-1.5">Work Experience</div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">Dense semantic vectors</p>
            </div>

            <div className="bg-[#050811] border border-emerald-500/30 rounded-2xl p-5 text-center transition-all hover:border-emerald-500/50 hover:-translate-y-1">
              <div className="text-3xl sm:text-4xl font-serif text-emerald-400 font-bold">20%</div>
              <div className="text-xs font-semibold text-white mt-1.5">Responsibilities</div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">STAR action points & metrics</p>
            </div>

            <div className="bg-[#050811] border border-sky-500/30 rounded-2xl p-5 text-center transition-all hover:border-sky-500/50 hover:-translate-y-1">
              <div className="text-3xl sm:text-4xl font-serif text-sky-400 font-bold">15%</div>
              <div className="text-xs font-semibold text-white mt-1.5">Education & Certs</div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">Degree level & credentials</p>
            </div>
          </div>
        </section>

        {/* Interactive Modular Blueprint Section Explorer */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium">
                The Six Essential CV Sections
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Click any section tab to inspect its ATS parsing role, formatting formula, and live code snippet.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
            {/* Left Column: Interactive Section Selectors */}
            <div className="lg:col-span-5 space-y-2.5">
              {SECTIONS_DATA.map((sec) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <div
                    key={sec.id}
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                      isActive
                        ? "bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border-indigo-500/50 shadow-lg shadow-indigo-500/10 -translate-x-1"
                        : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                            : "bg-slate-800/80 text-slate-400"
                        }`}
                      >
                        {sec.icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                          {sec.tag} • {sec.weight}
                        </div>
                        <div className={`text-sm font-semibold transition-colors ${isActive ? "text-white" : "text-slate-300"}`}>
                          {sec.name}
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isActive ? "text-indigo-400 translate-x-1" : "text-slate-600"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Right Column: Dynamic Section Details Display Card */}
            <div className="lg:col-span-7 bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                      {activeSection.tag}
                    </span>
                    <h3 className="text-xl font-serif font-medium text-white">
                      {activeSection.name}
                    </h3>
                  </div>

                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    {activeSection.weight}
                  </span>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                  {activeSection.summary}
                </p>

                {/* Structure Formula */}
                <div className="mb-5 bg-[#050811] p-3.5 rounded-xl border border-slate-800/90">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                    Structured Blueprint Formula:
                  </div>
                  <div className="text-xs font-mono text-indigo-300 font-medium">
                    {activeSection.formula}
                  </div>
                </div>

                {/* Live Example Box */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">ATS-Tested Code Preview:</span>
                    <button
                      type="button"
                      onClick={handleCopySection}
                      className="text-xs text-indigo-400 hover:text-white flex items-center gap-1 font-medium transition cursor-pointer"
                    >
                      {copiedSection ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSection ? "Copied!" : "Copy Snippet"}</span>
                    </button>
                  </div>

                  <div className="bg-[#050811] p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                    {activeSection.snippet}
                  </div>
                </div>
              </div>

              {/* Recruiter Advice Note */}
              <div className="pt-4 border-t border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Recruiter Protocol:</strong> {activeSection.advice}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mac-Style Full ATS Template Viewer */}
        <section className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <FileText className="w-3.5 h-3.5" /> Pre-Formatted Blueprint
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium">Standard Plain-Text Template</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Copy directly into Microsoft Word or Google Docs.</p>
            </div>

            <button
              type="button"
              onClick={handleCopyFull}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-600/25"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Copy Full Template"}</span>
            </button>
          </div>

          {/* Mac OS Window Header */}
          <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="bg-[#050811] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs font-mono text-slate-500 ml-2">ats_clean_blueprint.txt</span>
              </div>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                UTF-8 Encoded
              </span>
            </div>

            <div className="bg-[#03060f] p-6 overflow-x-auto max-h-[420px] overflow-y-auto">
              <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {SAMPLE_TEMPLATE}
              </pre>
            </div>
          </div>
        </section>

        {/* Clean Footer Callout */}
        <div className="bg-gradient-to-r from-purple-950/40 via-slate-900/90 to-slate-900 border border-purple-500/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-xl font-serif font-medium text-white mb-1.5">
              Ready to evaluate your current CV?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Run your resume through our 3-Tier ATS matching engine to see your score and missing keywords.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-lg shadow-purple-600/30"
            >
              Scan Your CV Free
            </Link>
            <Link
              to="/ats-rules"
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition cursor-pointer"
            >
              Review ATS Rules
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CvStandardsPage;
