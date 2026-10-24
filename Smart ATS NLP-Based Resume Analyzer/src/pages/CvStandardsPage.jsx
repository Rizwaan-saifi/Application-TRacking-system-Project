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
    <div className="min-h-screen bg-[#0b0c0e] text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-[11px] uppercase tracking-widest text-neutral-400 font-semibold mb-3">
            Industry Standard Blueprint
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-normal tracking-tight leading-tight">
            Anatomy of an Executive-Ready CV & Resume
          </h1>
          <p className="mt-5 text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            The exact section-by-section breakdown that satisfies both automated ATS parsing algorithms (3-Tier evaluation) and elite human hiring managers.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs sm:text-sm transition shadow-sm flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-neutral-950" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Template Copied to Clipboard!" : "Copy ATS-Compliant Template"}</span>
            </button>
            <Link
              to="/ats-rules"
              className="px-5 py-2.5 rounded-xl bg-[#14161a] hover:bg-[#1a1d22] border border-[#22262d] text-neutral-300 font-medium text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>Read ATS Algorithm Rules</span>
            </Link>
          </div>
        </div>

        {/* Section Weighting Matrix */}
        <section className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-8 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">How ATS Evaluates Each Section</h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">
              Weighted scoring breakdown based on enterprise recruitment benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#0b0c0e] border border-[#22262c] rounded-xl p-5 text-center">
              <div className="text-2xl sm:text-3xl font-serif text-white font-medium">35%</div>
              <div className="text-xs font-semibold text-neutral-200 mt-1">Technical Skills</div>
              <p className="text-[11px] text-neutral-400 mt-1 font-sans">Exact keyword intersection</p>
            </div>

            <div className="bg-[#0b0c0e] border border-[#22262c] rounded-xl p-5 text-center">
              <div className="text-2xl sm:text-3xl font-serif text-white font-medium">30%</div>
              <div className="text-xs font-semibold text-neutral-200 mt-1">Work Experience</div>
              <p className="text-[11px] text-neutral-400 mt-1 font-sans">Dense semantic vectors</p>
            </div>

            <div className="bg-[#0b0c0e] border border-[#22262c] rounded-xl p-5 text-center">
              <div className="text-2xl sm:text-3xl font-serif text-white font-medium">20%</div>
              <div className="text-xs font-semibold text-neutral-200 mt-1">Responsibilities</div>
              <p className="text-[11px] text-neutral-400 mt-1 font-sans">STAR action points & metrics</p>
            </div>

            <div className="bg-[#0b0c0e] border border-[#22262c] rounded-xl p-5 text-center">
              <div className="text-2xl sm:text-3xl font-serif text-white font-medium">15%</div>
              <div className="text-xs font-semibold text-neutral-200 mt-1">Education & Certs</div>
              <p className="text-[11px] text-neutral-400 mt-1 font-sans">Degree level & credentials</p>
            </div>
          </div>
        </section>

        {/* 6 Essential Sections */}
        <section className="mb-20 space-y-6">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">The Six Essential CV Sections</h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">
              Structure your document in this sequence for maximum parsing accuracy.
            </p>
          </div>

          {/* Section 1 */}
          <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase text-neutral-400">Section 01</span>
              <h3 className="text-base font-serif font-medium text-white">Contact & Identity Header</h3>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
              Place in the main body text — <strong>never in the Word header margin</strong>. Include full legal name, city and state, professional email, phone number, LinkedIn URL, and portfolio/GitHub.
            </p>
            <div className="bg-[#0b0c0e] p-3.5 rounded-xl border border-[#22262c] font-mono text-xs text-neutral-300">
              Alex Mercer | Seattle, WA | alex.mercer@email.com | (206) 555-0199 | linkedin.com/in/alex-mercer | github.com/alex-mercer
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase text-neutral-400">Section 02</span>
              <h3 className="text-base font-serif font-medium text-white">Professional Summary (3–4 Sentences)</h3>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
              Avoid subjective adjectives. Follow the structured formula: [Target Job Title] + [Years of Experience] + [Core Technical Domain] + [High-Impact Quantified Achievement].
            </p>
            <div className="bg-[#0b0c0e] p-3.5 rounded-xl border border-[#22262c] font-mono text-xs text-neutral-300">
              "Results-driven Senior Backend Engineer with 5+ years of experience building distributed microservices and event-driven data pipelines using Python, FastAPI, and Kafka. Spearheaded architecture overhaul resulting in 45% lower cloud compute costs and 99.99% uptime."
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase text-neutral-400">Section 03</span>
              <h3 className="text-base font-serif font-medium text-white">Categorized Technical Skills Matrix</h3>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
              Group proficiencies into explicit functional domains so NLP entity segmenters map competencies cleanly to requirements:
            </p>
            <div className="bg-[#0b0c0e] p-3.5 rounded-xl border border-[#22262c] font-mono text-xs text-neutral-300 space-y-1">
              <div><strong className="text-white">• Languages:</strong> Python, Go, TypeScript, JavaScript, SQL</div>
              <div><strong className="text-white">• Frameworks:</strong> FastAPI, React, Node.js, Next.js, Django</div>
              <div><strong className="text-white">• Cloud & DevOps:</strong> Docker, Kubernetes, AWS (EC2, S3, RDS), Terraform</div>
              <div><strong className="text-white">• Databases:</strong> PostgreSQL, MongoDB, Redis, Elasticsearch</div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase text-neutral-400">Section 04</span>
              <h3 className="text-base font-serif font-medium text-white">Professional Work Experience</h3>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
              Reverse chronological order. Begin every bullet point with an active verb followed by what was engineered and the measured outcome:
            </p>
            <div className="bg-[#0b0c0e] p-3.5 rounded-xl border border-[#22262c] font-mono text-xs text-neutral-300 space-y-2">
              <div className="text-white font-bold">Senior Cloud Engineer | Datacore Systems (03/2022 – Present)</div>
              <div>• Architected automated serverless ETL pipeline with AWS Lambda and S3, ingesting 4TB daily logs with zero data loss.</div>
              <div>• Reduced API response times by 38% through Redis query caching and asynchronous connection pooling.</div>
              <div>• Implemented CI/CD pipeline in GitHub Actions, slashing release cycle time from 2 hours to 12 minutes.</div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase text-neutral-400">Section 05</span>
              <h3 className="text-base font-serif font-medium text-white">Education & Academic Credentials</h3>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
              State exact degree title and accredited university name so automated qualification verification checks pass without manual audit flags:
            </p>
            <div className="bg-[#0b0c0e] p-3.5 rounded-xl border border-[#22262c] font-mono text-xs text-neutral-300">
              Bachelor of Science in Computer Science | University of Illinois Urbana-Champaign | 2018 - 2022
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase text-neutral-400">Section 06</span>
              <h3 className="text-base font-serif font-medium text-white">Projects & Industry Certifications</h3>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
              Validate technical depth through public repositories, published utilities, or accredited certifications:
            </p>
            <div className="bg-[#0b0c0e] p-3.5 rounded-xl border border-[#22262c] font-mono text-xs text-neutral-300 space-y-1">
              <div><strong className="text-white">• Distributed Cache Engine (GitHub):</strong> Open-source key-value store in Go with Raft consensus.</div>
              <div><strong className="text-white">• AWS Certified Solutions Architect - Associate:</strong> Validation ID: SAA-123456 (2024)</div>
            </div>
          </div>
        </section>

        {/* Copyable Plain-Text Template Box */}
        <section className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-8 mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                Copyable Format
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">Standard Plain-Text Template</h2>
              <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">Copy directly into Microsoft Word or Google Docs.</p>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Full Template"}</span>
            </button>
          </div>

          <div className="bg-[#0b0c0e] rounded-xl border border-[#22262c] p-5 overflow-x-auto max-h-[380px] overflow-y-auto">
            <pre className="font-mono text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed">
              {SAMPLE_TEMPLATE}
            </pre>
          </div>
        </section>

        {/* Clean Footer Callout */}
        <div className="bg-[#121417] border border-[#22262c] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-serif font-medium text-white mb-1">
              Ready to evaluate your resume?
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Run your resume through our 3-Tier ATS matching engine to see your score and missing keywords.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs sm:text-sm transition cursor-pointer shadow-sm"
            >
              Scan Your CV Free
            </Link>
            <Link
              to="/ats-rules"
              className="px-5 py-2.5 rounded-xl bg-transparent hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-medium text-xs sm:text-sm transition cursor-pointer"
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
