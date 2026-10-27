"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Filter,
  Check,
  Search,
  ArrowUpRight,
  TrendingUp,
  Building2,
  GraduationCap,
  Sparkles,
  Award,
  Sun,
  Moon,
  Smartphone,
  ExternalLink,
  ChevronDown,
  RefreshCcw,
  SlidersHorizontal,
} from "lucide-react";
import {
  Sector,
  WorkerProfile,
  ShiftLog,
  HazardReport,
  UrgencyLevel,
  HazardStatus,
  getStoredWorkers,
  saveWorkers,
  getStoredShifts,
  saveShifts,
  getStoredHazards,
  saveHazards,
} from "@/data/mockData";

export default function AdminDashboardPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [selectedSector, setSelectedSector] = useState<string>("All Sectors");
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [shifts, setShifts] = useState<ShiftLog[]>([]);
  const [hazards, setHazards] = useState<HazardReport[]>([]);
  const [hazardFilter, setHazardFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedWorkerModal, setSelectedWorkerModal] = useState<WorkerProfile | null>(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Load data on mount & refresh
  const loadData = () => {
    setWorkers(getStoredWorkers());
    setShifts(getStoredShifts());
    setHazards(getStoredHazards());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter workers according to sector selection
  const filteredWorkers = workers.filter((w) => {
    const matchesSector =
      selectedSector === "All Sectors" || w.sector === selectedSector;
    const matchesSearch =
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.badgeNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  // Filter shifts according to sector
  const filteredShifts = shifts.filter((s) => {
    return selectedSector === "All Sectors" || s.sector === selectedSector;
  });

  // Filter hazards
  const filteredHazards = hazards.filter((h) => {
    const matchesSector =
      selectedSector === "All Sectors" || h.sector === selectedSector;
    const matchesStatus =
      hazardFilter === "All" || h.status === hazardFilter;
    return matchesSector && matchesStatus;
  });

  // Analytics Calculations
  const activeWorkersCount = filteredWorkers.filter(
    (w) => w.currentStatus === "Clocked In"
  ).length;

  // Fatigue / Overwork Alerts (shifts > 10 hours)
  const fatigueAlertShifts = filteredShifts.filter((s) => s.isOverworked || s.totalHours > 10);

  // Active / Unresolved Hazards
  const unresolvedHazards = filteredHazards.filter(
    (h) => h.status === "Pending" || h.status === "Investigating"
  );
  const highRiskHazardsCount = unresolvedHazards.filter((h) => h.urgency === "High").length;

  // Total daily payroll estimation
  const totalPayrollAmount = filteredShifts.reduce((acc, curr) => acc + curr.totalPay, 0);
  const totalOvertimeAmount = filteredShifts.reduce((acc, curr) => acc + curr.overtimePay, 0);

  // Handle Action: Resolve Hazard
  const handleResolveHazard = (hazardId: string) => {
    const nowStr = new Date().toLocaleString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const updatedHazards = hazards.map((h) => {
      if (h.id === hazardId) {
        return {
          ...h,
          status: "Resolved" as HazardStatus,
          resolvedAt: nowStr,
          resolutionNotes: "Safety inspection completed and remediation verified by site superintendent.",
        };
      }
      return h;
    });

    setHazards(updatedHazards);
    saveHazards(updatedHazards);

    setActionSuccessMessage("Safety Hazard marked as RESOLVED. Verification logged.");
    setTimeout(() => setActionSuccessMessage(null), 4000);
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* EXECUTIVE HEADER */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md px-6 py-4 flex flex-wrap items-center justify-between gap-4 ${
          isDark
            ? "bg-slate-900/90 border-slate-800"
            : "bg-white/90 border-slate-200 shadow-sm"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-emerald-500/20">
            FS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight">FairShift Executive Portal</h1>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                UN SDG 8 Compliant
              </span>
            </div>
            <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Multi-Sector Workforce Transparency, Safety & Overwork Prevention
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3">
          {/* Sector Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className={`appearance-none text-xs font-bold pl-3 pr-8 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-slate-300 text-slate-800 shadow-sm"
              }`}
            >
              <option value="All Sectors">🌐 All Sectors (Cross-Industry)</option>
              <option value="Construction - Site A">🏗️ Construction - Site A</option>
              <option value="College - Campus Staff">🎓 College - Campus Staff</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-2.5 pointer-events-none opacity-60" />
          </div>

          {/* Refresh State */}
          <button
            onClick={loadData}
            title="Refresh sync data"
            className={`p-2 rounded-xl border transition ${
              isDark
                ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300"
                : "bg-white border-slate-300 hover:bg-slate-100 text-slate-700"
            }`}
          >
            <RefreshCcw className="w-4 h-4" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`p-2 rounded-xl border transition flex items-center gap-1.5 text-xs font-bold ${
              isDark
                ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-amber-300"
                : "bg-white border-slate-300 hover:bg-slate-100 text-indigo-600 shadow-sm"
            }`}
            title="Toggle Light/Dark Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
          </button>

          {/* Switch to Worker Mobile App */}
          <Link
            href="/worker"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Worker Mobile App</span>
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* ACTION SUCCESS BANNER */}
        {actionSuccessMessage && (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-sm font-semibold flex items-center justify-between shadow-lg shadow-emerald-950/30 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{actionSuccessMessage}</span>
            </div>
            <button
              onClick={() => setActionSuccessMessage(null)}
              className="text-xs text-emerald-400 hover:text-emerald-200 font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* HIGH-LEVEL ANALYTICS ROW */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Active Workers */}
          <div
            className={`p-5 rounded-3xl border transition shadow-sm ${
              isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active On Duty
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black">{activeWorkersCount}</span>
              <span className="text-xs text-slate-400">/ {filteredWorkers.length} enrolled</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-time GPS verified shifts</span>
            </div>
          </div>

          {/* Card 2: Fatigue & Overwork Alerts (Shifts > 10 Hours) */}
          <div
            className={`p-5 rounded-3xl border transition shadow-sm relative overflow-hidden ${
              fatigueAlertShifts.length > 0
                ? isDark
                  ? "bg-red-950/40 border-red-500/40"
                  : "bg-red-50 border-red-200"
                : isDark
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Fatigue Overwork Alerts
              </span>
              <div className="w-8 h-8 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-red-500">
                {fatigueAlertShifts.length}
              </span>
              <span className="text-xs text-red-400 font-semibold">Flagged &gt;10h shifts</span>
            </div>
            <p className="mt-2 text-xs text-red-400/90 font-medium">
              Mandatory rest rest-break alert dispatched to supervisors
            </p>
          </div>

          {/* Card 3: Active Safety Hazards */}
          <div
            className={`p-5 rounded-3xl border transition shadow-sm ${
              unresolvedHazards.length > 0
                ? isDark
                  ? "bg-amber-950/30 border-amber-500/40"
                  : "bg-amber-50 border-amber-200"
                : isDark
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Active Safety Hazards
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-400">
                {unresolvedHazards.length}
              </span>
              <span className="text-xs text-amber-400 font-semibold">
                ({highRiskHazardsCount} High Risk)
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Voice-transcribed worker reports awaiting sign-off
            </p>
          </div>

          {/* Card 4: Total Shift Payroll & Overtime */}
          <div
            className={`p-5 rounded-3xl border transition shadow-sm ${
              isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Verified Shift Payroll
              </span>
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono">
                ₹{totalPayrollAmount.toFixed(0)}
              </span>
              <span className="text-xs text-amber-400 font-mono">
                (+₹{totalOvertimeAmount.toFixed(0)} OT)
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <Check className="w-3.5 h-3.5" />
              <span>Base ₹500/day + 2x OT rate locked</span>
            </div>
          </div>
        </section>

        {/* CROSS-SECTOR COMPLIANCE HIGHLIGHT STRIP */}
        <section
          className={`p-4 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
            isDark
              ? "bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border-emerald-500/30"
              : "bg-gradient-to-r from-emerald-50 via-white to-slate-50 border-emerald-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm flex items-center gap-2">
                UN SDG 8 Decent Work & Economic Growth Benchmark
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black">
                  98.4% FAIR SCORE
                </span>
              </h3>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Zero wage theft audit active across Construction Sites and Higher-Education Campus Support teams.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="text-center px-3 py-1 bg-slate-800/50 rounded-xl">
              <div className="text-emerald-400 font-bold">100%</div>
              <div className="text-[10px] text-slate-400">Base Wage Met</div>
            </div>
            <div className="text-center px-3 py-1 bg-slate-800/50 rounded-xl">
              <div className="text-amber-400 font-bold">
                {fatigueAlertShifts.length > 0 ? "Under Review" : "Compliant"}
              </div>
              <div className="text-[10px] text-slate-400">Shift Fatigue</div>
            </div>
            <div className="text-center px-3 py-1 bg-slate-800/50 rounded-xl">
              <div className="text-sky-400 font-bold">
                {hazards.filter((h) => h.status === "Resolved").length} / {hazards.length}
              </div>
              <div className="text-[10px] text-slate-400">Hazards Fixed</div>
            </div>
          </div>
        </section>

        {/* SECTION 1: SAFETY HAZARD ACTION BOARD */}
        <section
          className={`p-6 rounded-3xl border shadow-sm ${
            isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-extrabold tracking-tight">
                  Safety Hazard Action Board
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold">
                  {filteredHazards.length} Incidents
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Real-time reports transcribed from worker voice messages and field hazard submissions.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-800/70 border border-slate-700 text-xs">
              {["All", "Pending", "Investigating", "Resolved"].map((status) => (
                <button
                  key={status}
                  onClick={() => setHazardFilter(status)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    hazardFilter === status
                      ? "bg-emerald-500 text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Hazard Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHazards.length === 0 ? (
              <div className="col-span-2 text-center py-10 text-xs text-slate-400 italic">
                No hazard reports found matching current filters.
              </div>
            ) : (
              filteredHazards.map((h) => {
                const isHigh = h.urgency === "High";
                const isResolved = h.status === "Resolved";
                const isConstruction = h.sector.includes("Construction");

                return (
                  <div
                    key={h.id}
                    className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                      isResolved
                        ? isDark
                          ? "bg-slate-900/60 border-slate-800/80 opacity-75"
                          : "bg-slate-50 border-slate-200 opacity-80"
                        : isHigh
                        ? isDark
                          ? "bg-red-950/20 border-red-500/40 hover:border-red-500/60"
                          : "bg-red-50/50 border-red-200"
                        : isDark
                        ? "bg-slate-850 border-slate-800 hover:border-slate-700"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div>
                      {/* Urgency & Sector Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                              isHigh
                                ? "bg-red-500/20 text-red-400 border-red-500/40"
                                : h.urgency === "Medium"
                                ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                                : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                            }`}
                          >
                            {h.urgency} Urgency
                          </span>

                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                              isConstruction
                                ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                                : "bg-sky-500/10 text-sky-300 border border-sky-500/20"
                            }`}
                          >
                            {isConstruction ? (
                              <Building2 className="w-3 h-3" />
                            ) : (
                              <GraduationCap className="w-3 h-3" />
                            )}
                            {h.sector}
                          </span>

                          {h.isVoiceTranscribed && (
                            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              🎙️ Voice Transcribed
                            </span>
                          )}
                        </div>

                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
                            isResolved
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-amber-500/20 text-amber-400"
                          }`}
                        >
                          {h.status}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h4 className="font-extrabold text-sm mb-1 text-white">{h.title}</h4>
                      <p
                        className={`text-xs line-clamp-3 leading-relaxed mb-3 ${
                          isDark ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {h.description}
                      </p>

                      <div className="text-[11px] text-slate-400 space-y-0.5">
                        <p>📍 Location: <strong className="text-slate-300">{h.locationDetail}</strong></p>
                        <p>
                          👤 Reported by:{" "}
                          <span className={h.isAnonymous ? "text-amber-400 italic" : "text-slate-300"}>
                            {h.reportedBy} {h.isAnonymous && "(Identity Protected)"}
                          </span>{" "}
                          • {h.timestamp}
                        </p>
                        {h.resolvedAt && (
                          <p className="text-emerald-400 font-medium">
                            ✅ Resolved at: {h.resolvedAt}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Button: Update to Resolved */}
                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">
                        Incident ID: #{h.id}
                      </span>
                      {!isResolved ? (
                        <button
                          onClick={() => handleResolveHazard(h.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-900/40 transition active:scale-95"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Mark as Resolved</span>
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Remediation Closed</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* SECTION 2: WORKFORCE ATTENDANCE, FATIGUE AUDIT & PAYROLL TABLE */}
        <section
          className={`p-6 rounded-3xl border shadow-sm ${
            isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base font-extrabold tracking-tight">
                  Workforce Shift Audit & Fatigue Monitoring
                </h2>
              </div>
              <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Automated flagging of safe work hours (&gt;10h shifts) and transparent pay breakdowns.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search worker or badge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  isDark
                    ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    : "bg-white border-slate-300 text-slate-800 placeholder-slate-400"
                }`}
              />
            </div>
          </div>

          {/* Shifts and Worker Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead
                className={`uppercase tracking-wider font-bold ${
                  isDark ? "bg-slate-850 text-slate-400" : "bg-slate-100 text-slate-600"
                }`}
              >
                <tr>
                  <th className="p-3">Worker & Role</th>
                  <th className="p-3">Sector</th>
                  <th className="p-3">Date / Shift</th>
                  <th className="p-3">Hours (Base + OT)</th>
                  <th className="p-3">Pay Breakdown</th>
                  <th className="p-3">Fatigue Safety</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredShifts.map((s) => {
                  const workerObj = workers.find((w) => w.id === s.workerId);
                  const isOverworked = s.isOverworked || s.totalHours > 10;
                  const isConstruction = s.sector.includes("Construction");

                  return (
                    <tr
                      key={s.id}
                      className={`transition ${
                        isDark ? "hover:bg-slate-850/60" : "hover:bg-slate-50"
                      } ${isOverworked ? "bg-red-950/10" : ""}`}
                    >
                      {/* Worker info */}
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl p-1 bg-slate-800 rounded-lg">
                            {workerObj?.avatar || "👷"}
                          </span>
                          <div>
                            <p className="font-extrabold text-white text-xs">{s.workerName}</p>
                            <p className="text-[10px] text-slate-400">{s.role}</p>
                          </div>
                        </div>
                      </td>

                      {/* Sector */}
                      <td className="p-3">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                            isConstruction
                              ? "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                              : "bg-sky-500/10 text-sky-300 border border-sky-500/30"
                          }`}
                        >
                          {isConstruction ? <Building2 className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                          {s.sector}
                        </span>
                      </td>

                      {/* Shift times */}
                      <td className="p-3">
                        <p className="font-bold text-slate-200">{s.date}</p>
                        <p className="text-[10px] text-slate-400">
                          {s.clockInTime} – {s.clockOutTime || "Active Duty"}
                        </p>
                      </td>

                      {/* Hours */}
                      <td className="p-3">
                        <div className="font-mono">
                          <span className="font-extrabold text-white">{s.totalHours} hrs</span>
                          {s.overtimeHours > 0 && (
                            <span className="text-amber-400 text-[10px] ml-1.5 font-bold">
                              (+{s.overtimeHours}h OT)
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400">{s.baseHours}h base standard</p>
                      </td>

                      {/* Pay Breakdown */}
                      <td className="p-3 font-mono">
                        <p className="font-extrabold text-emerald-400 text-sm">
                          ₹{s.totalPay.toFixed(2)}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          ₹{s.basePay} base {s.overtimePay > 0 && `+ ₹${s.overtimePay} OT`}
                        </p>
                      </td>

                      {/* Fatigue status */}
                      <td className="p-3">
                        {isOverworked ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                            <AlertTriangle className="w-3 h-3" />
                            FATIGUE ALERT (&gt;10h)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <Check className="w-3 h-3" />
                            Safe Hours (OK)
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-right">
                        {workerObj && (
                          <button
                            onClick={() => setSelectedWorkerModal(workerObj)}
                            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold px-2 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition"
                          >
                            Skill Passport
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* SKILL PASSPORT POPUP MODAL */}
      {selectedWorkerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl p-6 shadow-2xl relative text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm">Verified Worker Skill Passport</h3>
              </div>
              <button
                onClick={() => setSelectedWorkerModal(null)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="my-4 text-center">
              <span className="text-4xl p-2 bg-slate-800 rounded-2xl inline-block mb-2">
                {selectedWorkerModal.avatar}
              </span>
              <h4 className="font-extrabold text-base">{selectedWorkerModal.name}</h4>
              <p className="text-xs text-emerald-400 font-semibold">{selectedWorkerModal.role}</p>
              <p className="text-xs text-slate-400">{selectedWorkerModal.sector}</p>
              <p className="text-[11px] text-slate-500 font-mono mt-1">
                Badge: {selectedWorkerModal.badgeNumber} • Phone: {selectedWorkerModal.phone}
              </p>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Accredited Skills & Certifications
              </p>
              {selectedWorkerModal.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-slate-200">{skill.name}</p>
                    <p className="text-[10px] text-slate-400">
                      Site Verified: {skill.verifiedDate}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>
                Compliant with UN SDG 8 Career Portability Framework. Digital records persist across contractors.
              </span>
            </div>

            <button
              onClick={() => setSelectedWorkerModal(null)}
              className="w-full mt-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
