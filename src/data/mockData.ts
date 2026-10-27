export type Sector = "Construction - Site A" | "College - Campus Staff";

export interface SkillItem {
  name: string;
  level: "Beginner" | "Intermediate" | "Expert";
  verifiedDate: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  role: string;
  sector: Sector;
  phone: string;
  avatar: string;
  badgeNumber: string;
  baseDailyRate: number; // ₹500 standard base per day (8 hours)
  hourlyBaseRate: number; // ₹62.50 / hr
  hourlyOvertimeRate: number; // ₹125 / hr (2x premium)
  currentStatus: "Clocked In" | "Clocked Out";
  skills: SkillItem[];
}

export interface ShiftLog {
  id: string;
  workerId: string;
  workerName: string;
  role: string;
  sector: Sector;
  date: string;
  clockInTime: string;
  clockOutTime: string | null;
  baseHours: number;
  overtimeHours: number;
  totalHours: number;
  basePay: number;
  overtimePay: number;
  totalPay: number;
  status: "Active" | "Completed";
  isOverworked: boolean; // Flagged when totalHours > 10
  notes?: string;
}

export type UrgencyLevel = "High" | "Medium" | "Low";
export type HazardStatus = "Pending" | "Investigating" | "Resolved";

export interface HazardReport {
  id: string;
  sector: Sector;
  title: string;
  description: string;
  urgency: UrgencyLevel;
  status: HazardStatus;
  timestamp: string;
  reportedBy: string;
  isAnonymous: boolean;
  isVoiceTranscribed: boolean;
  locationDetail: string;
  resolvedAt?: string;
  resolutionNotes?: string;
}

export const INITIAL_WORKERS: WorkerProfile[] = [
  {
    id: "w-01",
    name: "Ramesh Kumar",
    role: "Mason & Bricklayer",
    sector: "Construction - Site A",
    phone: "+91 98451 22341",
    avatar: "👷‍♂️",
    badgeNumber: "BLD-4092",
    baseDailyRate: 500,
    hourlyBaseRate: 62.5,
    hourlyOvertimeRate: 125,
    currentStatus: "Clocked In",
    skills: [
      { name: "Brick Masonry", level: "Expert", verifiedDate: "2025-11-12" },
      { name: "Scaffolding Safety", level: "Intermediate", verifiedDate: "2026-02-10" },
      { name: "Concrete Mixing", level: "Expert", verifiedDate: "2025-08-20" },
    ],
  },
  {
    id: "w-02",
    name: "Anitha M",
    role: "Sanitation Staff",
    sector: "College - Campus Staff",
    phone: "+91 97892 55410",
    avatar: "👩‍💼",
    badgeNumber: "CMP-8812",
    baseDailyRate: 500,
    hourlyBaseRate: 62.5,
    hourlyOvertimeRate: 125,
    currentStatus: "Clocked Out",
    skills: [
      { name: "Chemical Disinfection", level: "Expert", verifiedDate: "2025-10-05" },
      { name: "Waste Segregation", level: "Expert", verifiedDate: "2026-01-14" },
      { name: "Floor Buffer Operation", level: "Intermediate", verifiedDate: "2026-03-01" },
    ],
  },
  {
    id: "w-03",
    name: "Vikram Patel",
    role: "Structural Welder",
    sector: "Construction - Site A",
    phone: "+91 98213 77489",
    avatar: "👨‍🏭",
    badgeNumber: "BLD-4105",
    baseDailyRate: 500,
    hourlyBaseRate: 62.5,
    hourlyOvertimeRate: 125,
    currentStatus: "Clocked In",
    skills: [
      { name: "Arc Welding", level: "Expert", verifiedDate: "2025-06-15" },
      { name: "Heavy Rigging", level: "Intermediate", verifiedDate: "2025-09-30" },
    ],
  },
  {
    id: "w-04",
    name: "Sunita Devi",
    role: "Campus Facility Attendant",
    sector: "College - Campus Staff",
    phone: "+91 94432 11982",
    avatar: "🧤",
    badgeNumber: "CMP-8830",
    baseDailyRate: 500,
    hourlyBaseRate: 62.5,
    hourlyOvertimeRate: 125,
    currentStatus: "Clocked In",
    skills: [
      { name: "Facility Hygiene", level: "Expert", verifiedDate: "2025-12-01" },
      { name: "First Aid Basics", level: "Intermediate", verifiedDate: "2026-02-18" },
    ],
  },
];

export const INITIAL_SHIFTS: ShiftLog[] = [
  {
    id: "shift-101",
    workerId: "w-01",
    workerName: "Ramesh Kumar",
    role: "Mason & Bricklayer",
    sector: "Construction - Site A",
    date: "2026-10-26",
    clockInTime: "07:30 AM",
    clockOutTime: "07:00 PM",
    baseHours: 8,
    overtimeHours: 3.5,
    totalHours: 11.5,
    basePay: 500,
    overtimePay: 437.5,
    totalPay: 937.5,
    status: "Completed",
    isOverworked: true, // > 10 hours FATIGUE ALERT
    notes: "Overtime mandated due to urgent foundation pour before rain.",
  },
  {
    id: "shift-102",
    workerId: "w-02",
    workerName: "Anitha M",
    role: "Sanitation Staff",
    sector: "College - Campus Staff",
    date: "2026-10-26",
    clockInTime: "06:00 AM",
    clockOutTime: "02:30 PM",
    baseHours: 8,
    overtimeHours: 0.5,
    totalHours: 8.5,
    basePay: 500,
    overtimePay: 62.5,
    totalPay: 562.5,
    status: "Completed",
    isOverworked: false,
    notes: "Morning campus sanitation cycle completed.",
  },
  {
    id: "shift-103",
    workerId: "w-03",
    workerName: "Vikram Patel",
    role: "Structural Welder",
    sector: "Construction - Site A",
    date: "2026-10-26",
    clockInTime: "08:00 AM",
    clockOutTime: "06:30 PM",
    baseHours: 8,
    overtimeHours: 2.5,
    totalHours: 10.5,
    basePay: 500,
    overtimePay: 312.5,
    totalPay: 812.5,
    status: "Completed",
    isOverworked: true, // > 10 hours FATIGUE ALERT
    notes: "Beam reinforcement welding on Sector 4 girder.",
  },
  {
    id: "shift-104",
    workerId: "w-04",
    workerName: "Sunita Devi",
    role: "Campus Facility Attendant",
    sector: "College - Campus Staff",
    date: "2026-10-26",
    clockInTime: "09:00 AM",
    clockOutTime: "05:00 PM",
    baseHours: 8,
    overtimeHours: 0,
    totalHours: 8,
    basePay: 500,
    overtimePay: 0,
    totalPay: 500,
    status: "Completed",
    isOverworked: false,
    notes: "Academic Block 2 inventory and disinfection.",
  },
  {
    id: "shift-105",
    workerId: "w-01",
    workerName: "Ramesh Kumar",
    role: "Mason & Bricklayer",
    sector: "Construction - Site A",
    date: "2026-10-27",
    clockInTime: "08:00 AM",
    clockOutTime: null,
    baseHours: 6.5,
    overtimeHours: 0,
    totalHours: 6.5,
    basePay: 500,
    overtimePay: 0,
    totalPay: 500,
    status: "Active",
    isOverworked: false,
    notes: "Currently on shift — Tower 2 east wall.",
  },
];

export const INITIAL_HAZARDS: HazardReport[] = [
  {
    id: "haz-201",
    sector: "Construction - Site A",
    title: "Unsecured scaffolding on 3rd floor",
    description: "Third floor scaffold planking is missing safety locking pins and edge railings. Worker slip risk is very high.",
    urgency: "High",
    status: "Pending",
    timestamp: "2026-10-27 08:45 AM",
    reportedBy: "Ramesh Kumar",
    isAnonymous: false,
    isVoiceTranscribed: true,
    locationDetail: "Sector 3 North Wing, Floor 3 external facade",
  },
  {
    id: "haz-202",
    sector: "College - Campus Staff",
    title: "Slippery floor near cafeteria",
    description: "Coolant line leak from ice dispenser pooling across the high-traffic corridor entrance near Student Dining Hall.",
    urgency: "Medium",
    status: "Pending",
    timestamp: "2026-10-27 09:15 AM",
    reportedBy: "Anitha M",
    isAnonymous: true,
    isVoiceTranscribed: true,
    locationDetail: "Dining Hall C Entrance corridor",
  },
  {
    id: "haz-203",
    sector: "Construction - Site A",
    title: "Overhead crane warning siren malfunctioning",
    description: "Audible alarm does not trigger when crane swings heavy load across active ground transit lane.",
    urgency: "High",
    status: "Investigating",
    timestamp: "2026-10-26 03:20 PM",
    reportedBy: "Vikram Patel",
    isAnonymous: false,
    isVoiceTranscribed: false,
    locationDetail: "Tower Crane #2 loading bay",
  },
  {
    id: "haz-204",
    sector: "College - Campus Staff",
    title: "Exposed chemical storage container in Basement B",
    description: "Industrial acid cleaning drum left unlatched and without adequate ventilation.",
    urgency: "High",
    status: "Resolved",
    timestamp: "2026-10-25 11:10 AM",
    reportedBy: "Sunita Devi",
    isAnonymous: true,
    isVoiceTranscribed: true,
    locationDetail: "Science Block basement store room 04",
    resolvedAt: "2026-10-25 01:30 PM",
    resolutionNotes: "Safety officer sealed chemical drums and relocated to locked containment cabinet.",
  },
];

// Local storage state helpers for seamless multi-page prototype persistence
export const STORAGE_KEYS = {
  WORKERS: "fairshift_workers_v1",
  SHIFTS: "fairshift_shifts_v1",
  HAZARDS: "fairshift_hazards_v1",
  ACTIVE_WORKER_ID: "fairshift_active_worker_v1",
  LANGUAGE: "fairshift_lang_v1",
};

export function getStoredWorkers(): WorkerProfile[] {
  if (typeof window === "undefined") return INITIAL_WORKERS;
  const stored = localStorage.getItem(STORAGE_KEYS.WORKERS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.WORKERS, JSON.stringify(INITIAL_WORKERS));
    return INITIAL_WORKERS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_WORKERS;
  }
}

export function saveWorkers(workers: WorkerProfile[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.WORKERS, JSON.stringify(workers));
}

export function getStoredShifts(): ShiftLog[] {
  if (typeof window === "undefined") return INITIAL_SHIFTS;
  const stored = localStorage.getItem(STORAGE_KEYS.SHIFTS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.SHIFTS, JSON.stringify(INITIAL_SHIFTS));
    return INITIAL_SHIFTS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_SHIFTS;
  }
}

export function saveShifts(shifts: ShiftLog[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.SHIFTS, JSON.stringify(shifts));
}

export function getStoredHazards(): HazardReport[] {
  if (typeof window === "undefined") return INITIAL_HAZARDS;
  const stored = localStorage.getItem(STORAGE_KEYS.HAZARDS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.HAZARDS, JSON.stringify(INITIAL_HAZARDS));
    return INITIAL_HAZARDS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_HAZARDS;
  }
}

export function saveHazards(hazards: HazardReport[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.HAZARDS, JSON.stringify(hazards));
}
