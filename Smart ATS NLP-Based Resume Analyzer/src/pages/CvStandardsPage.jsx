import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import {
  FileText,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2
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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs sm:text-sm font-semibold mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Professional CV Blueprint</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Anatomy of an <br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-emerald-300 bg-clip-text text-transparent">
              Executive-Ready CV & Resume
            </span>
          </h1>
          <p className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed">
            The exact section-by-section breakdown that satisfies both automated ATS parsing algorithms (3-Tier evaluation) and elite human hiring managers.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleCopy}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition shadow-lg shadow-indigo-600/20 flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Template Copied to Clipboard!" : "Copy ATS-Compliant Template"}</span>
            </button>
            <Link
              to="/ats-rules"
              className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 font-bold text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Read ATS Algorithm Rules</span>
            </Link>
          </div>
        </div>

        {/* Scoring Weights Section */}
        <section className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 sm:p-10 mb-20 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How ATS Evaluates Each Section</h2>
            <p className="text-gray-400 text-sm mt-1">
              Our 3-tier matching engine weights candidate qualifications according to enterprise industry benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-950/80 border border-indigo-500/30 rounded-2xl p-5 text-center">
              <div className="text-3xl font-black text-indigo-400">35%</div>
              <div className="text-sm font-bold text-white mt-1">Technical Skills</div>
              <p className="text-xs text-gray-400 mt-1">Exact keyword matching + normalized toolsets</p>
            </div>

            <div className="bg-gray-950/80 border border-emerald-500/30 rounded-2xl p-5 text-center">
              <div className="text-3xl font-black text-emerald-400">30%</div>
              <div className="text-sm font-bold text-white mt-1">Work Experience</div>
              <p className="text-xs text-gray-400 mt-1">MiniLM dense semantic embedding vectors</p>
            </div>

            <div className="bg-gray-950/80 border border-amber-500/30 rounded-2xl p-5 text-center">
              <div className="text-3xl font-black text-amber-400">20%</div>
              <div className="text-sm font-bold text-white mt-1">Responsibilities</div>
              <p className="text-xs text-gray-400 mt-1">STAR bullet points & quantified metric coverage</p>
            </div>

            <div className="bg-gray-950/80 border border-purple-500/30 rounded-2xl p-5 text-center">
              <div className="text-3xl font-black text-purple-400">15%</div>
              <div className="text-sm font-bold text-white mt-1">Education & Certs</div>
              <p className="text-xs text-gray-400 mt-1">Degree level verification & accredited fields</p>
            </div>
          </div>
        </section>

        {/* 6 Essential Sections Breakdown */}
        <section className="mb-20 space-y-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">The 6 Mandatory CV Sections</h2>
            <p className="text-gray-400 text-sm mt-1">Structure your resume in this exact sequential order for 99.8% parser readability.</p>
          </div>

          {/* Section 1 */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
              <span className="font-black text-lg">1</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Contact & Identification Header</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Keep this in the regular page body — <strong>never in the Word header or footer area</strong>. Include your full legal name, city & state, professional email, phone number, LinkedIn link, and GitHub/Portfolio.
              </p>
              <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 font-mono text-xs text-emerald-400">
                Alex Mercer | Seattle, WA | alex.mercer@email.com | (206) 555-0199 | linkedin.com/in/alex-mercer | github.com/alex-mercer
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
              <span className="font-black text-lg">2</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Professional Summary (3-4 Sentences Max)</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Avoid generic buzzwords like "hard worker" or "fast learner". Use the formula: <strong>[Target Title] + [Years of Experience] + [Core Technical Domain] + [High-Impact Metric]</strong>.
              </p>
              <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 font-mono text-xs text-gray-300">
                "Results-driven Senior Backend Engineer with 5+ years of experience building distributed microservices and event-driven data pipelines using Python, FastAPI, and Kafka. Spearheaded architecture overhaul resulting in 45% lower cloud compute costs and 99.99% uptime."
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Code2 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Categorized Technical Skills Matrix</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Do not dump a 50-word comma-separated block. Categorize your skills into distinct domains so NLP parsers can map competencies to specific JD requirements.
              </p>
              <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 font-mono text-xs text-gray-300 space-y-1">
                <div><span className="text-indigo-400 font-bold">• Languages:</span> Python, Go, TypeScript, JavaScript, SQL</div>
                <div><span className="text-indigo-400 font-bold">• Frameworks:</span> FastAPI, React, Node.js, Next.js, Django</div>
                <div><span className="text-indigo-400 font-bold">• Cloud & Infrastructure:</span> Docker, Kubernetes, AWS (EC2, S3, RDS), Terraform</div>
                <div><span className="text-indigo-400 font-bold">• Databases & Caching:</span> PostgreSQL, MongoDB, Redis, Elasticsearch</div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Professional Work Experience (STAR Method)</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                List experiences in reverse chronological order. Begin every single bullet point with an impactful active verb followed by what you built and the measured outcome.
              </p>
              <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 font-mono text-xs text-gray-300 space-y-2">
                <div className="font-bold text-white">Senior Cloud Engineer | Datacore Systems (2022 – Present)</div>
                <div className="text-emerald-400">• Architected automated serverless ETL pipeline with AWS Lambda and S3, ingesting 4TB daily logs with zero data loss.</div>
                <div className="text-emerald-400">• Reduced API response times by 38% through Redis query caching and asynchronous connection pooling.</div>
                <div className="text-emerald-400">• Implemented CI/CD pipeline in GitHub Actions, slashing release cycle time from 2 hours to 12 minutes.</div>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Education & Academic Credentials</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Specify the exact degree name (e.g. Bachelor of Science in Computer Science) and accredited university name. This allows automated degree verification rules to pass without manual flag review.
              </p>
              <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 font-mono text-xs text-gray-300">
                Bachelor of Science in Computer Science | University of Illinois Urbana-Champaign | 2018 - 2022
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 flex-shrink-0">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Projects & Industry Certifications</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Prove technical depth through real-world open-source repositories, personal projects, or industry-recognized credentials (AWS, Google Cloud, CKA, CISSP).
              </p>
              <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 font-mono text-xs text-gray-300 space-y-1">
                <div><span className="text-white font-bold">• Distributed Cache Engine (GitHub):</span> Built custom distributed key-value store in Go with Raft consensus.</div>
                <div><span className="text-white font-bold">• AWS Certified Solutions Architect - Associate:</span> Validation ID: SAA-123456 (2024)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Copyable ATS Template Viewer */}
        <section className="bg-gray-900/80 border border-gray-800 rounded-3xl p-6 sm:p-10 mb-20 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                <FileText className="w-4 h-4" /> Ready-to-Use
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">ATS Clean Template</h2>
              <p className="text-gray-400 text-sm mt-1">Copy and paste this plain-text format directly into Word or Google Docs.</p>
            </div>

            <button
              onClick={handleCopy}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-lg"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Copy Full Template"}</span>
            </button>
          </div>

          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 overflow-x-auto max-h-[420px] overflow-y-auto">
            <pre className="font-mono text-xs text-gray-300 whitespace-pre-wrap leading-relaxed">
              {SAMPLE_TEMPLATE}
            </pre>
          </div>
        </section>

        {/* CTA Footer */}
        <div className="bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-slate-900 border border-purple-500/30 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
            Want to see how your current CV scores?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Upload your resume and test it against our 3-Tier AI matching engine to get your exact percentage score and missing keywords.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-3.5 rounded-xl bg-white text-gray-950 font-black text-sm hover:bg-gray-100 transition shadow-xl cursor-pointer"
            >
              Scan Your CV Free
            </Link>
            <Link
              to="/ats-rules"
              className="px-8 py-3.5 rounded-xl bg-gray-900/80 hover:bg-gray-900 border border-gray-700 text-white font-bold text-sm transition cursor-pointer"
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
