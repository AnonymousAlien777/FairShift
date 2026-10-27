export type Language = "en" | "hi";

export interface TranslationStrings {
  // App Header
  appName: string;
  tagline: string;
  workerPortal: string;
  adminPortal: string;
  language: string;
  switchWorker: string;
  statusDuty: string;
  statusOffDuty: string;

  // Clock in / out tracker
  clockInAction: string;
  clockOutAction: string;
  clockedInNotice: string;
  clockedOutNotice: string;
  currentShiftDuration: string;
  elapsedTime: string;
  startTime: string;
  locationLocked: string;
  gpsVerified: string;
  shiftStartedAt: string;

  // Payslip
  payslipTitle: string;
  payslipSubtitle: string;
  basePayTitle: string;
  baseRateDesc: string;
  overtimeHoursTitle: string;
  overtimeRateDesc: string;
  estimatedEarnings: string;
  guaranteedDaily: string;
  sdg8Protection: string;
  sdg8Desc: string;
  shiftHistory: string;
  date: string;
  hoursWorked: string;
  overtime: string;
  totalEarnings: string;

  // Hazard reporting
  hazardReportTitle: string;
  hazardReportDesc: string;
  tapToSpeak: string;
  listening: string;
  stopListening: string;
  voiceTranscribeHint: string;
  hazardPlaceholder: string;
  hazardLocationPlaceholder: string;
  urgencyLevel: string;
  urgencyHigh: string;
  urgencyMed: string;
  urgencyLow: string;
  anonymousToggle: string;
  anonymousSubtitle: string;
  submitHazard: string;
  hazardSubmittedSuccess: string;
  speechNotSupported: string;
  audioFeedbackReadAloud: string;

  // Navigation
  home: string;
  switchToAdmin: string;
  switchToWorker: string;
  viewSkillPassport: string;
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    appName: "FairShift",
    tagline: "UN SDG 8 Decent Work & Wage Protection",
    workerPortal: "Worker Shift & Safety Companion",
    adminPortal: "Employer Workforce Dashboard",
    language: "Language",
    switchWorker: "Switch Persona",
    statusDuty: "ON DUTY (CLOCKED IN)",
    statusOffDuty: "OFF DUTY (CLOCKED OUT)",

    clockInAction: "START SHIFT (CLOCK IN)",
    clockOutAction: "END SHIFT (CLOCK OUT)",
    clockedInNotice: "Your shift is active. Every minute and overtime hour is cryptographically logged.",
    clockedOutNotice: "You are currently off duty. Tap the button below when your workday starts.",
    currentShiftDuration: "Current Shift Duration",
    elapsedTime: "Elapsed Time",
    startTime: "Shift Started",
    locationLocked: "Site Geo-Fenced & Verified",
    gpsVerified: "GPS Site Match Verified",
    shiftStartedAt: "Clocked in at",

    payslipTitle: "Transparent Shift Earnings",
    payslipSubtitle: "Zero wage theft guaranteed. Itemized rate breakdown for today.",
    basePayTitle: "Base Shift Wage (8 Hours)",
    baseRateDesc: "Standard guaranteed rate ₹62.50/hr",
    overtimeHoursTitle: "Overtime Hours",
    overtimeRateDesc: "Premium 2.0x rate @ ₹125/hr",
    estimatedEarnings: "Total Shift Pay",
    guaranteedDaily: "₹500.00 Base Guaranteed",
    sdg8Protection: "UN SDG 8.8 Work Safety & Fair Pay Compliant",
    sdg8Desc: "Your work record is digitally locked and visible directly to payroll managers.",
    shiftHistory: "Recent Shift History",
    date: "Date",
    hoursWorked: "Total Hours",
    overtime: "Overtime",
    totalEarnings: "Total Pay",

    hazardReportTitle: "Voice Safety Hazard Reporter",
    hazardReportDesc: "No typing required. Tap the microphone and speak in your language.",
    tapToSpeak: "Tap to Speak Hazard",
    listening: "Listening... Speak clearly now",
    stopListening: "Stop Recording",
    voiceTranscribeHint: "Microphone speech is automatically transcribed below in real-time.",
    hazardPlaceholder: "Describe what is dangerous or broken (or use voice button above)...",
    hazardLocationPlaceholder: "Exact location (e.g. 3rd floor scaffolding, Main canteen steps)",
    urgencyLevel: "Risk Urgency Level",
    urgencyHigh: "HIGH RISK (Immediate Danger)",
    urgencyMed: "MEDIUM (Attention Required)",
    urgencyLow: "LOW (General Maintenance)",
    anonymousToggle: "Submit Anonymously",
    anonymousSubtitle: "Your name and worker ID will be kept strictly confidential.",
    submitHazard: "Transmit Safety Hazard Report",
    hazardSubmittedSuccess: "Hazard report transmitted immediately to site safety supervisors!",
    speechNotSupported: "Speech recognition not natively supported by browser. Fallback input available.",
    audioFeedbackReadAloud: "Listen (Read Aloud)",

    home: "Home Hub",
    switchToAdmin: "Employer Dashboard",
    switchToWorker: "Worker Mobile App",
    viewSkillPassport: "Digital Skill Passport",
  },
  hi: {
    appName: "फेयरशिफ्ट (FairShift)",
    tagline: "संयुक्त राष्ट्र SDG 8 उचित कार्य और वेतन संरक्षण",
    workerPortal: "श्रमिक शिफ्ट एवं सुरक्षा साथी",
    adminPortal: "नियोक्ता कार्यबल डैशबोर्ड",
    language: "भाषा (Language)",
    switchWorker: "कार्यकर्ता बदलें",
    statusDuty: "ड्यूटी पर (क्लॉक इन)",
    statusOffDuty: "ड्यूटी समाप्त (क्लॉक आउट)",

    clockInAction: "काम शुरू करें (क्लॉक इन)",
    clockOutAction: "काम समाप्त करें (क्लॉक आउट)",
    clockedInNotice: "आपकी शिफ्ट सक्रिय है। हर मिनट और ओवरटाइम वेतन सुरक्षित दर्ज हो रहा है।",
    clockedOutNotice: "आप अभी ड्यूटी से बाहर हैं। काम शुरू होने पर नीचे दिए गए बटन को दबाएं।",
    currentShiftDuration: "वर्तमान शिफ्ट समय",
    elapsedTime: "बीता हुआ समय",
    startTime: "शिफ्ट शुरू होने का समय",
    locationLocked: "कार्यस्थल स्थान सत्यापित",
    gpsVerified: "जीपीएस स्थल मिलान सफल",
    shiftStartedAt: "काम शुरू हुआ:",

    payslipTitle: "पारदर्शी वेतन पर्ची (Payslip)",
    payslipSubtitle: "वेतन कटौती से पूरी सुरक्षा। आज के काम का मदवार विवरण।",
    basePayTitle: "मूल शिफ्ट वेतन (8 घंटे)",
    baseRateDesc: "मानक निश्चित दर ₹62.50/घंटा (दैनिक ₹500)",
    overtimeHoursTitle: "अतिरिक्त समय (ओवरटाइम घंटे)",
    overtimeRateDesc: "दोगुना दर @ ₹125/घंटा",
    estimatedEarnings: "कुल शिफ्ट कमाई",
    guaranteedDaily: "₹500.00 निश्चित मूल वेतन",
    sdg8Protection: "संयुक्त राष्ट्र SDG 8.8 कार्यस्थल सुरक्षा प्रमाणित",
    sdg8Desc: "आपका काम डिजिटल रूप से दर्ज है, जिसे बदला या छिपाया नहीं जा सकता।",
    shiftHistory: "पिछली शिफ्ट का विवरण",
    date: "दिनांक",
    hoursWorked: "कुल काम के घंटे",
    overtime: "ओवरटाइम",
    totalEarnings: "कुल कमाई",

    hazardReportTitle: "आवाज से सुरक्षा जोखिम रिपोर्ट करें",
    hazardReportDesc: "लिखने की जरूरत नहीं। माइक बटन दबाएं और अपनी भाषा में बोलें।",
    tapToSpeak: "बोलने के लिए माइक दबाएं",
    listening: "सुन रहे हैं... कृपया स्पष्ट बोलें",
    stopListening: "रिकॉर्डिंग रोकें",
    voiceTranscribeHint: "आपकी आवाज अपने आप नीचे टेक्स्ट में बदल जाएगी।",
    hazardPlaceholder: "खतरे या टूटी हुई चीज के बारे में बताएं (या ऊपर माइक दबाएं)...",
    hazardLocationPlaceholder: "सटीक स्थान (जैसे तीसरी मंजिल की मचान, कैंटीन की सीढ़ी)",
    urgencyLevel: "जोखिम की गंभीरता",
    urgencyHigh: "उच्च जोखिम (तुरंत खतरा)",
    urgencyMed: "मध्यम जोखिम (ध्यान देने योग्य)",
    urgencyLow: "सामान्य (मरम्मत कार्य)",
    anonymousToggle: "गुमनाम रूप से भेजें",
    anonymousSubtitle: "आपका नाम और पहचान पूरी तरह गुप्त रखी जाएगी।",
    submitHazard: "सुरक्षा रिपोर्ट तुरंत भेजें",
    hazardSubmittedSuccess: "सुरक्षा रिपोर्ट सुपरवाइजर को सफलतापूर्वक भेज दी गई है!",
    speechNotSupported: "ब्राउज़र में वॉइस सपोर्ट सीमित है। आप लिखकर भी भेज सकते हैं।",
    audioFeedbackReadAloud: "सुनें (आवाज में सुनें)",

    home: "मुख्य पृष्ठ",
    switchToAdmin: "नियोक्ता डैशबोर्ड",
    switchToWorker: "श्रमिक मोबाइल ऐप",
    viewSkillPassport: "डिजिटल कौशल पासपोर्ट",
  },
};
