"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Clock,
  Mic,
  MicOff,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  ChevronRight,
  Globe,
  Award,
  Sparkles,
  MapPin,
  Volume2,
  RefreshCw,
  ArrowRight,
  Layers,
  Info,
  Calendar,
} from "lucide-react";
import {
  WorkerProfile,
  ShiftLog,
  HazardReport,
  getStoredWorkers,
  saveWorkers,
  getStoredShifts,
  saveShifts,
  getStoredHazards,
  saveHazards,
  Sector,
  UrgencyLevel,
} from "@/data/mockData";
import { translations, Language } from "@/data/translations";

export default function WorkerMobilePage() {
  const [lang, setLang] = useState<Language>("en");
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [activeWorker, setActiveWorker] = useState<WorkerProfile | null>(null);
  const [shifts, setShifts] = useState<ShiftLog[]>([]);
  const [hazards, setHazards] = useState<HazardReport[]>([]);

  // Shift tracking state
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [clockInTimestamp, setClockInTimestamp] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Voice hazard reporting state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [hazardText, setHazardText] = useState<string>("");
  const [hazardLocation, setHazardLocation] = useState<string>("");
  const [hazardUrgency, setHazardUrgency] = useState<UrgencyLevel>("High");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [hazardNotification, setHazardNotification] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);

  // Skill passport modal state
  const [showPassport, setShowPassport] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);
  const t = translations[lang];

  // Initialize and load stored data
  useEffect(() => {
    const loadedWorkers = getStoredWorkers();
    const loadedShifts = getStoredShifts();
    const loadedHazards = getStoredHazards();

    setWorkers(loadedWorkers);
    setShifts(loadedShifts);
    setHazards(loadedHazards);

    // Default to Ramesh Kumar (Construction) or first worker
    const current = loadedWorkers[0] || null;
    setActiveWorker(current);

    if (current && current.currentStatus === "Clocked In") {
      setIsClockedIn(true);
      // Simulate 6.5 hours of active duty = 23400 seconds
      setElapsedSeconds(6.5 * 3600);
      setClockInTimestamp("08:00 AM");
    } else {
      setIsClockedIn(false);
      setElapsedSeconds(0);
      setClockInTimestamp(null);
    }

    // Check Speech Recognition support
    if (
      typeof window !== "undefined" &&
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setSpeechSupported(false);
    }
  }, []);

  // Timer interval for clocked in state
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isClockedIn) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isClockedIn]);

  // Handle Worker Persona Change
  const handleSelectWorker = (workerId: string) => {
    const selected = workers.find((w) => w.id === workerId);
    if (!selected) return;
    setActiveWorker(selected);

    if (selected.currentStatus === "Clocked In") {
      setIsClockedIn(true);
      setElapsedSeconds(6.5 * 3600);
      setClockInTimestamp("08:00 AM");
    } else {
      setIsClockedIn(false);
      setElapsedSeconds(0);
      setClockInTimestamp(null);
    }
  };

  // Format seconds into HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}h : ${minutes
      .toString()
      .padStart(2, "0")}m : ${seconds.toString().padStart(2, "0")}s`;
  };

  // Real-time wage calculator
  const calculateRealTimePay = () => {
    if (!activeWorker) return { basePay: 500, overtimePay: 0, totalPay: 500, overtimeHours: 0 };
    const currentTotalHours = elapsedSeconds / 3600;
    const baseHours = Math.min(8, currentTotalHours);
    const overtimeHours = Math.max(0, currentTotalHours - 8);

    // If clocked out or 0 hours, display standard base day rate
    if (currentTotalHours === 0 && !isClockedIn) {
      return { basePay: activeWorker.baseDailyRate, overtimePay: 0, totalPay: activeWorker.baseDailyRate, overtimeHours: 0 };
    }

    const basePay = Math.round(baseHours * activeWorker.hourlyBaseRate * 100) / 100;
    const overtimePay = Math.round(overtimeHours * activeWorker.hourlyOvertimeRate * 100) / 100;
    const totalPay = Math.round((basePay + overtimePay) * 100) / 100;

    return { basePay, overtimePay, totalPay, overtimeHours };
  };

  const wageInfo = calculateRealTimePay();

  // Handle Clock In / Clock Out Toggle
  const handleToggleShift = () => {
    if (!activeWorker) return;

    if (!isClockedIn) {
      // CLOCK IN
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setIsClockedIn(true);
      setClockInTimestamp(timeStr);
      setElapsedSeconds(1);

      // Update worker status
      const updatedWorkers = workers.map((w) =>
        w.id === activeWorker.id ? { ...w, currentStatus: "Clocked In" as const } : w
      );
      setWorkers(updatedWorkers);
      saveWorkers(updatedWorkers);
      setActiveWorker({ ...activeWorker, currentStatus: "Clocked In" });
    } else {
      // CLOCK OUT
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const totalHoursWorked = Math.max(0.5, Math.round((elapsedSeconds / 3600) * 10) / 10);
      const baseHours = Math.min(8, totalHoursWorked);
      const overtimeHours = Math.max(0, Math.round((totalHoursWorked - 8) * 10) / 10);
      const basePay = Math.round(baseHours * activeWorker.hourlyBaseRate);
      const overtimePay = Math.round(overtimeHours * activeWorker.hourlyOvertimeRate);
      const totalPay = basePay + overtimePay;

      const newShift: ShiftLog = {
        id: `shift-${Date.now()}`,
        workerId: activeWorker.id,
        workerName: activeWorker.name,
        role: activeWorker.role,
        sector: activeWorker.sector,
        date: now.toISOString().split("T")[0],
        clockInTime: clockInTimestamp || "08:00 AM",
        clockOutTime: timeStr,
        baseHours,
        overtimeHours,
        totalHours: totalHoursWorked,
        basePay,
        overtimePay,
        totalPay,
        status: "Completed",
        isOverworked: totalHoursWorked > 10,
        notes: `Clocked out via mobile terminal at ${timeStr}.`,
      };

      const updatedShifts = [newShift, ...shifts];
      setShifts(updatedShifts);
      saveShifts(updatedShifts);

      // Update worker status
      const updatedWorkers = workers.map((w) =>
        w.id === activeWorker.id ? { ...w, currentStatus: "Clocked Out" as const } : w
      );
      setWorkers(updatedWorkers);
      saveWorkers(updatedWorkers);
      setActiveWorker({ ...activeWorker, currentStatus: "Clocked Out" });

      setIsClockedIn(false);
      setElapsedSeconds(0);
      setClockInTimestamp(null);
    }
  };

  // Web Speech API Voice Recognition
  const handleToggleVoice = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      // Fallback: Populate realistic transcribed string to demonstrate functionality
      const simulatedVoices = [
        "Floor 3 external scaffolding bracket is loose and rattling under wind load.",
        "Chemical wash bucket spilled across main entrance walkway near cafeteria.",
        "Overhead crane hoist line has visible wire fraying near sector B lift.",
      ];
      const randomText =
        simulatedVoices[Math.floor(Math.random() * simulatedVoices.length)];
      setHazardText(randomText);
      setHazardNotification("Voice simulated (Browser SpeechRecognition API unavailable on this platform)");
      setTimeout(() => setHazardNotification(null), 4000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = lang === "hi" ? "hi-IN" : "en-IN";

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setHazardText(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (err) {
      console.error("Speech recognition startup error:", err);
      setIsRecording(false);
    }
  };

  // Submit hazard report
  const handleSubmitHazard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hazardText.trim() || !activeWorker) return;

    const newHazard: HazardReport = {
      id: `haz-${Date.now()}`,
      sector: activeWorker.sector,
      title: hazardText.slice(0, 50) + (hazardText.length > 50 ? "..." : ""),
      description: hazardText,
      urgency: hazardUrgency,
      status: "Pending",
      timestamp: new Date().toLocaleString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      reportedBy: isAnonymous ? "Anonymous Worker" : activeWorker.name,
      isAnonymous,
      isVoiceTranscribed: true,
      locationDetail: hazardLocation.trim() || `${activeWorker.sector} Primary Zone`,
    };

    const updatedHazards = [newHazard, ...hazards];
    setHazards(updatedHazards);
    saveHazards(updatedHazards);

    setHazardText("");
    setHazardLocation("");
    setHazardNotification(t.hazardSubmittedSuccess);
    setTimeout(() => setHazardNotification(null), 5000);
  };

  // Text-To-Speech Audio Read Aloud for Low-Literacy Workers
  const handleReadAloud = (textToRead: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = lang === "hi" ? "hi-IN" : "en-IN";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const workerShifts = shifts.filter((s) => s.workerId === activeWorker?.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center selection:bg-emerald-500 selection:text-white">
      {/* Mobile container - optimized for touch & low-literacy ergonomics */}
      <div className="w-full max-w-md min-h-screen bg-slate-900 border-x border-slate-800 flex flex-col pb-24 shadow-2xl relative">
        
        {/* TOP ACCESSIBILITY & NAVIGATION BAR */}
        <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-slate-950 text-lg shadow-md shadow-emerald-500/20">
              FS
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-wide text-white flex items-center gap-1.5">
                {t.appName}
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-bold">
                  SDG 8
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium truncate max-w-[170px]">
                {activeWorker?.sector || "Sector"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Multilingual Toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400 border border-slate-700 transition"
              title="Toggle English / Hindi"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "हिन्दी" : "English"}</span>
            </button>

            {/* Switch to Admin */}
            <Link
              href="/admin"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Go to Admin Dashboard"
            >
              <Layers className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* WORKER PERSONA SELECTOR (Cross-Sector Demonstration) */}
        <section className="bg-slate-850 p-3 border-b border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <RefreshCw className="w-3 h-3 text-emerald-400" />
              {t.switchWorker}
            </span>
            <button
              onClick={() => setShowPassport(true)}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <Award className="w-3.5 h-3.5" />
              {t.viewSkillPassport}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {workers.map((w) => {
              const isCurrent = activeWorker?.id === w.id;
              const isConstruction = w.sector.includes("Construction");
              return (
                <button
                  key={w.id}
                  onClick={() => handleSelectWorker(w.id)}
                  className={`text-left p-2.5 rounded-xl border transition flex items-center gap-2.5 ${
                    isCurrent
                      ? "bg-slate-800 border-emerald-500 shadow-sm shadow-emerald-500/20"
                      : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400"
                  }`}
                >
                  <span className="text-2xl p-1 bg-slate-800/80 rounded-lg">{w.avatar}</span>
                  <div className="truncate">
                    <p className={`text-xs font-bold truncate ${isCurrent ? "text-white" : "text-slate-300"}`}>
                      {w.name}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {isConstruction ? "Site A (Mason)" : "College (Sanitation)"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* WORKER HERO PROFILE & AUDIO READOUT */}
        <section className="p-4 bg-gradient-to-b from-slate-850 to-slate-900 border-b border-slate-800">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="text-4xl p-2 bg-slate-800 rounded-2xl block border border-slate-700 shadow-inner">
                  {activeWorker?.avatar}
                </span>
                <span
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                    isClockedIn ? "bg-emerald-500 animate-pulse" : "bg-slate-500"
                  }`}
                />
              </div>
              <div>
                <h1 className="text-lg font-black text-white leading-tight flex items-center gap-2">
                  {activeWorker?.name}
                </h1>
                <p className="text-xs text-emerald-400 font-semibold">{activeWorker?.role}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 border border-slate-700">
                    ID: {activeWorker?.badgeNumber}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-400" />
                    {activeWorker?.sector.includes("Construction") ? "Sector 4 Gate" : "Campus Block B"}
                  </span>
                </div>
              </div>
            </div>

            {/* High-visibility speech readout button for low-literacy workers */}
            <button
              onClick={() =>
                handleReadAloud(
                  lang === "hi"
                    ? `${activeWorker?.name}, आपका दैनिक वेतन 500 रुपये है। अभी आपकी स्थिति ${
                        isClockedIn ? "ड्यूटी पर है" : "ड्यूटी समाप्त है"
                      }।`
                    : `Worker ${activeWorker?.name}. Daily base wage is 500 rupees. Currently ${
                        isClockedIn ? "Clocked In and On Duty" : "Clocked Out"
                      }.`
                )
              }
              className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition flex flex-col items-center gap-0.5 active:scale-95"
              title={t.audioFeedbackReadAloud}
            >
              <Volume2 className="w-4 h-4" />
              <span className="text-[9px] font-bold">Listen</span>
            </button>
          </div>

          {/* Current Status Badge */}
          <div className="mt-3">
            <div
              className={`p-2 rounded-xl flex items-center justify-between text-xs font-bold border ${
                isClockedIn
                  ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                  : "bg-slate-800/80 border-slate-700 text-slate-400"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isClockedIn ? "bg-emerald-400 animate-ping" : "bg-slate-500"
                  }`}
                />
                <span>{isClockedIn ? t.statusDuty : t.statusOffDuty}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-normal">
                {t.gpsVerified}
              </span>
            </div>
          </div>
        </section>

        {/* ONE-TAP SHIFT TRACKER (Low-Literacy Tactile Interface) */}
        <section className="p-4 space-y-4">
          <div className="bg-slate-850 border border-slate-800 rounded-3xl p-5 shadow-lg relative overflow-hidden text-center">
            {/* Background ambient glow */}
            <div
              className={`absolute -top-12 -left-12 w-36 h-36 rounded-full blur-3xl opacity-30 ${
                isClockedIn ? "bg-emerald-500" : "bg-sky-500"
              }`}
            />
            <div
              className={`absolute -bottom-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-30 ${
                isClockedIn ? "bg-teal-500" : "bg-indigo-500"
              }`}
            />

            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest font-extrabold text-slate-400">
                {isClockedIn ? t.currentShiftDuration : "FairShift Attendance"}
              </span>

              {/* Huge Timer Readout */}
              <div className="my-3 py-2">
                <div className="text-3xl font-black tracking-tight text-white font-mono drop-shadow">
                  {isClockedIn ? formatTime(elapsedSeconds) : "00h : 00m : 00s"}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {isClockedIn
                    ? `${t.shiftStartedAt} ${clockInTimestamp || "08:00 AM"}`
                    : t.clockedOutNotice}
                </p>
              </div>

              {/* Big Ergonomic Touch Toggle Button */}
              <button
                onClick={handleToggleShift}
                className={`w-full py-4 px-6 rounded-2xl font-black text-base tracking-wide flex items-center justify-center gap-3 transition shadow-xl active:scale-95 ${
                  isClockedIn
                    ? "bg-gradient-to-r from-amber-600 via-rose-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white shadow-red-900/40"
                    : "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-slate-950 shadow-emerald-900/40"
                }`}
              >
                <Clock className="w-5 h-5 stroke-[2.5]" />
                <span>{isClockedIn ? t.clockOutAction : t.clockInAction}</span>
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.locationLocked}</span>
              </div>
            </div>
          </div>

          {/* TRANSPARENT PAYSLIP CARD (Itemized breakdown to prevent wage theft) */}
          <div className="bg-slate-850 border border-slate-800 rounded-3xl p-5 shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-sm font-black text-white flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  {t.payslipTitle}
                </h2>
                <p className="text-[11px] text-slate-400">{t.payslipSubtitle}</p>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                ₹500 Base/Day
              </span>
            </div>

            {/* Visual Shift Hours Progress Bar */}
            <div className="mb-4 bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-300">
                  {lang === "hi" ? "काम के घंटे" : "Hours Breakdown"}
                </span>
                <span className="text-white font-mono">
                  {isClockedIn ? (elapsedSeconds / 3600).toFixed(1) : "0.0"} hrs
                </span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, ((isClockedIn ? elapsedSeconds / 3600 : 0) / 8) * 100)}%`,
                  }}
                  title="Base 8 Hours"
                />
                <div
                  className="bg-amber-500 h-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      50,
                      (Math.max(0, (isClockedIn ? elapsedSeconds / 3600 : 0) - 8) / 4) * 100
                    )}%`,
                  }}
                  title="Overtime Hours (2x)"
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0 hrs</span>
                <span className="text-emerald-400 font-bold">8 hrs (Base Cap)</span>
                <span className="text-amber-400 font-bold">&gt;8 hrs (Overtime 2x)</span>
              </div>
            </div>

            {/* Itemized Rate Calculation */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <p className="font-bold text-slate-200">{t.basePayTitle}</p>
                  <p className="text-[10px] text-slate-400">{t.baseRateDesc}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white font-mono">₹{wageInfo.basePay.toFixed(2)}</p>
                  <p className="text-[10px] text-emerald-400 font-semibold">Standard</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <p className="font-bold text-slate-200">{t.overtimeHoursTitle}</p>
                  <p className="text-[10px] text-slate-400">{t.overtimeRateDesc}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-400 font-mono">
                    +₹{wageInfo.overtimePay.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {wageInfo.overtimeHours.toFixed(1)} hrs OT
                  </p>
                </div>
              </div>

              {/* Total Calculation Highlight */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/40 mt-1">
                <div>
                  <p className="text-xs font-black text-emerald-300 uppercase tracking-wide">
                    {t.estimatedEarnings}
                  </p>
                  <p className="text-[10px] text-emerald-400/80 font-medium">{t.guaranteedDaily}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-white font-mono">
                    ₹{wageInfo.totalPay.toFixed(2)}
                  </p>
                  <span className="text-[9px] bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded font-extrabold uppercase">
                    Guaranteed
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.sdg8Desc}</span>
            </div>
          </div>

          {/* VOICE HAZARD REPORTER (Web Speech API Integration) */}
          <div className="bg-slate-850 border border-slate-800 rounded-3xl p-5 shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-sm font-black text-white flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  {t.hazardReportTitle}
                </h2>
                <p className="text-[11px] text-slate-400">{t.hazardReportDesc}</p>
              </div>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                Voice Enabled
              </span>
            </div>

            {/* Notification Toast */}
            {hazardNotification && (
              <div className="mb-3 p-3 rounded-xl bg-emerald-950 border border-emerald-500/60 text-emerald-200 text-xs flex items-center gap-2 animate-bounce">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{hazardNotification}</span>
              </div>
            )}

            {/* Giant Microphone Speech Button */}
            <div className="my-3 flex flex-col items-center justify-center p-4 bg-slate-900 rounded-2xl border border-slate-800 relative">
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition active:scale-90 relative ${
                  isRecording
                    ? "bg-red-600 text-white animate-pulse shadow-red-500/50"
                    : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30"
                }`}
                title={isRecording ? t.stopListening : t.tapToSpeak}
              >
                {isRecording ? (
                  <MicOff className="w-9 h-9 stroke-[2.5]" />
                ) : (
                  <Mic className="w-9 h-9 stroke-[2.5]" />
                )}
                {isRecording && (
                  <span className="absolute -inset-2 rounded-full border-2 border-red-500 animate-ping opacity-75" />
                )}
              </button>

              <p className="text-xs font-bold text-slate-200 mt-3 flex items-center gap-1.5">
                {isRecording ? (
                  <span className="text-red-400 animate-pulse flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    {t.listening}
                  </span>
                ) : (
                  <span>{t.tapToSpeak}</span>
                )}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">{t.voiceTranscribeHint}</p>

              {/* Quick simulation buttons for desktop browser verification */}
              <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
                <span className="text-[10px] text-slate-500 w-full text-center">
                  Quick Voice Presets:
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setHazardText("Third floor scaffolding has missing safety pins and loose boards.")
                  }
                  className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-md border border-slate-700 transition"
                >
                  ⚡ Scaffold loose
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setHazardText("Slippery grease puddle in high-traffic student canteen corridor.")
                  }
                  className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-md border border-slate-700 transition"
                >
                  ⚡ Wet cafeteria floor
                </button>
              </div>
            </div>

            {/* Hazard Form */}
            <form onSubmit={handleSubmitHazard} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  {lang === "hi" ? "जोखिम विवरण" : "Transcribed Hazard Details"}
                </label>
                <textarea
                  value={hazardText}
                  onChange={(e) => setHazardText(e.target.value)}
                  placeholder={t.hazardPlaceholder}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  {lang === "hi" ? "विशिष्ट स्थान" : "Location / Floor Detail"}
                </label>
                <input
                  type="text"
                  value={hazardLocation}
                  onChange={(e) => setHazardLocation(e.target.value)}
                  placeholder={t.hazardLocationPlaceholder}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Urgency selector buttons */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1.5">
                  {t.urgencyLevel}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["High", "Medium", "Low"] as UrgencyLevel[]).map((level) => {
                    const isSelected = hazardUrgency === level;
                    const colors = {
                      High: isSelected
                        ? "bg-red-500 text-white border-red-400"
                        : "bg-slate-900 text-red-400 border-slate-800 hover:border-red-500/40",
                      Medium: isSelected
                        ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                        : "bg-slate-900 text-amber-400 border-slate-800 hover:border-amber-500/40",
                      Low: isSelected
                        ? "bg-emerald-500 text-slate-950 border-emerald-400 font-bold"
                        : "bg-slate-900 text-emerald-400 border-slate-800 hover:border-emerald-500/40",
                    };
                    return (
                      <button
                        type="button"
                        key={level}
                        onClick={() => setHazardUrgency(level)}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition ${colors[level]}`}
                      >
                        {level === "High" ? "🚨 " : level === "Medium" ? "⚠️ " : "ℹ️ "}
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Anonymous Toggle (Fear of Identification solution) */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="pr-2">
                  <p className="text-xs font-bold text-slate-200">{t.anonymousToggle}</p>
                  <p className="text-[10px] text-slate-400">{t.anonymousSubtitle}</p>
                </div>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </div>

              <button
                type="submit"
                disabled={!hazardText.trim()}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:pointer-events-none text-white transition flex items-center justify-center gap-2 shadow-lg shadow-red-900/30"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{t.submitHazard}</span>
              </button>
            </form>
          </div>

          {/* SHIFT HISTORY (Transparency Record) */}
          <div className="bg-slate-850 border border-slate-800 rounded-3xl p-5 shadow-lg">
            <h2 className="text-sm font-black text-white flex items-center gap-1.5 mb-3">
              <Calendar className="w-4 h-4 text-emerald-400" />
              {t.shiftHistory} ({workerShifts.length})
            </h2>

            <div className="space-y-2">
              {workerShifts.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-2">No past shifts logged yet.</p>
              ) : (
                workerShifts.map((s) => (
                  <div
                    key={s.id}
                    className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{s.date}</span>
                        {s.isOverworked && (
                          <span className="text-[9px] bg-red-500/20 text-red-400 border border-red-500/40 px-1.5 py-0.2 rounded font-bold">
                            ⚠️ Fatigue Alert (&gt;10h)
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {s.clockInTime} – {s.clockOutTime || "Ongoing"} ({s.totalHours} hrs)
                        {s.overtimeHours > 0 && ` • ${s.overtimeHours}h OT`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-emerald-400 text-sm">
                        ₹{s.totalPay.toFixed(2)}
                      </p>
                      <span className="text-[9px] text-slate-500 uppercase">{s.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* SKILL PASSPORT MODAL (UN SDG 8 Career Portability) */}
        {showPassport && activeWorker && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-3xl p-5 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-sm text-white">Digital Skill Passport</h3>
                </div>
                <button
                  onClick={() => setShowPassport(false)}
                  className="text-slate-400 hover:text-white text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <div className="my-4 text-center">
                <span className="text-4xl p-2 bg-slate-800 rounded-2xl inline-block mb-2">
                  {activeWorker.avatar}
                </span>
                <h4 className="font-extrabold text-base text-white">{activeWorker.name}</h4>
                <p className="text-xs text-emerald-400 font-medium">{activeWorker.role}</p>
                <p className="text-[11px] text-slate-400">{activeWorker.sector}</p>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Verified Competencies & Training
                </p>
                {activeWorker.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-200">{skill.name}</p>
                      <p className="text-[10px] text-slate-400">Verified: {skill.verifiedDate}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Cryptographically verifiable under UN SDG 8 Decent Work Framework.</span>
              </div>

              <button
                onClick={() => setShowPassport(false)}
                className="w-full mt-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition"
              >
                Close Passport
              </button>
            </div>
          </div>
        )}

        {/* BOTTOM FIXED ACCESS DOCK */}
        <div className="fixed bottom-0 max-w-md w-full bg-slate-900/95 backdrop-blur border-t border-slate-800 px-4 py-3 flex items-center justify-around z-30">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 text-[11px] text-slate-400 hover:text-white transition"
          >
            <Layers className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-center gap-1 text-[11px] text-emerald-400 font-bold"
          >
            <Clock className="w-5 h-5" />
            <span>Shift Tracker</span>
          </button>
          <Link
            href="/admin"
            className="flex flex-col items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-400 transition"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
