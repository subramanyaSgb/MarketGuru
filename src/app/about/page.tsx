"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import BlurText from "@/components/reactbits/BlurText";
import CountUp from "@/components/reactbits/CountUp";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

const Lanyard = dynamic(() => import("@/components/reactbits/lanyard/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-400">Loading 3D Badge...</p>
      </div>
    </div>
  ),
});

const stats = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 36, suffix: "+", label: "Vision Solutions" },
  { value: 10, suffix: "+", label: "Industrial Plants" },
  { value: 5, suffix: "+", label: "Enterprise Clients" },
];

const skills = [
  "OpenCV", "YOLO", "SAM", "TensorFlow", "Python", "FastAPI",
  "PostgreSQL", "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Docker", "Git", "REST APIs",
];

const experience = [
  {
    role: "Technical Lead / Software Engineer",
    company: "Deevia Software India Pvt. Ltd.",
    location: "Bengaluru, India",
    period: "2021 - Present",
    highlights: [
      "Led development of 36+ end-to-end computer vision solutions for industrial clients",
      "Built real-time defect detection systems for JSW Steel, SAIL Bhilai, Toyota, and Honda",
      "Architected AI pipelines processing thousands of frames per second in production",
      "Specialized in Computer Vision & Industrial AI for quality inspection and automation",
    ],
  },
];

const projects = [
  {
    name: "MarketGuru",
    desc: "AI-powered trading intelligence platform for the Indian stock market with real-time signals.",
    color: "from-blue-500 to-indigo-600",
    spotlightColor: "rgba(37, 99, 235, 0.12)",
  },
  {
    name: "Inkbound",
    desc: "AI-powered journaling app that helps users reflect, grow, and track their mental wellness.",
    color: "from-violet-500 to-purple-600",
    spotlightColor: "rgba(139, 92, 246, 0.12)",
  },
  {
    name: "CityNexa",
    desc: "Real estate discovery platform with smart search, map views, and neighborhood insights.",
    color: "from-emerald-500 to-teal-600",
    spotlightColor: "rgba(16, 185, 129, 0.12)",
  },
  {
    name: "InfraSense",
    desc: "Thermal camera monitoring system for industrial infrastructure health assessment.",
    color: "from-orange-500 to-red-600",
    spotlightColor: "rgba(249, 115, 22, 0.12)",
  },
  {
    name: "FinPlan",
    desc: "Personal finance tracker with budgeting, expense analytics, and goal planning.",
    color: "from-cyan-500 to-blue-600",
    spotlightColor: "rgba(6, 182, 212, 0.12)",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0b1121] dark:via-[#0f172a] dark:to-[#0b1121]">
      {/* Back button */}
      <div className="sticky top-0 z-40 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 flex items-center gap-4">
          <Link
            href="/"
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all active:scale-95"
          >
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">MG</span>
            </div>
            <span className="text-base font-bold text-gray-900 dark:text-gray-100" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Market<span className="text-blue-600">Guru</span>
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left: Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-blue-600">About the Developer</span>
              </div>

              <BlurText
                text="Subramanya Gopal Bellary"
                delay={80}
                animateBy="words"
                direction="bottom"
                className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight mb-4 justify-center lg:justify-start"
              />

              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-2" style={{ fontFamily: 'DM Sans' }}>
                Technical Lead &middot; Software Engineer
              </p>
              <p className="text-base md:text-lg text-gray-400 dark:text-gray-500 mb-2" style={{ fontFamily: 'DM Sans' }}>
                Computer Vision & Industrial AI
              </p>
              <p className="text-sm md:text-base text-gray-400 dark:text-gray-500 mb-6" style={{ fontFamily: 'DM Sans' }}>
                Deevia Software India Pvt. Ltd., Bengaluru
              </p>

              {/* Lanyard with photo on mobile */}
              <div className="flex justify-center mb-6 lg:hidden">
                <div className="w-full max-w-sm h-[400px]">
                  <Lanyard position={[0, 0, 14]} fov={30} />
                </div>
              </div>

              {/* Quick social links */}
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <a href="https://linkedin.com/in/subramanyagbellary" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-100 dark:border-sky-500/20 flex items-center justify-center text-sky-600 hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://github.com/subramanyaSgb" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-500/10 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="mailto:subramanyagbellary@gmail.com" className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center text-blue-600 hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                </a>
              </div>
            </div>

            {/* Right: Lanyard with photo inside (desktop) */}
            <div className="hidden lg:flex flex-col items-center">
              <div className="w-[400px] h-[550px]">
                <Lanyard position={[0, 0, 14]} fov={30} />
              </div>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold -mt-4">Drag the badge to interact</p>
            </div>
          </div>
        </div>
      </section>


      {/* Stats */}
      <section className="px-4 md:px-6 -mt-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 shadow-sm">
              <div className="text-3xl font-extrabold text-gray-900 dark:text-gray-100" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                <CountUp to={s.value} duration={2.5} separator="," />
                <span className="text-blue-600">{s.suffix}</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="py-14 md:py-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Tech Stack</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Skills & Technologies
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-default shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-500">Languages: English, Hindi, Kannada, Telugu</p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-14 md:py-20 px-4 md:px-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-[#0b1121]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Career</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Experience
            </h2>
          </div>
          {experience.map((exp, i) => (
            <div key={i} className="relative max-w-3xl mx-auto">
              <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 p-5 md:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                      {exp.role}
                    </h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">{exp.location}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-lg text-sm font-semibold text-blue-600 whitespace-nowrap self-start">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-2">Key Clients</p>
                  <div className="flex flex-wrap gap-2">
                    {["JSW Steel", "SAIL Bhilai", "Toyota", "Honda"].map((client) => (
                      <span key={client} className="px-3 py-1 bg-gray-50 dark:bg-slate-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400">
                        {client}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Education */}
          <div className="max-w-3xl mx-auto mt-8">
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100" style={{ fontFamily: 'Plus Jakarta Sans' }}>Education</h3>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">B.E. Computer Science</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Basaveshwara Engineering College, VTU</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">CGPA: 7.13</p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Projects */}
      <section className="py-14 md:py-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Side Projects</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Personal Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <SpotlightCard key={p.name} className="p-6 card-hover" spotlightColor={p.spotlightColor}>
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white mb-5 shadow-lg`}>
                    <span className="text-xs font-bold">{p.name.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                    {p.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-14 md:py-20 px-4 md:px-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-[#0b1121]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Get in Touch</span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-3 mb-10" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Contact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="mailto:subramanyagbellary@gmail.com"
              className="flex items-center gap-4 p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:border-blue-200 dark:hover:border-blue-500/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">Email</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">subramanyagbellary@gmail.com</p>
              </div>
            </a>

            <a
              href="tel:+917892389809"
              className="flex items-center gap-4 p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:border-blue-200 dark:hover:border-blue-500/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">Phone</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">+91 7892389809</p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/subramanyagbellary"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:border-blue-200 dark:hover:border-blue-500/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">LinkedIn</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">subramanyagbellary</p>
              </div>
            </a>

            <a
              href="https://github.com/subramanyaSgb"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:border-blue-200 dark:hover:border-blue-500/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-500/10 flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">GitHub</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">subramanyaSgb</p>
              </div>
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 dark:text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-sm">Bengaluru, India</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100 dark:border-slate-800">
        <p className="text-center text-xs text-gray-400 dark:text-gray-500">
          Built with Next.js, Tailwind CSS & AI — by Subramanya G. Bellary
        </p>
      </footer>
    </div>
  );
}
