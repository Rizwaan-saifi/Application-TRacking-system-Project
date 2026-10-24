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
  Sparkles
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

const CvStandardsPage = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SAMPLE_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 text-xs font-semibold mb-4 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Industry Standard Blueprint</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-normal tracking-tight leading-tight">
            Anatomy of an <span className="text-purple-400 font-medium">Executive-Ready</span> CV & Resume
          </h1>
          <p className="mt-5 text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            The exact section-by-section breakdown that satisfies both automated ATS parsing algorithms (3-Tier evaluation) and elite human hiring managers.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <button
              type="button"
              onClick={handleCopy}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-indigo-600/25 flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Template Copied to Clipboard!" : "Copy ATS-Compliant Template"}</span>
            </button>
            <Link
              to="/ats-rules"
              className="px-6 py-3 rounded-xl bg-[#111624] hover:bg-[#182032] border border-slate-800 text-slate-200 font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Read ATS Algorithm Rules</span>
            </Link>
          </div>
        </div>

        {/* Section Weighting Matrix */}
        <section className="bg-[#0f1422] border border-slate-800 rounded-2xl p-6 sm:p-8 mb-16 shadow-lg shadow-slate-950/40">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">How ATS Evaluates Each Section</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Weighted scoring breakdown based on enterprise recruitment benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#090d16] border border-indigo-500/25 rounded-xl p-5 text-center">
              <div className="text-2xl sm:text-3xl font-serif text-indigo-400 font-bold">35%</div>
              <div className="text-xs font-semibold text-white mt-1">Technical Skills</div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">Exact keyword intersection</p>
            </div>

            <div className="bg-[#090d16] border border-purple-500/25 rounded-xl p-5 text-center">
              <div className="text-2xl sm:text-3xl font-serif text-purple-400 font-bold">30%</div>
              <div className="text-xs font-semibold text-white mt-1">Work Experience</div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">Dense semantic vectors</p>
            </div>

            <div className="bg-[#090d16] border border-emerald-500/25 rounded-xl p-5 text-center">
              <div className="text-2xl sm:text-3xl font-serif text-emerald-400 font-bold">20%</div>
              <div className="text-xs font-semibold text-white mt-1">Responsibilities</div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">STAR action points & metrics</p>
            </div>

            <div className="bg-[#090d16] border border-sky-500/25 rounded-xl p-5 text-center">
              <div className="text-2xl sm:text-3xl font-serif text-sky-400 font-bold">15%</div>
              <div className="text-xs font-semibold text-white mt-1">Education & Certs</div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">Degree level & credentials</p>
            </div>
          </div>
        </section>

        {/* 6 Essential Sections */}
        <section className="mb-20 space-y-6">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">The Six Essential CV Sections</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Structure your document in this sequence for maximum parsing accuracy.
            </p>
          </div>

          {/* Section 1 */}
          <div className="bg-[#0f1422] border border-slate-800 rounded-2xl p-6 sm:p-7 hover:border-indigo-500/30 transition">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                  Section 01
                </span>
                <h3 className="text-base font-serif font-medium text-white">Contact & Identity Header</h3>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              Place in the main body text — <strong>never in the Word header margin</strong>. Include full legal name, city and state, professional email, phone number, LinkedIn URL, and portfolio/GitHub.
            </p>
            <div className="bg-[#090d16] p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
              Alex Mercer | Seattle, WA | alex.mercer@email.com | (206) 555-0199 | linkedin.com/in/alex-mercer | github.com/alex-mercer
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-[#0f1422] border border-slate-800 rounded-2xl p-6 sm:p-7 hover:border-purple-500/30 transition">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                  Section 02
                </span>
                <h3 className="text-base font-serif font-medium text-white">Professional Summary (3–4 Sentences)</h3>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              Avoid subjective adjectives. Follow the structured formula: [Target Job Title] + [Years of Experience] + [Core Technical Domain] + [High-Impact Quantified Achievement].
            </p>
            <div className="bg-[#090d16] p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
              "Results-driven Senior Backend Engineer with 5+ years of experience building distributed microservices and event-driven data pipelines using Python, FastAPI, and Kafka. Spearheaded architecture overhaul resulting in 45% lower cloud compute costs and 99.99% uptime."
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-[#0f1422] border border-slate-800 rounded-2xl p-6 sm:p-7 hover:border-emerald-500/30 transition">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  Section 03
                </span>
                <h3 className="text-base font-serif font-medium text-white">Categorized Technical Skills Matrix</h3>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              Group proficiencies into explicit functional domains so NLP entity segmenters map competencies cleanly to requirements:
            </p>
            <div className="bg-[#090d16] p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <div><strong className="text-indigo-400">• Languages:</strong> Python, Go, TypeScript, JavaScript, SQL</div>
              <div><strong className="text-purple-400">• Frameworks:</strong> FastAPI, React, Node.js, Next.js, Django</div>
              <div><strong className="text-sky-400">• Cloud & DevOps:</strong> Docker, Kubernetes, AWS (EC2, S3, RDS), Terraform</div>
              <div><strong className="text-emerald-400">• Databases:</strong> PostgreSQL, MongoDB, Redis, Elasticsearch</div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-[#0f1422] border border-slate-800 rounded-2xl p-6 sm:p-7 hover:border-amber-500/30 transition">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  Section 04
                </span>
                <h3 className="text-base font-serif font-medium text-white">Professional Work Experience</h3>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              Reverse chronological order. Begin every bullet point with an active verb followed by what was engineered and the measured outcome:
            </p>
            <div className="bg-[#090d16] p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
              <div className="text-white font-bold">Senior Cloud Engineer | Datacore Systems (03/2022 – Present)</div>
              <div>• Architected automated serverless ETL pipeline with AWS Lambda and S3, ingesting 4TB daily logs with zero data loss.</div>
              <div>• Reduced API response times by 38% through Redis query caching and asynchronous connection pooling.</div>
              <div>• Implemented CI/CD pipeline in GitHub Actions, slashing release cycle time from 2 hours to 12 minutes.</div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-[#0f1422] border border-slate-800 rounded-2xl p-6 sm:p-7 hover:border-sky-500/30 transition">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
                  Section 05
                </span>
                <h3 className="text-base font-serif font-medium text-white">Education & Academic Credentials</h3>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              State exact degree title and accredited university name so automated qualification verification checks pass without manual audit flags:
            </p>
            <div className="bg-[#090d16] p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
              Bachelor of Science in Computer Science | University of Illinois Urbana-Champaign | 2018 - 2022
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-[#0f1422] border border-slate-800 rounded-2xl p-6 sm:p-7 hover:border-indigo-500/30 transition">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                  Section 06
                </span>
                <h3 className="text-base font-serif font-medium text-white">Projects & Industry Certifications</h3>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              Validate technical depth through public repositories, published utilities, or accredited certifications:
            </p>
            <div className="bg-[#090d16] p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <div><strong className="text-white">• Distributed Cache Engine (GitHub):</strong> Open-source key-value store in Go with Raft consensus.</div>
              <div><strong className="text-white">• AWS Certified Solutions Architect - Associate:</strong> Validation ID: SAA-123456 (2024)</div>
            </div>
          </div>
        </section>

        {/* Copyable Plain-Text Template Box */}
        <section className="bg-[#0f1422] border border-slate-800 rounded-2xl p-6 sm:p-8 mb-16 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold mb-1">
                Copyable Format
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">Standard Plain-Text Template</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Copy directly into Microsoft Word or Google Docs.</p>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-600/20"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Full Template"}</span>
            </button>
          </div>

          <div className="bg-[#090d16] rounded-xl border border-slate-800 p-5 overflow-x-auto max-h-[380px] overflow-y-auto">
            <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
              {SAMPLE_TEMPLATE}
            </pre>
          </div>
        </section>

        {/* Clean Footer Callout with Purple accent */}
        <div className="bg-gradient-to-r from-purple-950/40 via-[#0f1422] to-[#0f1422] border border-purple-500/25 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-base font-serif font-medium text-white mb-1">
              Ready to evaluate your resume?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Run your resume through our 3-Tier ATS matching engine to see your score and missing keywords.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/dashboard"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-md shadow-purple-600/25"
            >
              Scan Your CV Free
            </Link>
            <Link
              to="/ats-rules"
              className="px-5 py-2.5 rounded-xl bg-[#111624] hover:bg-[#182032] border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition cursor-pointer"
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
