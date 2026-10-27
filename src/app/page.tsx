import React from "react";
import Link from "next/link";
import {
  Smartphone,
  ShieldCheck,
  Building2,
  GraduationCap,
  ArrowRight,
  Clock,
  Mic,
  DollarSign,
  AlertTriangle,
  Award,
  Globe,
  Sparkles,
  CheckCircle,
  FileText,
  Users,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* NAVBAR */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-emerald-500/20">
              FS
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-white flex items-center gap-2">
                FairShift
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  SDG 8
                </span>
              </span>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Decent Work & Economic Growth Dual-Interface Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/worker"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition flex items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Worker App</span>
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-12 pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-emerald-400 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prompt Wars 2026 × SRM ACM • UN SDG 8 Challenge</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight sm:leading-none">
            Dignified, Transparent & Safe Work for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Every Worker
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminating paper registers, opaque pay calculations, and unvoiced hazards.
            A dual-interface platform bridging front-line employees with executive visibility
            across <strong>Construction Sites</strong> and <strong>College Campus Staff</strong>.
          </p>

          {/* TWO PROMINENT PORTAL ENTRY CARDS */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
            {/* Portal 1: Worker Mobile App */}
            <Link
              href="/worker"
              className="group p-6 rounded-3xl bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-700 hover:border-emerald-500 transition-all duration-300 shadow-xl hover:shadow-emerald-500/10 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full group-hover:bg-emerald-500/10 transition" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Mobile-First UI
                  </span>
                  <span className="text-[10px] text-slate-400">English / हिन्दी</span>
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition">
                  Worker Companion App
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Engineered for low-literacy ergonomics. Features one-tap shift clocking,
                  transparent itemized payslip (₹500 base + overtime), and Web Speech voice hazard reporting.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition">
                <span>Launch Worker Terminal</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Portal 2: Employer Dashboard */}
            <Link
              href="/admin"
              className="group p-6 rounded-3xl bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-700 hover:border-teal-500 transition-all duration-300 shadow-xl hover:shadow-teal-500/10 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-bl-full group-hover:bg-teal-500/10 transition" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">
                    Executive Portal
                  </span>
                  <span className="text-[10px] text-slate-400">Cross-Sector Audit</span>
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-teal-300 transition">
                  Employer Dashboard
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Multi-sector command hub. Features cross-sector filtering, automated fatigue/overwork alerts
                  for shifts &gt;10h, and an interactive safety hazard action board with one-click resolution.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-teal-400 group-hover:translate-x-1 transition">
                <span>Launch Employer Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* CROSS-INDUSTRY USE CASES SECTION */}
      <section className="py-12 px-4 sm:px-6 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Cross-Sector Scalability
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Serving Front-Line Labour Across 2+ Key Sectors
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
              Demonstrating adaptability to diverse operational rhythms, hazard profiles, and regulatory compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sector 1: Construction Site A */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">Construction - Site A</h3>
                  <p className="text-xs text-amber-400 font-semibold">High-Hazard Daily Shift Operations</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Managing heavy daily wage workers (masons, welders, scaffolders). Addresses intense physical
                fatigue, unlatched scaffolding risks, and high overtime hours during concrete pours.
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Worker Persona:</strong> Ramesh Kumar (Mason & Bricklayer)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Core Safety Challenge:</strong> Loose scaffolding planks & crane siren faults</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Wage Protection:</strong> Automated 2x overtime rate past 8 hours</span>
                </div>
              </div>
            </div>

            {/* Sector 2: College Campus Support */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">College - Campus Staff</h3>
                  <p className="text-xs text-sky-400 font-semibold">Facility, Sanitation & Care Teams</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Managing university sanitation, cleaning, and residential maintenance teams.
                Addresses round-the-clock shift handovers, chemical handling safety, and slip hazards in dining halls.
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Worker Persona:</strong> Anitha M (Sanitation Specialist)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Core Safety Challenge:</strong> Cafeteria spills & unlatched chemical drums</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Inclusivity:</strong> Hindi/English voice transcription for non-text reporting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES GRID */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              UN SDG 8 Features
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Architected for Worker Dignity & Employer Clarity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Feature 1 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">One-Tap Shift Tracker</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Large ergonomic tactile toggle with real-time clock-in/out timestamps and live elapsed duration ticker.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Transparent Itemized Payslip</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Guaranteed base ₹500/day plus auto-calculated 2x overtime rate, eliminating underpayment and wage theft.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-3">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Voice Hazard Reporter</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Integrated browser Web Speech API transcribes spoken hazard complaints with zero literacy requirements.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Anti-Fatigue Alerts</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Automatic red-flag warnings for shifts exceeding safe 10-hour thresholds to protect worker wellbeing.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Portable Skill Passport</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Digital verified record of masonry, sanitation, and safety training that workers carry between jobs.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Multilingual & Voice-Read</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                English and Hindi language toggles plus text-to-speech audio playback for non-reading workers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 px-4 sm:px-6 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-400">
          FairShift — Decent Work & Economic Growth Platform
        </p>
        <p className="mt-1">
          Designed for UN SDG 8 • Built for Prompt Wars 2026 × SRM ACM Student Chapter
        </p>
        <div className="mt-3 flex items-center justify-center gap-4 text-emerald-400 font-semibold">
          <Link href="/worker" className="hover:underline">
            Worker App (/worker)
          </Link>
          <span>•</span>
          <Link href="/admin" className="hover:underline">
            Admin Dashboard (/admin)
          </Link>
        </div>
      </footer>
    </div>
  );
}
