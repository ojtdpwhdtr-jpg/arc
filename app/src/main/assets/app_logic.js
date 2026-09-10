// ============================================================================
// ARCDESIGN CONSTRUCTION SERVICES - CORE LOGIC & CONTROLLER
// Version: 3.0.0 (Native Android Integrated + Complete Offline Engine)
// ============================================================================

// --- NATIVE ANDROID BRIDGE & SHARING POLYFILLS ---
function getAndroid() { return window.AndroidBridge || window.Android || null; }
var Android = getAndroid();
if (typeof window !== "undefined") {
  if (!window.Android && window.AndroidBridge) window.Android = window.AndroidBridge;
  if (!window.AndroidBridge && window.Android) window.AndroidBridge = window.Android;
}
var bootstrap = window.bootstrap || (typeof bootstrap !== "undefined" ? bootstrap : {});

if (typeof navigator.share === 'undefined') {
  navigator.share = async function(data) {
    if (Android && Android.shareText) {
      Android.shareText(data.title || "ARCDESIGN Timesheet", (data.text || "") + (data.url ? " " + data.url : ""));
      return Promise.resolve();
    }
    return Promise.reject(new Error("Web Share not supported"));
  };
}

const originalPrint = window.print;
window.print = function() {
  if (Android && Android.printPage) {
    Android.printPage();
  } else if (originalPrint) {
    originalPrint.call(window);
  }
};

// --- CORE DATA & CONSTANTS ---
const INITIAL_LOCATIONS_DATA = { 
  "SAN JOSEF": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": [
        "WILLY MANIBIN", "JERWIN MAGALLON", "JERRY MATUTE", "MICHAEL CANLAPAN", 
        "JEFF DELA CRUZ", "MICHAEL CAMACHO", "JONATHAN BARGAMENTO", "MONOLITO CABAGAN", 
        "PESELITO APILADO", "FAUSTINO MENDOZA", "CARLOS VALINO", "ARNEL BARELO", "NIKKO DIZON"
      ], 
      "MASONRY": ["JESSIE DIZON"],
      "LABOR": [
        "JOHN DELOS REYES", "NELSON MIRANDA", "NOEL MEDRIANO", "ACE GARCIA", 
        "REY MANINANG", "RICHARD SARMIENTO", "ROLANDO TOREJOS", "JAIME ANCHETA", 
        "ADRIAN RAMON", "RYAN BRIONES", "RIC VARGAS"
      ]
    } 
  }, 
  "PILIGAN": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["OGIE DE VARA", "RONEL TELEZ", "ROWEL SEBASTIAN", "RONNIE TELEZ", "RHEGIE SEBASTIAN"], 
      "LABOR": ["ROBIN DIZON", "GREGORIO PUNZAL", "ANGELITO ABALOS", "JOHN CARLO TRIGUEROS"], 
      "STAY IN": ["S- ROBERT DIAZ", "L- DANNY DELA CRUZ"] 
    } 
  }, 
  "GVE REYES": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["ED APOSTOL", "REX GONZALES", "JUN BERNABE", "MAVERIC DELOS SANTOS", "EDUARDO JAVIER"], 
      "LABOR": ["ALBERTO DELA CRUZ", "RANDY BERNARDINO", "RENE BERNABE", "ARNOLD CASTRO"] 
    } 
  }, 
  "GVE MORALES": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["WILLY ARELLANO", "MARIO AQUINO", "ALBERT RIVERA", "ROMMEL SANTOS", "EDGAR VALENTIN", "DANNY GUILERMO", "PIOLO VALENTIN"], 
      "WELDER": ["ORLAN REYES"], 
      "LABOR": ["RICHARD RIVERA", "ALJHON PALASAN", "CHRIS ANTONIO", "CENEN DANGAL"] 
    } 
  }, 
  "BALOC PINTOR": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["ARSENIO ESCUDERO", "JULIUS ESCUDERO", "JOHN DY", "JUN-JUN RAMOS", "JHON REY RAMOS"], 
      "LABOR": ["ALBERTO DELA CRUZ", "RANDY BERNARDINO", "RENE BERNABE", "ARNOLD CASTRO"] 
    } 
  }, 
  "BALOC SAMONTE": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["ROMEL SANTOS"], 
      "LABOR": ["JM VALLEJO", "CHRIS ANTONIO"] 
    } 
  }, 
  "AVIDA": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["MARCELO BULACLAC", "DANILO BULACLAC", "DAMASO BULACLAC", "BERNIE SYLVESTRE", "ROLY SYLVESTRE", "JOMVIC VALINO", "DARWIN GUSTO", "MARLON BULACLAC", "ROLANDO MEDOZA"], 
      "LABOR": ["MARCOS BULACLAC", "LON-LON CUAZON", "JUSTINE DELA CRUZ", "ANDREI DUMANGAN", "JAYSON DELA CRUZ", "JERIC YAKAT", "EMERSON SANTILLANA", "RAYBIN BARON", "ALLAN MABALAY"] 
    } 
  }, 
  "DINTOR ZARAGOZA": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["PHILIP CASTILLO", "JOHN PAUL CASTILLO", "JOHN GENRE PALANAN", "ROMEO RAMOS"] 
    } 
  }, 
  "NABAO": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["RESTY DIZON", "ILENG TABALDO", "ANTHONY TOLENTINO", "JOSE JUAN", "ROY GONZALES", "MARCELINO TOLENTINO", "ARVIN SANTOS", "ROBERT GONZALES", "MICHAEL TOLENTINO"], 
      "LABOR": ["FREDIE GUSTO", "LAUREN TABALDO", "REYNALDO LAGASCA", "WAWI VARGAS", "MARCIAL KATAHAN", "MARIANO BRIÑA", "RAMIL PAJARDO", "ANGELO SANTOS", "JEFFREY ESTIPULAR", "FELIPE GONZALES"], 
      "STAY IN": ["MARLON MAON"] 
    } 
  }, 
  "GEN LUNA": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["MICHAEL TOLENTINO"], 
      "LABOR": ["FELIPE GONZALES"] 
    } 
  }, 
  "SAN ANTONIO": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["ARMANDO JOSE", "JUN MARQUEZ", "ARNOLD SALAYSAY"], 
      "LABOR": ["MAVIN MAGNO", "AMARDY DELA CRUZ", "BENJIE LOPEZ", "JR DELA CRUZ", "RAMIL FAUSTINO", "DENNIS VICOS"] 
    } 
  } 
}; 

const ALL_ROLES = ["FOREMAN", "SKILLED", "MASONRY", "WELDER", "LABOR", "STAY IN", "BALE", "EXTRA"]; 

const DEFAULT_ROLE_DAY_RATES = {
  "FOREMAN": 800, "SKILLED": 650, "MASONRY": 650, "WELDER": 650, "LABOR": 450, "STAY IN": 500, "BALE": 450, "EXTRA": 450
};

const DAY_KEYS = ['M', 'T', 'W', 'Th', 'F', 'S']; 
const DAY_NAMES = { 'M': 'Monday', 'T': 'Tuesday', 'W': 'Wednesday', 'Th': 'Thursday', 'F': 'Friday', 'S': 'Saturday' };

const STORAGE_KEY = "arcdesign_timesheet_records_v20"; 
const PAYROLL_STORAGE_KEY = "arcdesign_payroll_rates_v1";
const STAFF_STORAGE_KEY = "arcdesign_staff_accounts_v1"; 

const DELETED_SITES_STORAGE_KEY = "arc_deleted_sites_list_v2";
const DELETED_WORKERS_STORAGE_KEY = "arc_deleted_workers_list_v2";
const DELETED_DATES_STORAGE_KEY = "arc_deleted_dates_list_v2";

const REMEMBER_FLAG_KEY = "arc_device_auto_login_active"; 
const REMEMBER_USER_KEY = "arc_saved_username_val"; 
const REMEMBER_PASS_KEY = "arc_saved_password_val"; 
const REMEMBER_ROLE_KEY = "arc_saved_user_role_val"; 
const NOTIF_FLAG_KEY = "arc_device_notifs_enabled";

// --- APPLICATION STATE ---
let timesheetDB = {}; 
let payrollDB = {};
let currentDate = getTodayFormatted(); 
let currentLocation = "SAN JOSEF"; 
let currentActiveData = null; 
let showStatsFlag = false; 
let selectedRolesFilter = []; 

let currentClearMath = { question: "", answer: 0 };
let currentDeleteDateMath = { question: "", answer: 0 };
let currentDeleteProjectMath = { question: "", answer: 0 };
let sitePendingDeletion = null;

let activeWorkerForNotes = null;
let activeWorkerForRename = null;
let activeCustomHourWorker = null;
let activeCustomHourDayKey = null;

let focusWorkerIndex = 0;
let focusWorkerList = [];

// --- STORAGE HELPERS ---
function safeStorageGet(key) { 
  try { return localStorage.getItem(key); } catch(e) { return null; } 
} 
function safeStorageSet(key, val) { 
  try { localStorage.setItem(key, val); } catch(e) { console.warn("Storage write error", e); } 
} 
function safeSessionSet(key, val) {
  try { sessionStorage.setItem(key, val); } catch(e) { window['__mem_' + key] = val; }
}
function safeSessionGet(key) {
  try { return sessionStorage.getItem(key) || window['__mem_' + key] || null; } catch(e) { return window['__mem_' + key] || null; }
}
function safeSessionRemove(key) {
  try { sessionStorage.removeItem(key); } catch(e) {}
  delete window['__mem_' + key];
}

function getDeletedSites() {
  try {
    let list = JSON.parse(localStorage.getItem(DELETED_SITES_STORAGE_KEY) || '["YT", "TEST"]');
    if (!list.includes("YT")) list.push("YT");
    if (!list.includes("TEST")) list.push("TEST");
    return list;
  } catch(e) { return ["YT", "TEST"]; }
}
function saveDeletedSites(list) {
  try { localStorage.setItem(DELETED_SITES_STORAGE_KEY, JSON.stringify(list)); } catch(e) {}
}
function getDeletedWorkers() {
  try { return JSON.parse(localStorage.getItem(DELETED_WORKERS_STORAGE_KEY) || '[]'); } catch(e) { return []; }
}
function saveDeletedWorkers(list) {
  try { localStorage.setItem(DELETED_WORKERS_STORAGE_KEY, JSON.stringify(list)); } catch(e) {}
}
function getDeletedDates() {
  try { return JSON.parse(localStorage.getItem(DELETED_DATES_STORAGE_KEY) || '[]'); } catch(e) { return []; }
}
function saveDeletedDates(list) {
  try { localStorage.setItem(DELETED_DATES_STORAGE_KEY, JSON.stringify(list)); } catch(e) {}
}
function getStaffAccounts() { 
  const data = safeStorageGet(STAFF_STORAGE_KEY); 
  if (data) { 
    try { return JSON.parse(data); } catch(e) { return []; } 
  } 
  return []; 
} 
function saveStaffAccounts(accounts) { 
  safeStorageSet(STAFF_STORAGE_KEY, JSON.stringify(accounts)); 
} 

// --- AUTH & ROLES ---
function isAdmin() { 
  return (safeSessionGet("arcdesign_user_role") || localStorage.getItem(REMEMBER_ROLE_KEY) || "staff") === "admin"; 
} 

function getCurrentUser() { 
  return { 
    username: safeSessionGet("arcdesign_logged_user") || localStorage.getItem(REMEMBER_USER_KEY) || "User", 
    role: safeSessionGet("arcdesign_user_role") || localStorage.getItem(REMEMBER_ROLE_KEY) || "staff" 
  }; 
} 

function checkAuth() { 
  const sessionAuth = safeSessionGet("arcdesign_logged_in"); 
  const sessionRole = safeSessionGet("arcdesign_user_role"); 
  const isRemembered = localStorage.getItem(REMEMBER_FLAG_KEY); 
  const savedUser = localStorage.getItem(REMEMBER_USER_KEY); 
  const savedPass = localStorage.getItem(REMEMBER_PASS_KEY); 

  const overlay = document.getElementById("loginOverlay"); 
  const userField = document.getElementById("loginUsername"); 
  const passField = document.getElementById("loginPassword"); 
  const rememberCheck = document.getElementById("rememberMeCheck"); 

  // If first time running or not authenticated, default to Admin so user is never locked out
  if (sessionAuth !== "true" && (isRemembered === null || isRemembered === "true")) {
    safeSessionSet("arcdesign_logged_in", "true");
    safeSessionSet("arcdesign_user_role", "admin");
    safeSessionSet("arcdesign_logged_user", "Admin");
    try {
      localStorage.setItem(REMEMBER_FLAG_KEY, "true");
      localStorage.setItem(REMEMBER_USER_KEY, "admin");
      localStorage.setItem(REMEMBER_PASS_KEY, "812124750");
      localStorage.setItem(REMEMBER_ROLE_KEY, "admin");
    } catch(e) {}
    if (userField) userField.value = "admin";
    if (passField) passField.value = "812124750";
    if (overlay) overlay.style.display = "none";
    updateAccountFooterDisplay();
    return;
  }

  if (sessionAuth === "true" && sessionRole) { 
    if (overlay) overlay.style.display = "none"; 
    updateAccountFooterDisplay(); 
  } else if (isRemembered === "true" && savedUser && savedPass) { 
    if (userField) userField.value = savedUser; 
    if (passField) passField.value = savedPass; 
    if (rememberCheck) rememberCheck.checked = true; 
    attemptLogin(true); 
    return; 
  } else { 
    if (overlay) overlay.style.display = "none"; // never obstruct UI
    if (userField) userField.value = savedUser || "admin"; 
    if (passField) passField.value = savedPass || "812124750";
  } 
  updateAccountFooterDisplay(); 
} 

window.attemptLogin = function(isAutomatic = false) { 
  try {
    const u = (document.getElementById("loginUsername")?.value || "").trim(); 
    const p = (document.getElementById("loginPassword")?.value || "").trim(); 
    const rememberCheck = document.getElementById("rememberMeCheck"); 
    const shouldRemember = rememberCheck ? rememberCheck.checked : false; 
    const alertEl = document.getElementById("loginErrorAlert");

    let authenticated = false; 
    let role = "staff"; 
    let user = u || "Staff"; 

    if (u.toLowerCase() === "admin" && p === "812124750") { 
      authenticated = true; 
      role = "admin"; 
      user = "Admin"; 
    } else { 
      const staffList = getStaffAccounts(); 
      const matched = staffList.find(s => s.username && s.username.toLowerCase() === u.toLowerCase() && s.password === p); 
      if (matched) { 
        authenticated = true; 
        role = "staff"; 
        user = matched.username; 
      } 
    } 

    if (authenticated) { 
      safeSessionSet("arcdesign_logged_in", "true"); 
      safeSessionSet("arcdesign_user_role", role); 
      safeSessionSet("arcdesign_logged_user", user); 

      if (shouldRemember) { 
        try {
          localStorage.setItem(REMEMBER_FLAG_KEY, "true"); 
          localStorage.setItem(REMEMBER_USER_KEY, u); 
          localStorage.setItem(REMEMBER_PASS_KEY, p); 
          localStorage.setItem(REMEMBER_ROLE_KEY, role); 
        } catch(e) {}
      } else { 
        try {
          localStorage.removeItem(REMEMBER_FLAG_KEY); 
          localStorage.removeItem(REMEMBER_USER_KEY); 
          localStorage.removeItem(REMEMBER_PASS_KEY); 
          localStorage.removeItem(REMEMBER_ROLE_KEY); 
        } catch(e) {}
      } 

      if (alertEl) alertEl.classList.add("d-none"); 
      const overlay = document.getElementById("loginOverlay"); 
      if (overlay) overlay.style.display = "none"; 

      updateAccountFooterDisplay(); 
      if (currentActiveData) renderUI(); 
      checkShowFeatureIntro(); 
      return; 
    } 

    if (!isAutomatic) { 
      if (alertEl) {
        alertEl.className = "alert alert-danger p-2 small text-center fw-bold";
        alertEl.innerText = "Invalid Username or Password!";
        alertEl.classList.remove("d-none");
      }
    } 
  } catch(e) {
    console.error("Login attempt error:", e);
  }
};

function logoutSession() { 
  safeSessionRemove("arcdesign_logged_in"); 
  safeSessionRemove("arcdesign_user_role"); 
  safeSessionRemove("arcdesign_logged_user"); 
  localStorage.removeItem(REMEMBER_FLAG_KEY); 
  localStorage.removeItem(REMEMBER_USER_KEY); 
  localStorage.removeItem(REMEMBER_PASS_KEY); 
  localStorage.removeItem(REMEMBER_ROLE_KEY); 

  const overlay = document.getElementById("loginOverlay"); 
  const userField = document.getElementById("loginUsername"); 
  const passField = document.getElementById("loginPassword"); 
  if (userField) userField.value = ""; 
  if (passField) passField.value = ""; 
  if (overlay) overlay.style.display = "flex"; 
  updateAccountFooterDisplay(); 
} 

function updateAccountFooterDisplay() { 
  const footerBadge = document.getElementById("activeAccountDisplay"); 
  const btnCreate = document.getElementById("btnCreateAccount"); 
  const isAdm = isAdmin(); 
  const currUser = getCurrentUser(); 

  if (footerBadge) { 
    footerBadge.className = isAdm ? "badge bg-danger" : "badge bg-info text-dark"; 
    footerBadge.innerText = isAdm ? `Administrator (${currUser.username})` : `Staff Member (${currUser.username})`; 
  } 

  if (btnCreate) { 
    btnCreate.style.display = isAdm ? "inline-block" : "none"; 
  } 
} 

// --- DATE CALCULATION & WEEK MANAGEMENT ---
function getTodayFormatted() { 
  const d = new Date(); 
  const year = d.getFullYear(); 
  const month = String(d.getMonth() + 1).padStart(2, '0'); 
  const day = String(d.getDate()).padStart(2, '0'); 
  return `${year}-${month}-${day}`; 
} 

function normalizeDateStringToYYYYMMDD(str) { 
  if (!str) return getTodayFormatted(); 
  const cleanStr = String(str).trim(); 
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleanStr)) return cleanStr; 
  const parsed = new Date(cleanStr); 
  if (!isNaN(parsed.getTime())) { 
    const year = parsed.getFullYear(); 
    const month = String(parsed.getMonth() + 1).padStart(2, '0'); 
    const day = String(parsed.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`; 
  } 
  return getTodayFormatted(); 
}

function calculateDatesForStart(dateStr) { 
  if (!dateStr) return []; 
  const cleanStr = normalizeDateStringToYYYYMMDD(dateStr); 
  const [year, month, day] = cleanStr.split('-').map(Number); 
  const inputDate = new Date(year, month - 1, day); 
  const dayOfWeek = inputDate.getDay(); 
  const diffToMonday = (dayOfWeek === 0) ? -6 : 1 - dayOfWeek;
  const mondayDate = new Date(year, month - 1, day + diffToMonday);

  const result = []; 
  for (let i = 0; i < 6; i++) { 
    const d = new Date(mondayDate.getFullYear(), mondayDate.getMonth(), mondayDate.getDate() + i); 
    result.push({ 
      key: DAY_KEYS[i], 
      dayNum: d.getDate(), 
      monthStr: d.toLocaleString('en-US', { month: 'short' }), 
      fullDateStr: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
    }); 
  } 
  return result; 
} 

function getCalculatedDates() { 
  return calculateDatesForStart(currentDate); 
}

function onStartDateChange(newDateVal) { 
  if (!newDateVal) return; 
  saveStore(); 
  currentDate = normalizeDateStringToYYYYMMDD(newDateVal); 
  if (!timesheetDB[currentDate]) { 
    timesheetDB[currentDate] = buildFreshLocationsData(); 
  } 
  currentActiveData = timesheetDB[currentDate]; 
  syncWeeklyPayrollRates(currentDate); 
  renderLocationDropdown(); 
  renderUI(); 
} 

// --- METRICS & CALCULATION ---
function parseHourlyValue(val) {
  if (typeof val === 'string' && val.endsWith('h')) {
    const num = parseFloat(val.replace('h', ''));
    return isNaN(num) ? 0 : num;
  }
  return 0;
}

function getWorkerMetrics(w) { 
  let daysWorked = 0; 
  let hourlyHours = 0;
  let totalOT = 0; 

  for (let k in (w.attendance || {})) { 
    const val = w.attendance[k]; 
    if (val === '1.0' || val === '1') { 
      daysWorked += 1.0; 
    } else if (val === '0.5') { 
      daysWorked += 0.5; 
    } else if (typeof val === 'string' && val.endsWith('h')) {
      hourlyHours += parseHourlyValue(val);
    }
  } 

  for (let k in (w.ot || {})) { 
    totalOT += (parseInt(w.ot[k], 10) || 0); 
  } 

  return { daysWorked, hourlyHours, totalOT }; 
} 

function getAttendanceClass(val) { 
  if (val === '1.0' || val === '1') return 'att-full'; 
  if (val === '0.5') return 'att-half'; 
  if (typeof val === 'string' && val.endsWith('h')) return 'att-custom-hour';
  if (val === 'absent') return 'att-absent'; 
  if (val === 'sick') return 'att-sick'; 
  if (val === 'emergency') return 'att-emergency'; 
  return ''; 
} 

function getWorkerAutomatedRemarks(worker) { 
  const remarks = []; 
  let absentCount = 0; 
  let lateHours = 0; 

  for (let k in (worker.attendance || {})) { 
    const val = worker.attendance[k]; 
    if (val === 'absent' || val === 'sick' || val === 'emergency') absentCount++; 
    if (typeof val === 'string' && val.endsWith('h')) {
      const h = parseHourlyValue(val);
      if (h < 8) lateHours += (8 - h);
    }
  } 

  const metrics = getWorkerMetrics(worker); 

  if (absentCount >= 3) { 
    remarks.push({ type: 'danger', text: '⚠️ High Absence' }); 
  } 
  if (metrics.totalOT >= 12) { 
    remarks.push({ type: 'warning text-dark', text: '🔥 Heavy OT' }); 
  } 
  if (metrics.daysWorked >= 6) { 
    remarks.push({ type: 'success', text: '⭐ Perfect Week' }); 
  } 
  if ((worker.baleValue || 0) > 1500) { 
    remarks.push({ type: 'info text-dark', text: '💳 High Bale' }); 
  } 
  return remarks; 
} 

// --- STORE INITIALIZATION & PERSISTENCE ---
function initStore() { 
  const raw = safeStorageGet(STORAGE_KEY); 
  const rawPayroll = safeStorageGet(PAYROLL_STORAGE_KEY);

  if (rawPayroll) {
    try { payrollDB = JSON.parse(rawPayroll); } catch(e) { payrollDB = {}; }
  } else {
    payrollDB = {};
  }

  if (raw) { 
    try { timesheetDB = JSON.parse(raw); } catch (e) { timesheetDB = {}; } 
  } 

  const today = getTodayFormatted(); 
  if (!timesheetDB[today]) { 
    timesheetDB[today] = buildFreshLocationsData(); 
  } 

  currentDate = today; 
  currentActiveData = timesheetDB[currentDate]; 

  syncWeeklyPayrollRates(currentDate);

  const picker = document.getElementById("startDatePicker"); 
  if (picker) picker.value = currentDate; 

  checkAuth(); 
} 

function saveStore() { 
  if (currentDate && currentActiveData) { 
    timesheetDB[currentDate] = currentActiveData; 
  } 
  safeStorageSet(STORAGE_KEY, JSON.stringify(timesheetDB)); 
} 

function buildFreshLocationsData() { 
  const data = { locations: {}, roleBales: {} }; 
  const delSites = getDeletedSites(); 
  const delWorkers = getDeletedWorkers(); 

  for (let loc in INITIAL_LOCATIONS_DATA) { 
    if (delSites.includes(loc.toUpperCase())) continue; 

    data.locations[loc] = { 
      baleValue: INITIAL_LOCATIONS_DATA[loc].baleValue || 0, 
      isDone: false, 
      siteRemarksHistory: [], 
      updatedAt: Date.now(), 
      workers: [] 
    }; 

    const rolesObj = INITIAL_LOCATIONS_DATA[loc].roles; 
    for (let role in rolesObj) { 
      rolesObj[role].forEach((workerName, idx) => { 
        const workerId = `w_${loc.substring(0, 3)}_${role.substring(0, 3)}_${idx}_${Date.now()}`; 
        if (delWorkers.includes(workerId)) return; 

        data.locations[loc].workers.push({ 
          id: workerId, 
          name: workerName.trim().toUpperCase(), 
          role: role, 
          baleValue: 0, 
          notesHistory: [], 
          updatedAt: Date.now(), 
          attendance: { M: '', T: '', W: '', Th: '', F: '', S: '' }, 
          ot: { M: 0, T: 0, W: 0, Th: 0, F: 0, S: 0 } 
        }); 
      }); 
    } 
  } 
  return data; 
} 

function syncWeeklyPayrollRates(targetDateKey) {
  if (!payrollDB[targetDateKey]) payrollDB[targetDateKey] = {};
  
  const allRecordedDates = Object.keys(payrollDB).filter(d => d !== targetDateKey).sort().reverse();
  if (allRecordedDates.length === 0) return;

  const latestDateKey = allRecordedDates[0];
  const latestSitesData = payrollDB[latestDateKey] || {};

  for (let loc in latestSitesData) {
    if (!payrollDB[targetDateKey][loc]) payrollDB[targetDateKey][loc] = {};
    const locWorkersRates = latestSitesData[loc] || {};

    for (let wId in locWorkersRates) {
      if (!payrollDB[targetDateKey][loc][wId]) {
        payrollDB[targetDateKey][loc][wId] = { ...locWorkersRates[wId] };
      }
    }
  }
}

function checkHasRecordForDate(dKey) { 
  const dObj = timesheetDB[dKey]; 
  if (!dObj || !dObj.locations) return false; 
  for (let loc in dObj.locations) { 
    const workers = dObj.locations[loc].workers || []; 
    for (let w of workers) { 
      for (let k in (w.attendance || {})) { 
        if (w.attendance[k] && w.attendance[k] !== '') return true; 
      } 
      for (let k in (w.ot || {})) { 
        if (w.ot[k] > 0) return true; 
      } 
    } 
  } 
  return false; 
} 

// --- LOCATION DROPDOWN & SWITCHING ---
function renderLocationDropdown() { 
  const sel = document.getElementById("locationSelector"); 
  if (!sel) return; 
  sel.innerHTML = ""; 

  const delSites = getDeletedSites(); 
  const sites = Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase())); 

  let html = `<option value="VIEW_ALL" ${currentLocation === "VIEW_ALL" ? "selected" : ""}>🌐 VIEW ALL LOCATIONS</option>`; 
  sites.forEach(loc => { 
    const isDone = !!(currentActiveData.locations[loc] && currentActiveData.locations[loc].isDone); 
    const mark = isDone ? "✓ " : ""; 
    const isSel = (loc === currentLocation); 
    html += `<option value="${loc}" ${isSel ? "selected" : ""}>${mark}${loc}</option>`; 
  }); 

  sel.innerHTML = html; 

  if (currentLocation !== "VIEW_ALL" && !sites.includes(currentLocation)) { 
    currentLocation = sites.length > 0 ? sites[0] : "VIEW_ALL"; 
    sel.value = currentLocation; 
  } 
} 

function switchLocation(newLoc) { 
  currentLocation = newLoc; 
  renderUI(); 
}

// --- RECORDED DATES LIST ---
function renderRecordedDatesList() { 
  const cont = document.getElementById("recordedDatesContainer"); 
  if (!cont) return; 

  const recordedKeys = Object.keys(timesheetDB).filter(dKey => checkHasRecordForDate(dKey)); 
  if (recordedKeys.length === 0) { 
    cont.innerHTML = `<span class="badge bg-light text-muted border">No past recorded weeks saved yet.</span>`; 
    return; 
  } 

  recordedKeys.sort().reverse(); 
  const html = recordedKeys.slice(0, 10).map(dKey => { 
    const isCurrent = (dKey === currentDate); 
    const dates = calculateDatesForStart(dKey); 
    const label = (dates.length > 0) ? `${dates[0].monthStr} ${dates[0].dayNum} - ${dates[dates.length - 1].dayNum}` : dKey; 

    return ` 
      <button class="btn btn-sm ${isCurrent ? 'btn-danger' : 'btn-outline-dark'} fw-bold" 
              onclick="selectRecordedDate('${dKey}')"> 
        <i class="bi bi-calendar-check me-1"></i>${label} 
      </button> 
    `; 
  }).join(''); 

  cont.innerHTML = html; 
} 

function selectRecordedDate(dateKey) { 
  saveStore(); 
  currentDate = dateKey; 
  currentActiveData = timesheetDB[currentDate]; 
  const picker = document.getElementById("startDatePicker"); 
  if (picker) picker.value = currentDate; 
  renderLocationDropdown(); 
  renderUI(); 
} 

// --- ROLE FILTER BUTTONS ---
function renderRoleFilterButtons() { 
  const cont = document.getElementById("roleFilterButtons"); 
  if (!cont) return; 

  let html = ` 
    <button class="btn btn-sm ${selectedRolesFilter.length === 0 ? 'btn-danger' : 'btn-outline-dark'} fw-bold px-2 py-0" 
            onclick="clearRoleFilters()">ALL</button> 
  `; 

  ALL_ROLES.forEach(r => { 
    const isSel = selectedRolesFilter.includes(r); 
    html += ` 
      <button class="btn btn-sm ${isSel ? 'btn-danger' : 'btn-outline-dark'} fw-semibold px-2 py-0" 
              onclick="toggleRoleFilter('${r}')">${r}</button> 
    `; 
  }); 

  cont.innerHTML = html; 
} 

function toggleRoleFilter(role) { 
  if (selectedRolesFilter.includes(role)) { 
    selectedRolesFilter = selectedRolesFilter.filter(r => r !== role); 
  } else { 
    selectedRolesFilter.push(role); 
  } 
  renderRoleFilterButtons(); 
  renderUI(); 
} 

function clearRoleFilters() { 
  selectedRolesFilter = []; 
  renderRoleFilterButtons(); 
  renderUI(); 
} 

function toggleStatsView() { 
  showStatsFlag = !showStatsFlag; 
  renderUI(); 
} 

// --- HEADER CONTROLS (BALE, CONTROLS, SUMMARY) ---
function renderLocationHeaderControls() {
  const baleCont = document.getElementById("locationBaleContainer");
  const dateRangeSummary = document.getElementById("dateRangeSummary");
  const siteControl = document.getElementById("siteControlContainer");
  const dates = getCalculatedDates();
  const dateRangeStr = (dates.length > 0) 
    ? `${dates[0].monthStr} ${dates[0].dayNum} - ${dates[dates.length - 1].monthStr} ${dates[dates.length - 1].dayNum}` 
    : currentDate;

  if (dateRangeSummary) {
    dateRangeSummary.innerHTML = `<i class="bi bi-calendar-range me-1 text-danger"></i>Current Period: <strong>${dateRangeStr}</strong>`;
  }

  const isAdm = isAdmin();

  if (baleCont) {
    if (currentLocation === "VIEW_ALL") {
      baleCont.innerHTML = `
        <span class="badge bg-danger fs-6"><i class="bi bi-globe me-1"></i>ALL SITES OVERVIEW</span>
      `;
    } else {
      const locData = (currentActiveData.locations && currentActiveData.locations[currentLocation]) || { baleValue: 0, isDone: false };
      baleCont.innerHTML = `
        <span class="badge bg-dark fs-6"><i class="bi bi-building me-1 text-danger"></i>${currentLocation}</span>
        <span class="badge ${locData.isDone ? 'bg-success' : 'bg-warning text-dark'}">${locData.isDone ? '✓ COMPLETED' : '⏱ IN PROGRESS'}</span>
        <div class="input-group input-group-sm" style="max-width: 170px;">
          <span class="input-group-text fw-bold bg-light text-danger">Site Bale ₱</span>
          <input type="number" step="any" class="form-control fw-bold text-end" value="${locData.baleValue || ''}" placeholder="0" onchange="updateLocationBale(this.value)">
        </div>
      `;
    }
  }

  if (siteControl) {
    siteControl.innerHTML = `
      <div class="d-flex align-items-center justify-content-xl-end gap-2 flex-wrap">
        ${isAdm ? `
          <button class="btn btn-outline-danger btn-sm fw-bold" onclick="showCreateProjectModal()">
            <i class="bi bi-plus-circle-fill me-1"></i>New Site
          </button>
        ` : ''}
        <button class="btn btn-danger btn-sm fw-bold shadow-sm" onclick="toggleStatsView()"><i class="bi bi-pie-chart-fill me-1"></i>Site Analytics</button>
        <button class="btn btn-outline-dark btn-sm fw-bold" onclick="promptClearRecords()">
          <i class="bi bi-arrow-counterclockwise text-danger me-1"></i>Clear Site Records
        </button>
        ${isAdm ? `
          <button class="btn btn-outline-secondary btn-sm fw-bold" onclick="promptDeleteRecordedDate()">
            <i class="bi bi-calendar-x text-danger me-1"></i>Delete Period
          </button>
        ` : ''}
      </div>
    `;
  }
}

// --- SITE STATS & ANALYTICS ---
let selectedAnalyticsSite = null;

function toggleStatsView() { 
  showStatsFlag = !showStatsFlag; 
  renderUI();
  if (showStatsFlag) {
    setTimeout(() => {
      const statsContainer = document.getElementById("siteStatsContainer");
      if (statsContainer) {
        statsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}

function updateSiteRemarks(loc, text) {
  if (currentActiveData.locations && currentActiveData.locations[loc]) {
    currentActiveData.locations[loc].remarks = text || '';
    saveStore();
  }
}

function switchAnalyticsSiteRemarks(siteName) {
  selectedAnalyticsSite = siteName;
  const textarea = document.getElementById("analyticsSiteRemarksField");
  if (textarea && currentActiveData.locations[siteName]) {
    textarea.value = currentActiveData.locations[siteName].remarks || '';
  }
  const msgEl = document.getElementById("analyticsSiteSavedMsg");
  if (msgEl) {
    msgEl.innerText = `Loaded notes for ${siteName}`;
    msgEl.className = "small text-muted";
  }
}

function saveAnalyticsSiteRemarks(text, showToast = false) {
  const delSites = getDeletedSites();
  const availableSites = Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase()));
  const site = selectedAnalyticsSite || (currentLocation !== "VIEW_ALL" ? currentLocation : availableSites[0]);
  if (!site || !currentActiveData.locations[site]) return;
  currentActiveData.locations[site].remarks = text || '';
  saveStore();
  const msgEl = document.getElementById("analyticsSiteSavedMsg");
  if (msgEl) {
    msgEl.innerText = `✓ Saved notes for ${site}!`;
    msgEl.className = "small text-success fw-bold";
    setTimeout(() => {
      if (msgEl) {
        msgEl.innerText = "Auto-saves as you type";
        msgEl.className = "small text-muted";
      }
    }, 2500);
  }
  if (showToast) {
    alert(`Site notes saved successfully for ${site}!`);
  }
}

function appendAnalyticsPresetTag(tag) {
  const textarea = document.getElementById("analyticsSiteRemarksField");
  if (!textarea) return;
  const current = textarea.value.trim();
  textarea.value = current ? `${current}\n• ${tag}` : `• ${tag}`;
  saveAnalyticsSiteRemarks(textarea.value);
}

// --- INDIVIDUAL WORKER ATTENDANCE GRAPHS & PERCENTAGES ---
let currentAnalyticsWorkersData = [];
let workerGraphSearchQuery = "";
let workerGraphSortOrder = "att_desc";

function renderSingleWorkerGraphCard(w) {
  const borderClass = w.attPct >= 80 ? 'border-success' : (w.attPct >= 50 ? 'border-primary' : 'border-danger');
  const badgeClass = w.attPct >= 80 ? 'bg-success' : (w.attPct >= 50 ? 'bg-primary' : 'bg-danger');
  const strokeColor = w.attPct >= 80 ? '#198754' : (w.attPct >= 50 ? '#0d6efd' : '#dc3545');

  // Day pills HTML
  const dayPills = (w.dayStatuses || []).map(d => `
    <div class="text-center p-1 rounded border bg-light flex-fill" style="min-width: 44px;">
      <div class="text-muted fw-bold" style="font-size: 0.62rem;">${d.key}</div>
      <span class="badge ${d.badgeClass} d-block my-1" style="font-size: 0.68rem; padding: 2px 3px;">${d.label}</span>
      <div style="font-size: 0.62rem;" class="${d.ot > 0 ? 'text-danger fw-bold' : 'text-muted'}">${d.ot > 0 ? `+${d.ot}h` : '0h'}</div>
    </div>
  `).join('');

  return `
    <div class="card p-3 mb-2 bg-white border-start ${borderClass} border-4 shadow-sm hover-bg-light transition-all">
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
        <div class="d-flex align-items-center gap-2 flex-wrap">
          <!-- CIRCULAR PERCENTAGE DONUT GAUGE -->
          <div class="position-relative d-inline-flex justify-content-center align-items-center" style="width: 46px; height: 46px; flex-shrink: 0;">
            <svg viewBox="0 0 36 36" class="w-100 h-100" style="transform: rotate(-90deg);">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e9ecef" stroke-width="4.5" />
              <path stroke-dasharray="${w.attPct}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="${strokeColor}" stroke-width="4.5" />
            </svg>
            <div class="position-absolute text-center">
              <span class="fw-bold" style="font-size: 0.68rem; color: ${strokeColor};">${w.attPct}%</span>
            </div>
          </div>

          <div>
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <span class="fw-bold text-dark fs-6 cursor-pointer" onclick="openWorkerProfileModal('${w.id}', '${w.name.replace(/'/g, "\\'")}')" title="View Full Worker Profile">${w.name}</span>
              <span class="badge bg-dark">${w.role}</span>
              <span class="badge bg-light text-muted border">${w.loc}</span>
            </div>
            ${w.remarks ? `<small class="text-muted fst-italic d-block mt-1" style="font-size: 0.75rem;"><i class="bi bi-chat-left-quote me-1"></i>"${w.remarks}"</small>` : ''}
          </div>
        </div>

        <div class="d-flex align-items-center gap-2">
          <div class="text-end">
            <span class="badge ${badgeClass} fs-6 fw-bold px-2 py-1">${w.attPct}% Attendance</span>
            <div class="text-muted" style="font-size: 0.72rem;">${w.daysWorked.toFixed(1)} / 6.0 Days</div>
          </div>
          <button type="button" class="btn btn-outline-danger btn-sm py-1 px-2" onclick="openWorkerProfileModal('${w.id}', '${w.name.replace(/'/g, "\\'")}')" title="Detailed Worker Profile & History">
            <i class="bi bi-graph-up me-1"></i>Profile
          </button>
        </div>
      </div>

      <!-- VISUAL ATTENDANCE PROGRESS GRAPH -->
      <div class="mb-2">
        <div class="d-flex justify-content-between align-items-center small text-muted mb-1" style="font-size: 0.75rem;">
          <span><i class="bi bi-bar-chart-steps text-danger me-1"></i>Shift & Attendance Distribution Graph:</span>
          <span><strong>${w.daysWorked.toFixed(1)}d</strong> worked &bull; <strong>${w.totalOT}h</strong> OT</span>
        </div>
        <div class="progress" style="height: 13px; border-radius: 6px; background-color: #e9ecef; overflow: hidden;">
          ${w.pFullW > 0 ? `<div class="progress-bar bg-success" style="width: ${w.pFullW}%;" title="Full Days: ${w.wFull} (${w.pFullW.toFixed(0)}%)"></div>` : ''}
          ${w.pHalfW > 0 ? `<div class="progress-bar bg-primary" style="width: ${w.pHalfW}%;" title="Half Days: ${w.wHalf} (${w.pHalfW.toFixed(0)}%)"></div>` : ''}
          ${w.pHourlyW > 0 ? `<div class="progress-bar" style="width: ${w.pHourlyW}%; background-color: #6f42c1;" title="Hourly: ${w.wHourly} (${w.pHourlyW.toFixed(0)}%)"></div>` : ''}
          ${w.pAbsentW > 0 ? `<div class="progress-bar bg-danger" style="width: ${w.pAbsentW}%;" title="Absences: ${w.wAbsent} (${w.pAbsentW.toFixed(0)}%)"></div>` : ''}
          ${w.pSickW > 0 ? `<div class="progress-bar bg-warning text-dark" style="width: ${w.pSickW}%;" title="Sick Leave: ${w.wSick} (${w.pSickW.toFixed(0)}%)"></div>` : ''}
          ${w.pEmergencyW > 0 ? `<div class="progress-bar" style="width: ${w.pEmergencyW}%; background-color: #fd7e14;" title="Emergency: ${w.wEmergency} (${w.pEmergencyW.toFixed(0)}%)"></div>` : ''}
        </div>
        <div class="d-flex justify-content-between align-items-center mt-1 text-muted" style="font-size: 0.68rem;">
          <span>0%</span>
          <span>50%</span>
          <span>100% Target Attendance</span>
        </div>
      </div>

      <!-- 6-DAY SHIFTS TIMELINE & KEY METRICS -->
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 pt-2 border-top mt-1">
        <div class="d-flex gap-1 flex-wrap flex-grow-1" style="max-width: 520px;">
          ${dayPills}
        </div>
        <div class="d-flex align-items-center gap-3 ms-auto small">
          <div><span class="text-muted">Overtime:</span> <strong class="${w.totalOT > 0 ? 'text-danger' : 'text-dark'}">${w.totalOT} hrs</strong></div>
          <div><span class="text-muted">Bale Advance:</span> <strong class="${w.bale > 0 ? 'text-danger' : 'text-dark'}">₱${w.bale.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div>
        </div>
      </div>
    </div>
  `;
}

function filterWorkerGraphs(query, sortBy) {
  if (query !== undefined) workerGraphSearchQuery = query;
  if (sortBy !== undefined) workerGraphSortOrder = sortBy;
  
  const container = document.getElementById("workerGraphsListContainer");
  const countBadge = document.getElementById("workerGraphsCountBadge");
  if (!container) return;
  
  let list = [...currentAnalyticsWorkersData];
  
  if (workerGraphSearchQuery) {
    const q = workerGraphSearchQuery.toLowerCase().trim();
    list = list.filter(w => 
      (w.name || '').toLowerCase().includes(q) || 
      (w.role || '').toLowerCase().includes(q) || 
      (w.loc || '').toLowerCase().includes(q) ||
      (w.remarks || '').toLowerCase().includes(q)
    );
  }
  
  if (workerGraphSortOrder === "att_desc") {
    list.sort((a, b) => b.attPct - a.attPct || b.daysWorked - a.daysWorked);
  } else if (workerGraphSortOrder === "att_asc") {
    list.sort((a, b) => a.attPct - b.attPct || a.daysWorked - b.daysWorked);
  } else if (workerGraphSortOrder === "ot_desc") {
    list.sort((a, b) => b.totalOT - a.totalOT);
  } else if (workerGraphSortOrder === "bale_desc") {
    list.sort((a, b) => b.bale - a.bale);
  } else if (workerGraphSortOrder === "name_asc") {
    list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }
  
  if (countBadge) countBadge.innerText = `${list.length} Workers Analyzed`;
  
  if (list.length === 0) {
    container.innerHTML = `<div class="alert alert-light text-muted text-center py-4">No workers matching "${workerGraphSearchQuery}".</div>`;
    return;
  }
  
  container.innerHTML = list.map(w => renderSingleWorkerGraphCard(w)).join("");
}

function renderSiteStats(container) { 
  if (!container) return; 
  container.className = "card card-custom p-3 p-md-4 mb-3 bg-white border-start border-danger border-4 shadow-sm"; 

  const dates = getCalculatedDates();
  const isViewAll = (currentLocation === "VIEW_ALL");
  const delSites = getDeletedSites();
  const sitesToProcess = isViewAll 
    ? Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase()))
    : [currentLocation];

  let totalHeadcount = 0; 
  let activeWorkersCount = 0;
  let totalDays = 0; 
  let totalHourly = 0;
  let totalOT = 0; 
  let totalWorkerBale = 0; 
  let totalSiteBale = 0;
  let fullDaysCount = 0;
  let halfDaysCount = 0;
  let hourlyDaysCount = 0;
  let absentDaysCount = 0;
  let sickDaysCount = 0;
  let emergencyDaysCount = 0;
  let totalExpectedShifts = 0;

  const roleCounts = {};
  const automatedWorkersList = [];
  const workerRemarksList = [];
  const allWorkersData = [];

  sitesToProcess.forEach(loc => {
    const locData = currentActiveData.locations[loc];
    if (!locData) return;
    totalSiteBale += (locData.baleValue || 0);

    const workers = locData.workers || [];
    totalHeadcount += workers.length;

    workers.forEach(w => {
      const m = getWorkerMetrics(w);
      if (m.daysWorked > 0 || m.hourlyHours > 0 || m.totalOT > 0) activeWorkersCount++;
      totalDays += m.daysWorked;
      totalHourly += m.hourlyHours;
      totalOT += m.totalOT;
      totalWorkerBale += (w.baleValue || 0);

      // Role distribution
      const r = w.role || 'LABOR';
      if (!roleCounts[r]) roleCounts[r] = { count: 0, days: 0 };
      roleCounts[r].count++;
      roleCounts[r].days += m.daysWorked;

      // Attendance tally
      let wFull = 0;
      let wHalf = 0;
      let wHourly = 0;
      let wAbsent = 0;
      let wSick = 0;
      let wEmergency = 0;
      const dayStatuses = [];

      dates.forEach(d => {
        totalExpectedShifts++;
        const att = (w.attendance && w.attendance[d.key]) || '';
        const ot = (w.overtime && w.overtime[d.key]) || 0;
        let label = '-';
        let badgeClass = 'bg-light text-muted border';

        if (att === '1.0' || att === '1') {
          fullDaysCount++;
          wFull++;
          label = '1.0';
          badgeClass = 'bg-success text-white';
        } else if (att === '0.5') {
          halfDaysCount++;
          wHalf++;
          label = '0.5';
          badgeClass = 'bg-primary text-white';
        } else if (String(att).endsWith('h')) {
          hourlyDaysCount++;
          wHourly++;
          label = att;
          badgeClass = 'text-white" style="background-color: #6f42c1;';
        } else if (att === 'absent') {
          absentDaysCount++;
          wAbsent++;
          label = 'A';
          badgeClass = 'bg-danger text-white';
        } else if (att === 'sick') {
          sickDaysCount++;
          wSick++;
          label = 'S';
          badgeClass = 'bg-warning text-dark';
        } else if (att === 'emergency') {
          emergencyDaysCount++;
          wEmergency++;
          label = 'E';
          badgeClass = 'text-white" style="background-color: #fd7e14;';
        }

        dayStatuses.push({
          key: d.key,
          dayNum: d.dayNum,
          label: label,
          badgeClass: badgeClass,
          ot: ot
        });
      });

      const totalPeriodDays = dates.length || 6;
      const attPct = totalPeriodDays > 0 ? Math.min(100, Math.round(((wFull + (wHalf * 0.5)) / totalPeriodDays) * 100)) : 0;
      const pFullW = totalPeriodDays > 0 ? ((wFull / totalPeriodDays) * 100) : 0;
      const pHalfW = totalPeriodDays > 0 ? ((wHalf / totalPeriodDays) * 100) : 0;
      const pHourlyW = totalPeriodDays > 0 ? ((wHourly / totalPeriodDays) * 100) : 0;
      const pAbsentW = totalPeriodDays > 0 ? ((wAbsent / totalPeriodDays) * 100) : 0;
      const pSickW = totalPeriodDays > 0 ? ((wSick / totalPeriodDays) * 100) : 0;
      const pEmergencyW = totalPeriodDays > 0 ? ((wEmergency / totalPeriodDays) * 100) : 0;

      allWorkersData.push({
        id: w.id,
        name: w.name,
        role: w.role || 'LABOR',
        loc: loc,
        daysWorked: m.daysWorked,
        totalOT: m.totalOT,
        bale: w.baleValue || 0,
        attPct: attPct,
        wFull: wFull,
        wHalf: wHalf,
        wHourly: wHourly,
        wAbsent: wAbsent,
        wSick: wSick,
        wEmergency: wEmergency,
        pFullW: pFullW,
        pHalfW: pHalfW,
        pHourlyW: pHourlyW,
        pAbsentW: pAbsentW,
        pSickW: pSickW,
        pEmergencyW: pEmergencyW,
        dayStatuses: dayStatuses,
        remarks: w.remarks || '',
        notesHistory: w.notesHistory || []
      });

      // Automated worker notes & alerts
      const autoNotes = getWorkerAutomatedRemarks(w);
      if (autoNotes.length > 0 || m.daysWorked >= 6 || m.totalOT >= 6 || (w.baleValue || 0) >= 1000) {
        automatedWorkersList.push({
          id: w.id,
          name: w.name,
          role: w.role,
          loc: loc,
          flags: autoNotes,
          daysWorked: m.daysWorked,
          totalOT: m.totalOT,
          bale: w.baleValue || 0
        });
      }

      // Worker custom remarks
      if (w.remarks || (w.notesHistory && w.notesHistory.length > 0)) {
        workerRemarksList.push({
          id: w.id,
          name: w.name,
          role: w.role,
          loc: loc,
          remarks: w.remarks || '',
          notesCount: (w.notesHistory || []).length
        });
      }
    });
  });

  currentAnalyticsWorkersData = allWorkersData;

  const grandBale = totalSiteBale + totalWorkerBale; 
  const totalLoggedShifts = fullDaysCount + halfDaysCount + hourlyDaysCount + absentDaysCount + sickDaysCount + emergencyDaysCount;
  const attendanceRate = totalExpectedShifts > 0 
    ? Math.round(((fullDaysCount + (halfDaysCount * 0.5)) / totalExpectedShifts) * 100) 
    : (totalLoggedShifts > 0 ? Math.round(((fullDaysCount + (halfDaysCount * 0.5)) / totalLoggedShifts) * 100) : 0);

  // SVG Pie Circle Slices Calculation (Donut)
  const pFull = totalLoggedShifts > 0 ? ((fullDaysCount / totalLoggedShifts) * 100) : 0;
  const pHalf = totalLoggedShifts > 0 ? ((halfDaysCount / totalLoggedShifts) * 100) : 0;
  const pHourly = totalLoggedShifts > 0 ? ((hourlyDaysCount / totalLoggedShifts) * 100) : 0;
  const pAbsent = totalLoggedShifts > 0 ? ((absentDaysCount / totalLoggedShifts) * 100) : 0;
  const pSick = totalLoggedShifts > 0 ? ((sickDaysCount / totalLoggedShifts) * 100) : 0;
  const pEmergency = totalLoggedShifts > 0 ? ((emergencyDaysCount / totalLoggedShifts) * 100) : 0;

  const off1 = 0;
  const off2 = -pFull;
  const off3 = -(pFull + pHalf);
  const off4 = -(pFull + pHalf + pHourly);
  const off5 = -(pFull + pHalf + pHourly + pAbsent);
  const off6 = -(pFull + pHalf + pHourly + pAbsent + pSick);

  // Active site for site notes panel
  const activeSiteForNotes = selectedAnalyticsSite && sitesToProcess.includes(selectedAnalyticsSite) 
    ? selectedAnalyticsSite 
    : (sitesToProcess.length > 0 ? sitesToProcess[0] : "");
  const activeSiteData = activeSiteForNotes && currentActiveData.locations[activeSiteForNotes] 
    ? currentActiveData.locations[activeSiteForNotes] 
    : { remarks: '' };

  let rolePillsHtml = '';
  for (let r in roleCounts) {
    rolePillsHtml += `
      <div class="col-6 col-sm-4 col-md-2">
        <div class="p-2 border rounded bg-light text-center shadow-xs">
          <small class="text-muted fw-bold d-block text-truncate">${r}</small>
          <span class="fs-6 fw-bold text-dark">${roleCounts[r].count} <small class="text-muted">(${roleCounts[r].days.toFixed(1)}d)</small></span>
        </div>
      </div>
    `;
  }

  container.innerHTML = ` 
    <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom flex-wrap gap-2"> 
      <div>
        <h5 class="fw-bold text-dark mb-0">
          <i class="bi bi-pie-chart-fill text-danger me-2"></i>Workforce Analytics & Site Health Dashboard
        </h5>
        <small class="text-muted">
          Comprehensive project metrics, overall attendance pie chart, automated worker notes, and supervisor logs for <strong>${isViewAll ? 'All Active Sites (' + sitesToProcess.length + ')' : currentLocation}</strong>.
        </small>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button type="button" class="btn btn-outline-danger btn-sm fw-bold" onclick="generatePDF('download', false, true)">
          <i class="bi bi-file-earmark-pdf-fill me-1"></i>Export Analytics PDF
        </button>
        <button type="button" class="btn btn-secondary btn-sm fw-bold px-3" onclick="toggleStatsView()">
          <i class="bi bi-x-lg me-1"></i>Close
        </button> 
      </div>
    </div> 

    <!-- STAT CARDS ROW (Using .analytics-stat-card & .analytics-stat-val) -->
    <div class="row g-2 mb-3"> 
      <div class="col-6 col-md-3"> 
        <div class="analytics-stat-card shadow-sm border-start border-primary border-3"> 
          <small class="text-muted fw-bold d-block text-uppercase">Total Headcount</small> 
          <div class="analytics-stat-val text-dark">${totalHeadcount}</div> 
          <small class="text-muted">${activeWorkersCount} Active this period</small>
        </div> 
      </div> 
      <div class="col-6 col-md-3"> 
        <div class="analytics-stat-card shadow-sm border-start border-success border-3"> 
          <small class="text-muted fw-bold d-block text-uppercase">Attendance Rate</small> 
          <div class="analytics-stat-val text-success">${attendanceRate}%</div> 
          <small class="text-muted">${totalDays.toFixed(1)} Days ${totalHourly > 0 ? '(+' + totalHourly + 'h)' : ''}</small>
        </div> 
      </div> 
      <div class="col-6 col-md-3"> 
        <div class="analytics-stat-card shadow-sm border-start border-danger border-3"> 
          <small class="text-muted fw-bold d-block text-uppercase">Total Overtime</small> 
          <div class="analytics-stat-val text-danger">${totalOT} hrs</div> 
          <small class="text-muted">Across all logged shifts</small>
        </div> 
      </div> 
      <div class="col-6 col-md-3"> 
        <div class="analytics-stat-card shadow-sm border-start border-warning border-3"> 
          <small class="text-muted fw-bold d-block text-uppercase">Total Cash Advance</small> 
          <div class="analytics-stat-val text-warning text-dark">₱${grandBale.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div> 
          <small class="text-muted">Site Bale + Worker Bale</small>
        </div> 
      </div> 
    </div> 

    <!-- PIE CIRCLE OF DATA OVERALL (CIRCULAR DONUT CHART + BREAKDOWN) -->
    <div class="card p-3 p-md-4 mb-3 bg-light border shadow-sm">
      <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom flex-wrap gap-2">
        <div>
          <h6 class="fw-bold text-dark mb-0">
            <i class="bi bi-pie-chart-fill text-danger me-2"></i>Overall Workforce Shift & Attendance Distribution
          </h6>
          <small class="text-muted">Visual breakdown of all logged worker shifts for this period</small>
        </div>
        <span class="badge bg-dark fs-6 px-3 py-2">${totalLoggedShifts} Logged Shifts</span>
      </div>

      <div class="row align-items-center g-3">
        <!-- SVG CIRCULAR PIE / DONUT CHART WITH CENTER METRICS -->
        <div class="col-12 col-md-5 col-lg-4 text-center">
          <div class="position-relative d-inline-flex justify-content-center align-items-center" style="width: 190px; height: 190px;">
            <svg viewBox="0 0 42 42" class="w-100 h-100" style="transform: rotate(-90deg);">
              <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#e9ecef" stroke-width="5.5"></circle>
              ${totalLoggedShifts === 0 ? `
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ced4da" stroke-width="5.5" stroke-dasharray="100 0"></circle>
              ` : `
                ${pFull > 0 ? `<circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#198754" stroke-width="5.5" stroke-dasharray="${pFull} ${100 - pFull}" stroke-dashoffset="${off1}"></circle>` : ''}
                ${pHalf > 0 ? `<circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#0d6efd" stroke-width="5.5" stroke-dasharray="${pHalf} ${100 - pHalf}" stroke-dashoffset="${off2}"></circle>` : ''}
                ${pHourly > 0 ? `<circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#6f42c1" stroke-width="5.5" stroke-dasharray="${pHourly} ${100 - pHourly}" stroke-dashoffset="${off3}"></circle>` : ''}
                ${pAbsent > 0 ? `<circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#dc3545" stroke-width="5.5" stroke-dasharray="${pAbsent} ${100 - pAbsent}" stroke-dashoffset="${off4}"></circle>` : ''}
                ${pSick > 0 ? `<circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ffc107" stroke-width="5.5" stroke-dasharray="${pSick} ${100 - pSick}" stroke-dashoffset="${off5}"></circle>` : ''}
                ${pEmergency > 0 ? `<circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#fd7e14" stroke-width="5.5" stroke-dasharray="${pEmergency} ${100 - pEmergency}" stroke-dashoffset="${off6}"></circle>` : ''}
              `}
            </svg>
            <div class="position-absolute text-center" style="pointer-events: none;">
              <div class="fw-bold text-dark fs-2 lh-1">${attendanceRate}%</div>
              <div class="text-muted text-uppercase fw-bold mt-1" style="font-size: 0.65rem; letter-spacing: 0.5px;">Attendance</div>
              <div class="text-muted" style="font-size: 0.65rem;">${totalDays.toFixed(1)} Days Worked</div>
            </div>
          </div>
          <div class="small text-muted mt-2">Overall Shift Distribution Ring</div>
        </div>

        <!-- PIE SLICES LEGEND & METRIC DETAILS -->
        <div class="col-12 col-md-7 col-lg-8">
          <div class="row g-2">
            <div class="col-6 col-sm-4">
              <div class="p-2 bg-white rounded border border-start border-success border-3">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="small fw-bold text-success"><i class="bi bi-check-circle-fill me-1"></i>Full Days</span>
                  <span class="badge bg-success">${pFull.toFixed(1)}%</span>
                </div>
                <div class="fs-5 fw-bold text-dark mt-1">${fullDaysCount} <small class="text-muted fs-6">shifts</small></div>
              </div>
            </div>

            <div class="col-6 col-sm-4">
              <div class="p-2 bg-white rounded border border-start border-primary border-3">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="small fw-bold text-primary"><i class="bi bi-circle-half me-1"></i>Half Days</span>
                  <span class="badge bg-primary">${pHalf.toFixed(1)}%</span>
                </div>
                <div class="fs-5 fw-bold text-dark mt-1">${halfDaysCount} <small class="text-muted fs-6">shifts</small></div>
              </div>
            </div>

            <div class="col-6 col-sm-4">
              <div class="p-2 bg-white rounded border border-start border-3" style="border-left-color: #6f42c1 !important;">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="small fw-bold" style="color: #6f42c1;"><i class="bi bi-clock-history me-1"></i>Hourly</span>
                  <span class="badge text-white" style="background-color: #6f42c1;">${pHourly.toFixed(1)}%</span>
                </div>
                <div class="fs-5 fw-bold text-dark mt-1">${hourlyDaysCount} <small class="text-muted fs-6">(${totalHourly}h)</small></div>
              </div>
            </div>

            <div class="col-6 col-sm-4">
              <div class="p-2 bg-white rounded border border-start border-danger border-3">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="small fw-bold text-danger"><i class="bi bi-x-circle-fill me-1"></i>Absences</span>
                  <span class="badge bg-danger">${pAbsent.toFixed(1)}%</span>
                </div>
                <div class="fs-5 fw-bold text-dark mt-1">${absentDaysCount} <small class="text-muted fs-6">days</small></div>
              </div>
            </div>

            <div class="col-6 col-sm-4">
              <div class="p-2 bg-white rounded border border-start border-warning border-3">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="small fw-bold text-warning text-dark"><i class="bi bi-bandaid me-1"></i>Sick Leave</span>
                  <span class="badge bg-warning text-dark">${pSick.toFixed(1)}%</span>
                </div>
                <div class="fs-5 fw-bold text-dark mt-1">${sickDaysCount} <small class="text-muted fs-6">days</small></div>
              </div>
            </div>

            <div class="col-6 col-sm-4">
              <div class="p-2 bg-white rounded border border-start border-3" style="border-left-color: #fd7e14 !important;">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="small fw-bold" style="color: #d65b00;"><i class="bi bi-exclamation-triangle-fill me-1"></i>Emergency</span>
                  <span class="badge text-white" style="background-color: #fd7e14;">${pEmergency.toFixed(1)}%</span>
                </div>
                <div class="fs-5 fw-bold text-dark mt-1">${emergencyDaysCount} <small class="text-muted fs-6">days</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ROLE TRADE DISTRIBUTION -->
    <div class="mb-3">
      <h6 class="fw-bold small text-dark mb-2"><i class="bi bi-people-fill text-danger me-1"></i>Position / Role Trade Distribution:</h6>
      <div class="row g-2">
        ${rolePillsHtml || '<div class="col-12 text-muted small">No workers found.</div>'}
      </div>
    </div>

    <!-- INDIVIDUAL WORKER ATTENDANCE GRAPHS & PERCENTAGES -->
    <div class="card p-3 p-md-4 mb-3 bg-light border shadow-sm">
      <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom flex-wrap gap-2">
        <div>
          <h6 class="fw-bold text-dark mb-0">
            <i class="bi bi-bar-chart-line-fill text-danger me-2"></i>Individual Worker Attendance Graphs & Percentages
          </h6>
          <small class="text-muted">Individual worker visual attendance graph, percentage rate, daily shift pills, and overtime</small>
        </div>
        <div class="d-flex align-items-center gap-2 flex-wrap">
          <span id="workerGraphsCountBadge" class="badge bg-danger fs-6 px-3 py-2">${allWorkersData.length} Workers Analyzed</span>
        </div>
      </div>

      <!-- SEARCH & SORT CONTROLS -->
      <div class="row g-2 mb-3">
        <div class="col-12 col-md-6">
          <div class="input-group input-group-sm shadow-xs">
            <span class="input-group-text bg-white"><i class="bi bi-search text-muted"></i></span>
            <input type="text" id="workerGraphSearchInput" class="form-control form-control-sm" 
                   placeholder="Search worker by name, trade/role, site, or remarks..." 
                   oninput="filterWorkerGraphs(this.value, undefined)">
            <button class="btn btn-outline-secondary" type="button" onclick="const input = document.getElementById('workerGraphSearchInput'); if (input) { input.value = ''; filterWorkerGraphs('', undefined); }">Clear</button>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="d-flex align-items-center justify-content-md-end gap-2">
            <label for="workerGraphSortSelect" class="small text-muted fw-bold mb-0 text-nowrap">Sort By:</label>
            <select id="workerGraphSortSelect" class="form-select form-select-sm shadow-xs" style="max-width: 250px;" onchange="filterWorkerGraphs(undefined, this.value)">
              <option value="att_desc" selected>Highest Attendance %</option>
              <option value="att_asc">Lowest Attendance %</option>
              <option value="ot_desc">Highest Overtime (OT)</option>
              <option value="bale_desc">Highest Cash Advance (Bale)</option>
              <option value="name_asc">Worker Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- WORKER GRAPHS CONTAINER -->
      <div id="workerGraphsListContainer" style="max-height: 540px; overflow-y: auto; padding-right: 4px;">
        ${allWorkersData.length > 0 
          ? allWorkersData.sort((a,b) => b.attPct - a.attPct || b.daysWorked - a.daysWorked).map(w => renderSingleWorkerGraphCard(w)).join('') 
          : '<div class="alert alert-light text-muted text-center py-4">No workers found in this site.</div>'}
      </div>
    </div>

    <!-- ROW: AUTOMATED WORKER NOTES & SITE SUPERVISOR REMARKS -->
    <div class="row g-3 mb-3">
      <!-- AUTOMATED WORKER NOTES & OPERATIONAL FLAGS ENGINE -->
      <div class="col-12 col-lg-6">
        <div class="card p-3 h-100 bg-white border shadow-sm">
          <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
            <h6 class="fw-bold small text-dark mb-0">
              <i class="bi bi-robot text-danger me-2"></i>Automated Worker Notes & Operational Flags:
            </h6>
            <span class="badge bg-danger text-white">${automatedWorkersList.length} Flagged</span>
          </div>
          <p class="text-muted small mb-2">Automated system remarks for attendance anomalies, overtime milestones, and cash advances.</p>
          
          <div style="max-height: 250px; overflow-y: auto;">
            ${automatedWorkersList.length > 0 ? automatedWorkersList.map(w => `
              <div class="d-flex justify-content-between align-items-center p-2 border-bottom hover-bg-light">
                <div>
                  <span class="fw-bold text-dark cursor-pointer" onclick="openWorkerProfileModal('${w.id}', '${w.name.replace(/'/g, "\\'")}')" title="View worker profile">${w.name}</span>
                  <span class="badge bg-dark ms-1">${w.role}</span>
                  ${isViewAll ? `<span class="badge bg-light text-muted border ms-1">${w.loc}</span>` : ''}
                  <div class="d-flex flex-wrap gap-1 mt-1">
                    ${w.flags.map(f => `<span class="badge bg-${f.type}" style="font-size:0.68rem;">${f.text}</span>`).join('')}
                  </div>
                </div>
                <div class="text-end">
                  <button type="button" class="btn btn-outline-danger btn-sm py-0 px-2" style="font-size: 0.72rem;" onclick="openWorkerProfileModal('${w.id}', '${w.name.replace(/'/g, "\\'")}')">
                    <i class="bi bi-graph-up me-1"></i>Analytics
                  </button>
                </div>
              </div>
            `).join('') : '<div class="alert alert-light text-muted small py-3 text-center">No automated worker attendance or overtime alerts detected this week.</div>'}
          </div>
        </div>
      </div>

      <!-- SITE SUPERVISOR NOTES & DAILY REMARKS PANEL (INTERACTIVE WITH AUTO-SAVE) -->
      <div class="col-12 col-lg-6">
        <div class="card p-3 h-100 bg-white border shadow-sm">
          <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
            <h6 class="fw-bold small text-dark mb-0">
              <i class="bi bi-journal-text text-danger me-2"></i>Site Supervisor Notes & Remarks:
            </h6>
            <div class="d-flex align-items-center gap-1">
              <label for="analyticsSiteSelect" class="small text-muted me-1 mb-0 fw-bold">Site:</label>
              <select id="analyticsSiteSelect" class="form-select form-select-sm fw-bold border-danger py-0" style="width: auto;" onchange="switchAnalyticsSiteRemarks(this.value)">
                ${sitesToProcess.map(s => `<option value="${s}" ${s === activeSiteForNotes ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>
          </div>
          <p class="text-muted small mb-2">Record daily progress, weather conditions, deliveries, safety inspections, and site reminders.</p>
          
          <div class="d-flex flex-wrap gap-1 mb-2">
            <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size:0.75rem;" onclick="appendAnalyticsPresetTag('☀️ Good Weather & Operations Normal')">+ ☀️ Good Weather</button>
            <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size:0.75rem;" onclick="appendAnalyticsPresetTag('🌧️ Heavy Rain / Standby')">+ 🌧️ Rain Standby</button>
            <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size:0.75rem;" onclick="appendAnalyticsPresetTag('🚚 Materials Delivered On Site')">+ 🚚 Materials</button>
            <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size:0.75rem;" onclick="appendAnalyticsPresetTag('⚠️ Safety Inspection Done')">+ ⚠️ Safety</button>
            <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size:0.75rem;" onclick="appendAnalyticsPresetTag('👷 Concrete Pouring Completed')">+ 👷 Pouring</button>
          </div>

          <div class="mb-2">
            <textarea id="analyticsSiteRemarksField" class="form-control form-control-sm" rows="4" 
                      placeholder="Enter site supervisor notes, daily achievements, supplier status, or delays..." 
                      oninput="saveAnalyticsSiteRemarks(this.value)">${(activeSiteData.remarks || '')}</textarea>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <span id="analyticsSiteSavedMsg" class="small text-muted">Auto-saves as you type</span>
            <button type="button" class="btn btn-danger btn-sm fw-bold px-3 shadow-sm" onclick="saveAnalyticsSiteRemarks(document.getElementById('analyticsSiteRemarksField')?.value, true)">
              <i class="bi bi-check2-circle me-1"></i>Save Site Remarks
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- WORKER CUSTOM REMARKS & INCIDENT LOG ROSTER -->
    <div class="card p-3 bg-white border shadow-sm">
      <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
        <h6 class="fw-bold small text-dark mb-0">
          <i class="bi bi-chat-left-text-fill text-danger me-2"></i>Worker Custom Remarks & Incident Notes Roster:
        </h6>
        <span class="badge bg-secondary">${workerRemarksList.length} Notes Recorded</span>
      </div>
      <div style="max-height: 200px; overflow-y: auto;">
        ${workerRemarksList.length > 0 ? workerRemarksList.map(w => `
          <div class="d-flex justify-content-between align-items-center p-2 border-bottom small">
            <div>
              <strong>${w.name}</strong> <span class="badge bg-dark">${w.role}</span>
              ${isViewAll ? `<span class="badge bg-light text-muted border ms-1">${w.loc}</span>` : ''}
              <span class="text-muted ms-2">${w.remarks ? `"${w.remarks}"` : '<em class="text-secondary">(No official remark)</em>'}</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              ${w.notesCount > 0 ? `<span class="badge bg-info text-dark">${w.notesCount} Incident Notes</span>` : ''}
              <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size:0.72rem;" onclick="openWorkerProfileModal('${w.id}', '${w.name.replace(/'/g, "\\'")}')">
                <i class="bi bi-pencil-square me-1"></i>Edit Notes
              </button>
            </div>
          </div>
        `).join('') : '<div class="text-muted small py-2 text-center">No custom remarks or incident notes recorded for workers this period. You can add remarks directly on the timesheet rows or in the worker profile modal.</div>'}
      </div>
    </div>
  `; 
}

// --- MAIN TIMESHEET RENDER ---
function renderUI() { 
  const container = document.getElementById("mainTimesheetContainer") || document.getElementById("tablesContainer"); 
  const statsContainer = document.getElementById("siteStatsContainer"); 
  const dates = getCalculatedDates(); 
  const isAdm = isAdmin(); 

  renderLocationHeaderControls();
  renderRecordedDatesList(); 
  renderRoleFilterButtons(); 
  updateAccountFooterDisplay(); 
  updateNotifButtonUI(); 

  if (statsContainer) {
    if (showStatsFlag) { 
      renderSiteStats(statsContainer); 
    } else { 
      statsContainer.className = "d-none"; 
      statsContainer.innerHTML = ""; 
    } 
  }

  if (container) {
    if (currentLocation === "VIEW_ALL") { 
      container.innerHTML = renderViewAllHTML(dates, isAdm); 
    } else { 
      container.innerHTML = renderSingleLocationHTML(currentLocation, dates, isAdm); 
    } 
  }
} 

function renderSingleLocationHTML(loc, dates, isAdm) { 
  const locData = currentActiveData.locations[loc]; 
  if (!locData) { 
    return `<div class="alert alert-warning">No records found for site: ${loc}</div>`; 
  } 

  const isDone = !!locData.isDone; 
  let workers = locData.workers || []; 
  if (selectedRolesFilter.length > 0) { 
    workers = workers.filter(w => selectedRolesFilter.includes(w.role)); 
  } 

  let siteTotalDays = 0; 
  let siteTotalHourlyHours = 0;
  let siteTotalOT = 0; 
  let siteTotalWorkerBale = 0; 

  const headerDayCols = dates.map(d => ` 
    <th class="text-center col-day-header" style="min-width: 65px;"> 
      <span class="day-letter d-block fw-bold">${d.key}</span> 
      <span class="day-number small text-muted">${d.dayNum}</span> 
    </th> 
  `).join(''); 

  const rows = workers.map(w => { 
    const m = getWorkerMetrics(w); 
    siteTotalDays += m.daysWorked; 
    siteTotalHourlyHours += m.hourlyHours;
    siteTotalOT += m.totalOT; 
    siteTotalWorkerBale += (w.baleValue || 0); 

    const dayCells = dates.map(d => { 
      const val = (w.attendance && w.attendance[d.key]) || ''; 
      const otVal = (w.ot && w.ot[d.key]) || 0; 
      const attClass = getAttendanceClass(val); 
      const isEligibleForOT = (val === '1.0' || val === '1' || val === '0.5'); 
      const isHourly = val && val.endsWith('h');

      return ` 
        <td class="p-0 border-end"> 
          <div class="d-flex flex-column h-100"> 
            <select class="form-select custom-select-compact text-center ${attClass} fw-bold rounded-0 border-0" 
                    onchange="if(this.value==='__custom_hours__'){ promptCustomHours('${w.id}', '${d.key}'); } else { updateAttendance('${w.id}', '${d.key}', this.value); }"> 
              <option value="" ${val === '' ? 'selected' : ''}>-</option> 
              <option value="1.0" ${val === '1.0' || val === '1' ? 'selected' : ''}>Full</option> 
              <option value="0.5" ${val === '0.5' ? 'selected' : ''}>Half</option> 
              ${isHourly ? `<option value="${val}" selected>${val}</option>` : ''}
              <option value="__custom_hours__">⏱ Custom...</option> 
              <option value="absent" ${val === 'absent' ? 'selected' : ''}>Abs</option> 
              <option value="sick" ${val === 'sick' ? 'selected' : ''}>Sick</option> 
              <option value="emergency" ${val === 'emergency' ? 'selected' : ''}>Emg</option> 
            </select> 
            <select class="form-select custom-select-compact text-center bg-light text-danger fw-bold rounded-0 border-top border-0" 
                    style="font-size: 0.65rem;" 
                    ${!isEligibleForOT ? 'disabled' : ''} 
                    onchange="updateOT('${w.id}', '${d.key}', this.value)"> 
              <option value="0" ${otVal === 0 ? 'selected' : ''}>0</option> 
              <option value="1" ${otVal === 1 ? 'selected' : ''}>+1h</option> 
              <option value="2" ${otVal === 2 ? 'selected' : ''}>+2h</option> 
              <option value="3" ${otVal === 3 ? 'selected' : ''}>+3h</option> 
              <option value="4" ${otVal === 4 ? 'selected' : ''}>+4h</option> 
              <option value="5" ${otVal === 5 ? 'selected' : ''}>+5h</option> 
            </select> 
          </div> 
        </td> 
      `; 
    }).join(''); 

    const autoRemarks = getWorkerAutomatedRemarks(w); 
    const workerNotes = w.notesHistory || []; 
    const safeWorkerName = (w.name || '').replace(/ /g, '&nbsp;');

    return ` 
      <tr id="workerRow_${w.id}"> 
        <td class="align-middle fw-bold worker-name-cell"> 
          <div class="d-flex align-items-center justify-content-between"> 
            <span class="text-uppercase text-nowrap cursor-pointer" style="word-spacing: 4px; cursor: pointer;" onclick="openWorkerProfileModal('${w.id}', '${(w.name || '').replace(/'/g, "\\'")}')" title="Click to view Worker Analytics & Remarks">${safeWorkerName}</span> 
            <div class="d-flex align-items-center gap-1 no-print"> 
              <button class="btn btn-sm btn-outline-danger p-0 px-1" onclick="startFocusMode('${w.id}')" title="Focus Log">
                <i class="bi bi-bullseye"></i>
              </button>
              <button class="btn btn-sm btn-outline-dark p-0 px-1" onclick="openWorkerProfileModal('${w.id}', '${(w.name || '').replace(/'/g, "\\'")}')" title="Worker Analytics & Remarks"> 
                <i class="bi bi-graph-up text-danger"></i>${workerNotes.length > 0 ? `<span class="badge bg-danger ms-1" style="font-size:0.6rem;">${workerNotes.length}</span>` : ''} 
              </button> 
              ${isAdm ? ` 
                <button class="btn btn-sm btn-outline-danger p-0 px-1 border-0" onclick="promptDeleteWorker('${loc}', '${w.id}', '${(w.name || '').replace(/'/g, "\\'")}')" title="Delete worker"> 
                  <i class="bi bi-trash-fill"></i> 
                </button> 
              ` : ''} 
            </div> 
          </div> 
          ${autoRemarks.length > 0 ? ` 
            <div class="d-flex flex-wrap gap-1 mt-1"> 
              ${autoRemarks.map(r => `<span class="badge bg-${r.type}" style="font-size: 0.6rem;">${r.text}</span>`).join('')} 
            </div> 
          ` : ''} 
        </td> 
        <td class="align-middle text-center fw-bold text-muted col-role" style="font-size: 0.72rem;">${w.role}</td> 
        ${dayCells} 
        <td class="align-middle text-center fw-bold bg-light text-dark fs-6 col-days-total">
          ${m.daysWorked.toFixed(1)}
          ${m.hourlyHours > 0 ? `<div class="badge bg-secondary text-white" style="font-size:0.6rem; display:block;">+${m.hourlyHours}h</div>` : ''}
        </td> 
        <td class="align-middle text-center fw-bold bg-light text-danger fs-6 col-ot-total">${m.totalOT}h</td> 
        <td class="align-middle text-center p-1 col-worker-bale"> 
          <div class="input-group input-group-sm"> 
            <span class="input-group-text p-1 py-0 bg-transparent text-secondary border-0" style="font-size: 0.7rem;">₱</span> 
            <input type="number" step="any" class="form-control form-control-sm text-end p-1 fw-bold" 
                   value="${w.baleValue || ''}" placeholder="0" 
                   onchange="updateWorkerBale('${w.id}', this.value)" style="min-width: 60px;"> 
          </div> 
        </td> 
        <td class="align-middle p-1 col-worker-remarks"> 
          <div class="input-group input-group-sm"> 
            <input type="text" class="form-control form-control-sm fw-semibold" 
                   value="${(w.remarks || '').replace(/"/g, '&quot;')}" placeholder="Notes/Remarks..." 
                   title="Worker custom remark or note" 
                   oninput="updateWorkerRemarks('${w.id}', this.value)"
                   onchange="updateWorkerRemarks('${w.id}', this.value)" style="font-size: 0.75rem; min-width: 90px;"> 
            <button class="btn btn-outline-secondary btn-sm p-0 px-1" 
                    onclick="openWorkerProfileModal('${w.id}', '${(w.name || '').replace(/'/g, "\\'")}')" 
                    title="Worker Analytics & Remarks"> 
              <i class="bi bi-pencil-square text-danger"></i> 
            </button> 
          </div> 
        </td> 
      </tr> 
    `; 
  }).join(''); 

  const dateRangeStr = (dates.length > 0) ? `${dates[0].monthStr} ${dates[0].dayNum} - ${dates[dates.length - 1].monthStr} ${dates[dates.length - 1].dayNum}` : currentDate; 
  const isNotesActive = !!siteNotesVisible[loc];

  return ` 
    <div class="card card-custom p-3 bg-white mb-4 shadow-sm"> 
      <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2"> 
        <div class="d-flex align-items-center gap-2"> 
          <h4 class="fw-bold mb-0 text-dark fs-5"> 
            <i class="bi bi-building-fill text-danger me-2"></i>${loc} 
          </h4> 
          <span class="badge ${isDone ? 'bg-success' : 'bg-warning text-dark'}"> 
            ${isDone ? '<i class="bi bi-check-circle-fill me-1"></i>COMPLETED' : '<i class="bi bi-clock-fill me-1"></i>IN PROGRESS'} 
          </span> 
          <span class="badge bg-dark">${dateRangeStr}</span> 
        </div> 

        <div class="d-flex align-items-center gap-2 flex-wrap no-print"> 
          <button class="btn btn-outline-danger btn-sm fw-bold" onclick="startFocusMode()" title="Mobile Shift Flow">
            <i class="bi bi-bullseye me-1"></i>Focus Mode
          </button>
          <button class="btn btn-outline-dark btn-sm fw-bold" onclick="toggleStatsView()"> 
            <i class="bi bi-pie-chart-fill me-1 text-danger"></i>${showStatsFlag ? 'Hide Analytics' : 'Site Analytics'} 
          </button> 
          <button class="btn ${isNotesActive ? 'btn-danger text-white' : 'btn-outline-danger'} btn-sm fw-bold" onclick="toggleSiteNotes('${loc}')" title="Site Supervisor Notes & Daily Remarks"> 
            <i class="bi bi-journal-text me-1"></i>Site Notes${locData.remarks ? '<span class="badge bg-white text-danger ms-1">●</span>' : ''} 
          </button> 
          <button class="btn ${isDone ? 'btn-outline-secondary' : 'btn-success'} btn-sm fw-bold" onclick="toggleSiteStatus('${loc}')"> 
            <i class="bi ${isDone ? 'bi-arrow-counterclockwise' : 'bi-check2-all'} me-1"></i>${isDone ? 'Reopen Site' : 'Mark as Done'} 
          </button> 
          <button class="btn btn-outline-dark btn-sm fw-bold" onclick="showAddWorkerModal('${loc}')"> 
            <i class="bi bi-person-plus-fill me-1 text-danger"></i>Add Worker 
          </button> 
          ${isAdm ? ` 
            <button class="btn btn-outline-danger btn-sm fw-bold" onclick="promptDeleteSite('${loc}')"> 
              <i class="bi bi-trash-fill me-1"></i>Delete Site 
            </button> 
          ` : ''} 
        </div> 
      </div> 

      <!-- SITE SUPERVISOR NOTES CARD (COLLAPSIBLE / EXPANDABLE) -->
      <div id="siteNotesSection_${loc}" class="${isNotesActive ? '' : 'd-none'} card p-3 mb-3 bg-light border-start border-danger border-4 shadow-sm no-print">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h6 class="fw-bold mb-0 text-dark">
            <i class="bi bi-journal-text text-danger me-2"></i>Site Supervisor Notes & Daily Remarks (${loc})
          </h6>
          <button type="button" class="btn-close btn-sm" onclick="toggleSiteNotes('${loc}')" title="Close Notes"></button>
        </div>
        <p class="text-muted small mb-2">Record weather conditions, material arrivals, safety observations, and general site notes for this week.</p>
        <div class="d-flex flex-wrap gap-1 mb-2">
          <span class="badge bg-white text-dark border cursor-pointer" onclick="appendSiteNotePreset('${loc}', '☀️ Good Weather')">+ Good Weather</span>
          <span class="badge bg-white text-dark border cursor-pointer" onclick="appendSiteNotePreset('${loc}', '🌧️ Heavy Rain / Standby')">+ Heavy Rain</span>
          <span class="badge bg-white text-dark border cursor-pointer" onclick="appendSiteNotePreset('${loc}', '🚚 Materials Delivered')">+ Materials Delivered</span>
          <span class="badge bg-white text-dark border cursor-pointer" onclick="appendSiteNotePreset('${loc}', '⚠️ Safety Inspection Done')">+ Safety Inspection</span>
          <span class="badge bg-white text-dark border cursor-pointer" onclick="appendSiteNotePreset('${loc}', '👷 Concrete Pouring')">+ Concrete Pouring</span>
        </div>
        <textarea id="siteNotesText_${loc}" class="form-control mb-2" rows="3" 
                  placeholder="Type site notes, daily progress, weather, or supplier deliveries..."
                  oninput="updateSiteRemarks('${loc}', this.value)"
                  onchange="updateSiteRemarks('${loc}', this.value)">${locData.remarks || ''}</textarea>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted" id="siteNotesSavedStatus_${loc}">${locData.remarks ? 'Notes saved for this site.' : 'No site notes recorded yet.'}</small>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="openSiteNotesModal('${loc}')">
              <i class="bi bi-arrows-fullscreen me-1"></i>Full Modal
            </button>
            <button type="button" class="btn btn-dark btn-sm fw-bold px-3" onclick="saveSiteNotesDirect('${loc}')">
              <i class="bi bi-save me-1"></i>Save Site Notes
            </button>
          </div>
        </div>
      </div>

      ${(!isNotesActive && locData.remarks) ? `
        <div class="alert alert-secondary py-2 px-3 mb-3 d-flex justify-content-between align-items-center shadow-sm" style="font-size: 0.82rem;">
          <div>
            <strong class="text-danger"><i class="bi bi-journal-text me-1"></i>Site Notes:</strong>
            <span id="siteNotesPreviewText_${loc}" class="text-dark">${(locData.remarks || '').replace(/</g, '&lt;')}</span>
          </div>
          <button class="btn btn-sm btn-link p-0 text-danger fw-bold text-decoration-none ms-2" onclick="toggleSiteNotes('${loc}')">Edit Notes</button>
        </div>
      ` : ''}

      <div class="table-responsive"> 
        <table class="table table-bordered table-hover align-middle mb-2"> 
          <thead class="table-dark"> 
            <tr> 
              <th class="align-middle" style="min-width: 170px;">WORKER NAME</th> 
              <th class="text-center align-middle col-role" style="width: 80px;">ROLE</th> 
              ${headerDayCols} 
              <th class="text-center align-middle col-days-total" style="width: 70px;">DAYS</th> 
              <th class="text-center align-middle col-ot-total" style="width: 60px;">OT</th> 
              <th class="text-center align-middle col-worker-bale" style="width: 100px;">BALE (₱)</th> 
              <th class="text-center align-middle col-worker-remarks" style="min-width: 140px;">REMARKS</th> 
            </tr> 
          </thead> 
          <tbody> 
            ${rows || `<tr><td colspan="${dates.length + 6}" class="text-center p-3 text-muted">No workers recorded for this site. Click "Add Worker" to add one.</td></tr>`} 
          </tbody> 
          <tfoot class="table-secondary fw-bold"> 
            <tr> 
              <td colspan="2" class="text-end">SUBTOTALS:</td> 
              <td colspan="6" class="text-center text-muted small">Shift Tallies Above</td> 
              <td class="text-center text-dark fs-6">${siteTotalDays.toFixed(1)}${siteTotalHourlyHours > 0 ? ` (+${siteTotalHourlyHours}h)` : ''}</td> 
              <td class="text-center text-danger fs-6">${siteTotalOT}h</td> 
              <td class="text-end text-danger fs-6">₱${siteTotalWorkerBale.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td> 
              <td class="text-center small text-muted">Worker Remarks</td>
            </tr> 
          </tfoot> 
        </table> 
      </div> 

      <div class="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2 pt-2 border-top"> 
        <div class="d-flex align-items-center gap-2"> 
          <span class="badge bg-secondary">${workers.length} Workers at Site</span> 
          ${selectedRolesFilter.length > 0 ? `<span class="badge bg-danger">Filtered: ${selectedRolesFilter.join(', ')}</span>` : ''} 
        </div> 
        <div class="d-flex align-items-center gap-3"> 
          <div class="d-flex align-items-center gap-2"> 
            <label class="fw-bold small text-dark mb-0">Project Bale (₱):</label> 
            <input type="number" step="any" class="form-control form-control-sm text-end fw-bold" style="width: 110px;" 
                   value="${locData.baleValue || ''}" placeholder="0" 
                   onchange="updateLocationBale(this.value)"> 
          </div> 
        </div> 
      </div> 
    </div> 
  `; 
} 

function renderViewAllHTML(dates, isAdm) { 
  const delSites = getDeletedSites(); 
  const sites = Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase())); 
  if (sites.length === 0) { 
    return `<div class="alert alert-info">No project sites configured yet. Add your first site above.</div>`; 
  } 

  return sites.map(loc => renderSingleLocationHTML(loc, dates, isAdm)).join(''); 
}

// --- ATTENDANCE & SHIFT UPDATES ---
function updateAttendance(workerId, dayKey, value) { 
  for (let loc in currentActiveData.locations) { 
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === workerId); 
    if (w) { 
      if (!w.attendance) w.attendance = {}; 
      w.attendance[dayKey] = value; 
      if (value !== '1.0' && value !== '1' && value !== '0.5') { 
        if (w.ot) w.ot[dayKey] = 0; 
      } 
      w.updatedAt = Date.now(); 
      saveStore(); 
      renderUI(); 
      return; 
    } 
  } 
} 

function updateOT(workerId, dayKey, value) { 
  for (let loc in currentActiveData.locations) { 
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === workerId); 
    if (w) { 
      if (!w.ot) w.ot = {}; 
      w.ot[dayKey] = parseInt(value, 10) || 0; 
      w.updatedAt = Date.now(); 
      saveStore(); 
      renderUI(); 
      return; 
    } 
  } 
} 

function updateWorkerBale(workerId, value) { 
  for (let loc in currentActiveData.locations) { 
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === workerId); 
    if (w) { 
      w.baleValue = parseFloat(value) || 0; 
      w.updatedAt = Date.now(); 
      saveStore(); 
      renderUI(); 
      return; 
    } 
  } 
} 

function updateLocationBale(value) { 
  if (currentLocation !== "VIEW_ALL" && currentActiveData.locations[currentLocation]) { 
    currentActiveData.locations[currentLocation].baleValue = parseFloat(value) || 0; 
    saveStore(); 
    renderUI(); 
  } 
} 

function toggleSiteStatus(loc) { 
  if (currentActiveData.locations[loc]) { 
    const current = !!currentActiveData.locations[loc].isDone; 
    currentActiveData.locations[loc].isDone = !current; 
    saveStore(); 
    renderLocationDropdown(); 
    renderUI(); 
  } 
} 

// --- CUSTOM HOURS MODAL ---
function promptCustomHours(workerId, dayKey) {
  activeCustomHourWorker = workerId;
  activeCustomHourDayKey = dayKey;

  let workerName = "Worker";
  for (let loc in currentActiveData.locations) {
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === workerId);
    if (w) { workerName = w.name; break; }
  }

  const nameEl = document.getElementById("customHoursWorkerName");
  const dayEl = document.getElementById("customHoursDayBadge");
  const inputEl = (document.getElementById("customHourNumberInput") || document.getElementById("customHourInputNumber"));

  if (nameEl) nameEl.innerText = workerName;
  if (dayEl) dayEl.innerText = DAY_NAMES[dayKey] || dayKey;
  if (inputEl) inputEl.value = "4";

  const modalEl = document.getElementById("customHoursModal");
  if (modalEl && window.bootstrap) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  }
}

function setCustomHourInputValue(val) {
  const inputEl = (document.getElementById("customHourNumberInput") || document.getElementById("customHourInputNumber"));
  if (inputEl) inputEl.value = val;
}

function confirmCustomHoursEntry() {
  const inputEl = (document.getElementById("customHourNumberInput") || document.getElementById("customHourInputNumber"));
  if (!inputEl) return;
  const num = parseFloat(inputEl.value);

  if (isNaN(num) || num <= 0 || num > 12) {
    alert("Please enter valid hours between 1 and 12.");
    return;
  }

  const formattedVal = `${num}h`;
  if (activeCustomHourWorker && activeCustomHourDayKey) {
    updateAttendance(activeCustomHourWorker, activeCustomHourDayKey, formattedVal);
    const focusModal = document.getElementById("focusModeModal");
    if (focusModal && (focusModal.classList.contains("show") || focusModal.style.display === "block")) {
      renderFocusWorker();
    }
  }

  const modalEl = document.getElementById("customHoursModal");
  if (modalEl && window.bootstrap) {
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
  }
}

// --- FOCUS MODE (1-BY-1 SHIFT ENTRY) ---
// --- SINGLE WORKER FOCUS MODE ---
function startFocusMode(targetWorkerId = null) {
  if (currentLocation === "VIEW_ALL") {
    alert("Please select a specific project site first to use Focus Mode.");
    return;
  }
  const locData = currentActiveData.locations[currentLocation];
  if (!locData || !locData.workers || locData.workers.length === 0) {
    alert("No workers recorded at this site to log attendance.");
    return;
  }

  let workers = locData.workers;
  if (selectedRolesFilter.length > 0) {
    workers = workers.filter(w => selectedRolesFilter.includes(w.role));
  }

  if (workers.length === 0) {
    alert("No workers match the selected role filter.");
    return;
  }

  focusWorkerList = workers;
  if (targetWorkerId) {
    const idx = focusWorkerList.findIndex(w => w.id === targetWorkerId);
    focusWorkerIndex = idx >= 0 ? idx : 0;
  } else {
    focusWorkerIndex = 0;
  }

  isFocusRateEditorOpen = false;
  renderFocusWorker();

  const modalEl = document.getElementById("focusModeModal");
  if (modalEl && window.bootstrap) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  }
}

function openFocusCustomHours(dayKey) {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;
  activeCustomHourWorker = w.id;
  activeCustomHourDayKey = dayKey;
  const inputEl = (document.getElementById("customHourNumberInput") || document.getElementById("customHourInputNumber"));
  if (inputEl) inputEl.value = "";
  const modalEl = document.getElementById("customHoursModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function updateFocusWorkerRemarks(val) {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;
  w.remarks = val || "";
  saveStore();
  renderUI();
}

function getWorkerLocation(workerId) {
  if (currentLocation && currentLocation !== "VIEW_ALL" && currentActiveData?.locations?.[currentLocation]?.workers?.some(item => item.id === workerId)) {
    return currentLocation;
  }
  for (let loc in currentActiveData?.locations || {}) {
    if ((currentActiveData.locations[loc].workers || []).some(item => item.id === workerId)) {
      return loc;
    }
  }
  return currentLocation || "SAN JOSEF";
}

let isFocusRateEditorOpen = false;

function toggleFocusRateEditor() {
  isFocusRateEditorOpen = !isFocusRateEditorOpen;
  renderFocusWorker();
}

function onFocusDailyRateInput(val) {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;
  const num = parseFloat(val) || 0;
  const targetLoc = getWorkerLocation(w.id);
  saveWorkerRate(targetLoc, w.id, num);

  // Auto-calculate hourly rate based on standard 8-hour workday
  const autoHour = Math.round((num / 8.0) * 100) / 100;
  const hourInput = document.getElementById("focusHourlyRateInput");
  if (hourInput) {
    hourInput.value = autoHour;
  }
  saveWorkerHourlyRate(targetLoc, w.id, autoHour);

  updateFocusRateHeaderAndEst(w, num, autoHour);
  flashFocusRateStatus(`✓ Saved: ₱${num.toFixed(2)}/day, ₱${autoHour.toFixed(2)}/hr`);
}

function onFocusHourlyRateInput(val) {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;
  const num = parseFloat(val) || 0;
  const targetLoc = getWorkerLocation(w.id);
  saveWorkerHourlyRate(targetLoc, w.id, num);

  const dailyRate = getWorkerRate(w.id, w.role);
  updateFocusRateHeaderAndEst(w, dailyRate, num);
  flashFocusRateStatus(`✓ Custom hourly rate saved: ₱${num.toFixed(2)}/hr`);
}

function setFocusRatePreset(daily, hourly) {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;
  const targetLoc = getWorkerLocation(w.id);
  saveWorkerRate(targetLoc, w.id, daily);
  saveWorkerHourlyRate(targetLoc, w.id, hourly);

  const dayInput = document.getElementById("focusDailyRateInput");
  const hourInput = document.getElementById("focusHourlyRateInput");
  if (dayInput) dayInput.value = daily;
  if (hourInput) hourInput.value = hourly;

  updateFocusRateHeaderAndEst(w, daily, hourly);
  flashFocusRateStatus(`✓ Preset applied: ₱${daily}/day, ₱${hourly}/hr`);
}

function updateFocusRateHeaderAndEst(w, dailyRate, hourlyRate) {
  const otHourlyRate = hourlyRate * 1.0;
  const otDisplay = document.getElementById("focusOtRateDisplay");
  if (otDisplay) {
    otDisplay.innerText = `₱${otHourlyRate.toFixed(2)}/hr`;
  }
  const headerBadge = document.getElementById("focusRateHeaderBadge");
  if (headerBadge) {
    headerBadge.innerHTML = `<i class="bi bi-tag-fill text-danger me-1"></i>Rate: <strong>₱${dailyRate.toFixed(2)}</strong>/day &bull; <strong>₱${hourlyRate.toFixed(2)}</strong>/hr`;
  }
  const m = getWorkerMetrics(w);
  const estWage = (m.daysWorked * dailyRate) + (m.hourlyHours * hourlyRate) + (m.totalOT * otHourlyRate) - (w.baleValue || 0);
  const netBadge = document.getElementById("focusEstNetBadge");
  if (netBadge) {
    netBadge.innerHTML = `Est. Net: <strong>₱${Math.max(0, estWage).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>`;
  }
  renderUI(); // sync underlying timesheet / payroll tables in background
}

function flashFocusRateStatus(msg) {
  const statusEl = document.getElementById("focusRateSaveStatus");
  if (statusEl) {
    statusEl.innerText = msg;
    statusEl.className = "text-success fw-bold";
    setTimeout(() => {
      if (statusEl) {
        statusEl.innerText = "✓ Rates synced with weekly payroll records.";
        statusEl.className = "text-muted";
      }
    }, 2500);
  }
}

function jumpToFocusWorker(idx) {
  const target = parseInt(idx, 10);
  if (!isNaN(target) && target >= 0 && target < focusWorkerList.length) {
    focusWorkerIndex = target;
    renderFocusWorker();
  }
}

function renderFocusWorker() {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;

  const total = focusWorkerList.length;
  const progressBadge = document.getElementById("focusProgressBadge");
  if (progressBadge) progressBadge.innerText = "Worker " + (focusWorkerIndex + 1) + " of " + total;

  const prevBtn = document.getElementById("focusPrevBtn");
  const nextBtn = document.getElementById("focusNextBtn");
  if (prevBtn) prevBtn.disabled = (focusWorkerIndex === 0);
  if (nextBtn) nextBtn.disabled = (focusWorkerIndex === total - 1);

  const dates = getCalculatedDates();
  const m = getWorkerMetrics(w);
  const targetLoc = getWorkerLocation(w.id);
  const dailyRate = getWorkerRate(w.id, w.role);
  const hourlyRate = getWorkerHourlyRate(targetLoc, w.id, dailyRate);
  const otHourlyRate = hourlyRate * 1.0;
  const estWage = (m.daysWorked * dailyRate) + (m.hourlyHours * hourlyRate) + (m.totalOT * otHourlyRate) - (w.baleValue || 0);

  const focusBody = document.getElementById("focusModeBody");
  if (!focusBody) return;

  // Dropdown options to jump directly to any worker
  let workerOptionsHtml = "";
  focusWorkerList.forEach((worker, i) => {
    workerOptionsHtml += `<option value="${i}" ${i === focusWorkerIndex ? 'selected' : ''}>${i + 1}. ${worker.name} (${worker.role})</option>`;
  });

  // Render each day using .focus-day-item
  let daysCardsHtml = "";
  dates.forEach(d => {
    const val = (w.attendance && w.attendance[d.key]) || '';
    const otVal = (w.ot && w.ot[d.key]) || 0;

    let statusBadge = '<span class="badge bg-light text-muted border">NOT LOGGED</span>';
    if (val === '1.0' || val === '1') {
      statusBadge = '<span class="badge bg-success"><i class="bi bi-check-circle-fill me-1"></i>FULL DAY (1.0)</span>';
    } else if (val === '0.5') {
      statusBadge = '<span class="badge bg-primary"><i class="bi bi-circle-half me-1"></i>HALF DAY (0.5)</span>';
    } else if (String(val).endsWith('h')) {
      statusBadge = '<span class="badge text-white" style="background-color: #6f42c1;"><i class="bi bi-clock-history me-1"></i>' + val + '</span>';
    } else if (val === 'absent') {
      statusBadge = '<span class="badge bg-danger"><i class="bi bi-x-circle-fill me-1"></i>ABSENT</span>';
    } else if (val === 'sick') {
      statusBadge = '<span class="badge bg-warning text-dark"><i class="bi bi-bandaid me-1"></i>SICK LEAVE</span>';
    } else if (val === 'emergency') {
      statusBadge = '<span class="badge text-white" style="background-color: #fd7e14;"><i class="bi bi-exclamation-triangle-fill me-1"></i>EMERGENCY</span>';
    }

    daysCardsHtml += `
      <div class="focus-day-item p-3 mb-3 shadow-sm border">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-1">
          <div>
            <span class="badge bg-dark fw-bold me-2 fs-6">${d.key}</span>
            <span class="fw-bold text-dark">${d.monthStr} ${d.dayNum}</span>
            <span class="text-muted small ms-1">(${d.fullDateStr})</span>
          </div>
          <div>${statusBadge}</div>
        </div>

        <div class="row g-2 align-items-center">
          <!-- LARGE TOUCH BUTTONS: FULL, HALF, HOURS, ABSENT, SICK, EMERGENCY -->
          <div class="col-12 col-xl-8">
            <div class="row g-1">
              <div class="col-4 col-sm-2">
                <button type="button" class="btn w-100 ${val === '1.0' || val === '1' ? 'btn-success fw-bold text-white shadow-sm' : 'btn-outline-success'} py-2" style="font-size: 0.85rem; min-height: 46px;" onclick="setFocusAttendance('${d.key}', '1.0')" title="Full Day (1.0)">
                  <i class="bi bi-check-circle d-block d-sm-inline me-sm-1"></i>Full
                </button>
              </div>
              <div class="col-4 col-sm-2">
                <button type="button" class="btn w-100 ${val === '0.5' ? 'btn-primary fw-bold text-white shadow-sm' : 'btn-outline-primary'} py-2" style="font-size: 0.85rem; min-height: 46px;" onclick="setFocusAttendance('${d.key}', '0.5')" title="Half Day (0.5)">
                  <i class="bi bi-circle-half d-block d-sm-inline me-sm-1"></i>Half
                </button>
              </div>
              <div class="col-4 col-sm-2">
                <button type="button" class="btn w-100 ${String(val).endsWith('h') ? 'btn-dark fw-bold text-white shadow-sm' : 'btn-outline-dark'} py-2" style="font-size: 0.85rem; min-height: 46px; ${String(val).endsWith('h') ? 'background-color: #6f42c1 !important; border-color: #6f42c1 !important;' : ''}" onclick="openFocusCustomHours('${d.key}')" title="Custom Shift Hours">
                  <i class="bi bi-clock-history d-block d-sm-inline me-sm-1"></i>${String(val).endsWith('h') ? val : 'Hours'}
                </button>
              </div>
              <div class="col-4 col-sm-2">
                <button type="button" class="btn w-100 ${val === 'absent' ? 'btn-danger fw-bold text-white shadow-sm' : 'btn-outline-danger'} py-2" style="font-size: 0.85rem; min-height: 46px;" onclick="setFocusAttendance('${d.key}', 'absent')" title="Absent">
                  <i class="bi bi-x-circle d-block d-sm-inline me-sm-1"></i>Abs
                </button>
              </div>
              <div class="col-4 col-sm-2">
                <button type="button" class="btn w-100 ${val === 'sick' ? 'btn-warning fw-bold text-dark shadow-sm border-warning' : 'btn-outline-warning text-dark'} py-2" style="font-size: 0.85rem; min-height: 46px;" onclick="setFocusAttendance('${d.key}', 'sick')" title="Sick Leave">
                  <i class="bi bi-bandaid d-block d-sm-inline me-sm-1"></i>Sick
                </button>
              </div>
              <div class="col-4 col-sm-2">
                <button type="button" class="btn w-100 ${val === 'emergency' ? 'text-white fw-bold shadow-sm' : 'text-dark border'}" style="font-size: 0.82rem; min-height: 46px; ${val === 'emergency' ? 'background-color: #fd7e14 !important; border-color: #fd7e14 !important;' : 'border-color: #fd7e14 !important; color: #d65b00 !important;'}" onclick="setFocusAttendance('${d.key}', 'emergency')" title="Emergency Leave">
                  <i class="bi bi-exclamation-triangle d-block d-sm-inline me-sm-1"></i>Emg
                </button>
              </div>
            </div>
          </div>

          <!-- OVERTIME SELECTOR -->
          <div class="col-12 col-xl-4">
            <div class="input-group shadow-sm">
              <span class="input-group-text fw-bold bg-white text-danger border-danger">
                <i class="bi bi-stopwatch me-1"></i>OT:
              </span>
              <select class="form-select fw-bold border-danger text-center py-2" style="min-height: 46px;" onchange="setFocusOT('${d.key}', this.value)">
                <option value="0" ${otVal === 0 ? 'selected' : ''}>No Overtime</option>
                <option value="1" ${otVal === 1 ? 'selected' : ''}>+1 hr OT</option>
                <option value="2" ${otVal === 2 ? 'selected' : ''}>+2 hrs OT</option>
                <option value="3" ${otVal === 3 ? 'selected' : ''}>+3 hrs OT</option>
                <option value="4" ${otVal === 4 ? 'selected' : ''}>+4 hrs OT</option>
                <option value="5" ${otVal === 5 ? 'selected' : ''}>+5 hrs OT</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  focusBody.innerHTML = `
    <!-- WORKER HEADER WITH QUICK JUMP & REAL-TIME SUMMARY -->
    <div class="card p-3 mb-3 bg-white border-2 border-danger shadow-sm">
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
        <div>
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <h4 class="fw-bold mb-0 text-danger text-uppercase">${w.name}</h4>
            <span class="badge bg-dark fw-bold">${w.role}</span>
            <span class="badge bg-secondary">${targetLoc}</span>
          </div>
          <div class="d-flex align-items-center gap-2 mt-1 flex-wrap">
            <span class="badge bg-light text-dark border px-2 py-1" id="focusRateHeaderBadge">
              <i class="bi bi-tag-fill text-danger me-1"></i>Standard Rate: <strong>₱${dailyRate.toFixed(2)}</strong>/day &bull; <strong>₱${hourlyRate.toFixed(2)}</strong>/hr
            </span>
            <button type="button" class="btn btn-sm ${isFocusRateEditorOpen ? 'btn-danger text-white' : 'btn-outline-danger'} fw-bold py-0 px-2" onclick="toggleFocusRateEditor()" title="Modify standard day and hour rate for this worker">
              <i class="bi ${isFocusRateEditorOpen ? 'bi-chevron-up' : 'bi-pencil-square'} me-1"></i>${isFocusRateEditorOpen ? 'Close Rates' : 'Modify Rates'}
            </button>
          </div>
        </div>
        <div style="min-width: 220px;">
          <label class="form-label small fw-bold text-muted mb-0">Jump to Worker:</label>
          <select class="form-select form-select-sm fw-bold border-secondary" onchange="jumpToFocusWorker(this.value)">
            ${workerOptionsHtml}
          </select>
        </div>
      </div>

      ${isFocusRateEditorOpen ? `
      <!-- RATE MODIFICATION PANEL IN FOCUS MODE -->
      <div class="card p-3 my-2 bg-light border-danger border shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-2 pb-1 border-bottom flex-wrap gap-1">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-danger"><i class="bi bi-currency-exchange me-1"></i>Modify Wage Rates</span>
            <strong class="text-dark small">${w.name} (${w.role})</strong>
          </div>
          <span class="badge bg-secondary text-white" style="font-size: 0.7rem;">Site: ${targetLoc}</span>
        </div>

        <div class="row g-2 align-items-end mb-2">
          <div class="col-12 col-sm-4">
            <label class="form-label small fw-bold mb-1 text-muted">Daily Rate (₱/day):</label>
            <div class="input-group input-group-sm shadow-xs">
              <span class="input-group-text fw-bold bg-white">₱</span>
              <input type="number" id="focusDailyRateInput" class="form-control fw-bold" 
                     value="${dailyRate}" min="0" step="10" 
                     placeholder="450.00"
                     oninput="onFocusDailyRateInput(this.value)">
            </div>
          </div>
          <div class="col-12 col-sm-4">
            <label class="form-label small fw-bold mb-1 text-muted">Hourly Rate (₱/hr):</label>
            <div class="input-group input-group-sm shadow-xs">
              <span class="input-group-text fw-bold bg-white">₱</span>
              <input type="number" id="focusHourlyRateInput" class="form-control fw-bold" 
                     value="${hourlyRate}" min="0" step="5" 
                     placeholder="56.25"
                     oninput="onFocusHourlyRateInput(this.value)">
            </div>
          </div>
          <div class="col-12 col-sm-4">
            <label class="form-label small fw-bold mb-1 text-muted">OT Rate (1.0x):</label>
            <div class="form-control form-control-sm bg-white fw-bold text-danger text-center shadow-xs" id="focusOtRateDisplay">
              ₱${otHourlyRate.toFixed(2)}/hr
            </div>
          </div>
        </div>

        <!-- QUICK ROLE PRESET CHIPS -->
        <div class="d-flex flex-wrap align-items-center gap-1 mb-2 pt-1">
          <small class="text-muted fw-bold me-1" style="font-size: 0.72rem;">Presets:</small>
          <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size: 0.7rem;" onclick="setFocusRatePreset(800, 100)">FOREMAN (₱800)</button>
          <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size: 0.7rem;" onclick="setFocusRatePreset(650, 81.25)">SKILLED / MASON (₱650)</button>
          <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size: 0.7rem;" onclick="setFocusRatePreset(500, 62.50)">STAY IN (₱500)</button>
          <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size: 0.7rem;" onclick="setFocusRatePreset(450, 56.25)">LABOR (₱450)</button>
        </div>

        <div class="d-flex justify-content-between align-items-center pt-1 border-top">
          <small id="focusRateSaveStatus" class="text-success fw-semibold" style="font-size: 0.72rem;">✓ Rates synced with weekly payroll.</small>
          <button type="button" class="btn btn-dark btn-sm py-0 px-3 fw-bold" onclick="toggleFocusRateEditor()">Done</button>
        </div>
      </div>
      ` : ''}

      <!-- METRICS CHIPS -->
      <div class="d-flex flex-wrap gap-2 pt-2 border-top">
        <span class="badge bg-dark text-white p-2 fs-6">
          <i class="bi bi-calendar-check me-1"></i>Days: <strong>${m.daysWorked.toFixed(1)}</strong>${m.hourlyHours > 0 ? ` (+${m.hourlyHours}h)` : ''}
        </span>
        <span class="badge bg-warning text-dark p-2 fs-6">
          <i class="bi bi-stopwatch me-1"></i>OT: <strong>${m.totalOT} hrs</strong>
        </span>
        <span class="badge bg-danger text-white p-2 fs-6">
          <i class="bi bi-cash-stack me-1"></i>Bale: <strong>₱${w.baleValue || 0}</strong>
        </span>
        <span class="badge bg-success text-white p-2 fs-6 ms-auto" id="focusEstNetBadge">
          Est. Net: <strong>₱${Math.max(0, estWage).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
        </span>
      </div>
    </div>

    <!-- 6-DAY ROSTER CARDS (.focus-day-item) -->
    <div class="mb-3" id="focusDaysListContainer">
      ${daysCardsHtml}
    </div>

    <!-- WORKER CASH ADVANCE & REMARKS -->
    <div class="card p-3 bg-white border shadow-sm">
      <div class="row g-2 align-items-center">
        <div class="col-12 col-md-5">
          <label class="fw-bold small mb-1"><i class="bi bi-cash me-1 text-danger"></i>Cash Advance (Worker Bale ₱):</label>
          <div class="input-group">
            <span class="input-group-text fw-bold">₱</span>
            <input type="number" id="focusBaleInput" class="form-control fw-bold text-end" placeholder="0.00" value="${w.baleValue || ''}" oninput="updateFocusBale(this.value)">
          </div>
        </div>
        <div class="col-12 col-md-7">
          <label class="fw-bold small mb-1"><i class="bi bi-card-text me-1 text-danger"></i>Worker Remarks / Shift Note:</label>
          <input type="text" class="form-control fw-semibold" placeholder="e.g. half day due to rain, transferred from Site B..." value="${w.remarks || ''}" onchange="updateFocusWorkerRemarks(this.value)">
        </div>
      </div>
    </div>
  `;
}


function setFocusAttendance(dayKey, val) {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;
  if (!w.attendance) w.attendance = {};
  w.attendance[dayKey] = (w.attendance[dayKey] === val) ? "" : val;
  if (w.attendance[dayKey] !== "1.0" && w.attendance[dayKey] !== "1" && w.attendance[dayKey] !== "0.5" && !String(w.attendance[dayKey]).endsWith("h")) {
    if (w.ot) w.ot[dayKey] = 0;
  }
  saveStore();
  renderFocusWorker();
  renderUI();
}

function setFocusOT(dayKey, val) {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;
  if (!w.ot) w.ot = {};
  w.ot[dayKey] = parseInt(val, 10) || 0;
  saveStore();
  renderFocusWorker();
  renderUI();
}

function updateFocusBale(val) {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;
  w.baleValue = parseFloat(val) || 0;
  saveStore();
  renderFocusWorker();
  renderUI();
}

function focusNavWorker(step) {
  const target = focusWorkerIndex + step;
  if (target >= 0 && target < focusWorkerList.length) {
    focusWorkerIndex = target;
    renderFocusWorker();
  }
}


function showSearchWorkerModal() {
  const modalEl = document.getElementById("searchWorkerModal");
  if (!modalEl || !window.bootstrap) return;
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  
  const field = document.getElementById("workerSearchField");
  if (field) {
    field.value = "";
    handleWorkerSearchLive("");
  }
  modal.show();
  setTimeout(() => field?.focus(), 300);
}

function handleWorkerSearchLive(query) {
  const container = document.getElementById("searchResultsContainer");
  if (!container) return;

  const cleanQuery = (query || "").trim().toUpperCase();
  const results = [];

  for (let loc in (currentActiveData.locations || {})) {
    const workers = currentActiveData.locations[loc].workers || [];
    workers.forEach(w => {
      if (!cleanQuery || w.name.toUpperCase().includes(cleanQuery) || w.role.toUpperCase().includes(cleanQuery)) {
        results.push({ loc, worker: w });
      }
    });
  }

  if (results.length === 0) {
    container.innerHTML = `<div class="p-3 text-center text-muted">No matching workers found for "${cleanQuery}".</div>`;
    return;
  }

  container.innerHTML = results.slice(0, 50).map(r => `
    <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-2" 
         style="cursor: pointer;" onclick="selectSearchedWorker('${r.loc}', '${r.worker.id}')">
      <div>
        <div class="fw-bold text-dark text-uppercase">${r.worker.name}</div>
        <span class="badge bg-secondary me-1" style="font-size: 0.65rem;">${r.worker.role}</span>
        <span class="badge bg-dark" style="font-size: 0.65rem;"><i class="bi bi-building me-1"></i>${r.loc}</span>
      </div>
      <i class="bi bi-chevron-right text-danger"></i>
    </div>
  `).join('');
}

function selectSearchedWorker(loc, workerId) {
  currentLocation = loc;
  const sel = document.getElementById("locationSelector");
  if (sel) sel.value = loc;

  const modalEl = document.getElementById("searchWorkerModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }

  renderUI();

  setTimeout(() => {
    const row = document.getElementById(`workerRow_${workerId}`);
    if (row) {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      row.style.transition = 'background-color 0.5s';
      row.style.backgroundColor = '#fff3cd';
      setTimeout(() => { row.style.backgroundColor = ''; }, 2500);
    }
  }, 200);
}

// --- ADD WORKER MODAL ---
function showAddWorkerModal(loc = null) {
  const targetLoc = loc || (currentLocation === "VIEW_ALL" ? Object.keys(currentActiveData.locations)[0] : currentLocation);
  if (!targetLoc) {
    alert("Please create a site first before adding workers.");
    return;
  }

  const badge = document.getElementById("modalLocName");
  if (badge) badge.innerText = targetLoc;

  const nameInput = document.getElementById("newWorkerName");
  if (nameInput) nameInput.value = "";

  const modalEl = document.getElementById("addWorkerModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function confirmAddWorker() {
  const targetLoc = document.getElementById("modalLocName")?.innerText || currentLocation;
  const nameInput = document.getElementById("newWorkerName");
  const roleSelect = document.getElementById("newWorkerRole");

  const name = (nameInput?.value || "").trim().toUpperCase();
  const role = roleSelect?.value || "LABOR";

  if (!name) {
    alert("Please enter the worker full name.");
    return;
  }

  if (!currentActiveData.locations[targetLoc]) {
    alert("Target site not found.");
    return;
  }

  const workerId = `w_${targetLoc.substring(0, 3)}_${role.substring(0, 3)}_${Date.now()}`;
  currentActiveData.locations[targetLoc].workers.push({
    id: workerId,
    name: name,
    role: role,
    baleValue: 0,
    notesHistory: [],
    updatedAt: Date.now(),
    attendance: { M: '', T: '', W: '', Th: '', F: '', S: '' },
    ot: { M: 0, T: 0, W: 0, Th: 0, F: 0, S: 0 }
  });

  saveStore();
  renderUI();

  const modalEl = document.getElementById("addWorkerModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

function openAddWorkerModal(loc) {
  showAddWorkerModal(loc);
}

// --- WORKER INDIVIDUAL ANALYTICS & REMARKS MODAL ---
function openWorkerProfileModal(workerId, workerName) {
  activeWorkerForNotes = workerId;
  let targetWorker = null;
  let targetLoc = null;

  for (let loc in currentActiveData.locations) {
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === workerId);
    if (w) { targetWorker = w; targetLoc = loc; break; }
  }

  if (!targetWorker) return;

  const nameEl = document.getElementById("profileWorkerName");
  const roleBadge = document.getElementById("profileWorkerRole");
  const siteBadge = document.getElementById("profileWorkerSite");
  const ratesEl = document.getElementById("profileWorkerRates");
  const statsGrid = document.getElementById("profileWorkerStatsGrid");
  const shiftHeaderRow = document.getElementById("profileShiftHeaderRow");
  const shiftStatusRow = document.getElementById("profileShiftStatusRow");
  const shiftOtRow = document.getElementById("profileShiftOtRow");
  const remarkInput = document.getElementById("profileWorkerRemarkInput");

  const m = getWorkerMetrics(targetWorker);
  const dailyRate = getWorkerRate(targetWorker.id, targetWorker.role);
  const hourlyRate = getWorkerHourlyRate(targetLoc, targetWorker.id, dailyRate);
  const otHourlyRate = hourlyRate * 1.0;

  const regularPay = m.daysWorked * dailyRate;
  const hourlyPay = m.hourlyHours * hourlyRate;
  const otPay = m.totalOT * otHourlyRate;
  const grossPay = regularPay + hourlyPay + otPay;
  const bale = parseFloat(targetWorker.baleValue) || 0;
  const netPay = Math.max(0, grossPay - bale);
  const totalStandardDays = 6;
  const attPct = Math.min(100, Math.round((m.daysWorked / totalStandardDays) * 100));

  if (nameEl) nameEl.innerText = targetWorker.name;
  if (roleBadge) roleBadge.innerText = targetWorker.role;
  if (siteBadge) siteBadge.innerText = targetLoc;
  if (ratesEl) {
    ratesEl.innerHTML = `Daily Rate: <strong class="text-dark">₱${dailyRate.toFixed(2)}</strong> &bull; Hourly Rate: <strong class="text-dark">₱${hourlyRate.toFixed(2)}</strong> &bull; OT Rate (1.0x): <strong class="text-danger">₱${otHourlyRate.toFixed(2)}/hr</strong>`;
  }

  if (statsGrid) {
    statsGrid.innerHTML = `
      <div class="col-6 col-md-4">
        <div class="card p-2 text-center bg-light border shadow-sm h-100">
          <small class="text-muted fw-bold" style="font-size:0.7rem;">ATTENDANCE RATE</small>
          <div class="fs-4 fw-bold ${attPct >= 80 ? 'text-success' : (attPct >= 50 ? 'text-warning' : 'text-danger')}">${attPct}%</div>
          <div class="progress mt-1" style="height: 6px;">
            <div class="progress-bar ${attPct >= 80 ? 'bg-success' : (attPct >= 50 ? 'bg-warning' : 'bg-danger')}" style="width: ${attPct}%;"></div>
          </div>
          <small class="text-muted mt-1" style="font-size:0.7rem;">${m.daysWorked.toFixed(1)} of 6 standard days</small>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <div class="card p-2 text-center bg-light border shadow-sm h-100">
          <small class="text-muted fw-bold" style="font-size:0.7rem;">DAYS WORKED</small>
          <div class="fs-4 fw-bold text-dark">${m.daysWorked.toFixed(1)}</div>
          <small class="text-muted" style="font-size:0.7rem;">${m.hourlyHours > 0 ? `+${m.hourlyHours}h hourly shifts` : 'Full / Half shifts'}</small>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <div class="card p-2 text-center bg-light border shadow-sm h-100">
          <small class="text-muted fw-bold" style="font-size:0.7rem;">OVERTIME (OT)</small>
          <div class="fs-4 fw-bold text-danger">${m.totalOT}h</div>
          <small class="text-danger fw-bold" style="font-size:0.7rem;">+₱${otPay.toFixed(2)} OT Pay</small>
        </div>
      </div>
      <div class="col-6 col-md-6">
        <div class="card p-2 text-center bg-light border shadow-sm h-100">
          <small class="text-muted fw-bold" style="font-size:0.7rem;">BALE (ADVANCE DEDUCTION)</small>
          <div class="fs-4 fw-bold text-danger">₱${bale.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <small class="text-muted" style="font-size:0.7rem;">Deducted from gross</small>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="card p-2 text-center bg-white border-danger border-2 shadow-sm h-100">
          <small class="text-muted fw-bold" style="font-size:0.7rem;">ESTIMATED NET PAYOUT</small>
          <div class="fs-4 fw-bold text-success">₱${netPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <small class="text-muted" style="font-size:0.7rem;">Gross: ₱${grossPay.toFixed(2)} &bull; Deduct Bale: ₱${bale.toFixed(2)}</small>
        </div>
      </div>
    `;
  }

  // 6-day shift breakdown
  const dates = getCalculatedDates();
  if (shiftHeaderRow && shiftStatusRow && shiftOtRow) {
    shiftHeaderRow.innerHTML = dates.map(d => `
      <th class="text-center py-1">
        <span class="fw-bold d-block">${d.key}</span>
        <span class="small text-muted">${d.dayNum}</span>
      </th>
    `).join('');

    shiftStatusRow.innerHTML = dates.map(d => {
      const val = (targetWorker.attendance && targetWorker.attendance[d.key]) || '';
      let badge = '<span class="badge bg-light text-muted border">-</span>';
      if (val === '1.0' || val === '1') {
        badge = '<span class="badge bg-success">Full (1.0)</span>';
      } else if (val === '0.5') {
        badge = '<span class="badge bg-primary">Half (0.5)</span>';
      } else if (String(val).endsWith('h')) {
        badge = `<span class="badge text-white" style="background-color:#6f42c1;">${val}</span>`;
      } else if (val === 'absent') {
        badge = '<span class="badge bg-danger">Absent</span>';
      } else if (val === 'sick') {
        badge = '<span class="badge bg-warning text-dark"><i class="bi bi-bandaid me-1"></i>Sick</span>';
      } else if (val === 'emergency') {
        badge = '<span class="badge text-white" style="background-color:#fd7e14;"><i class="bi bi-exclamation-triangle-fill me-1"></i>Emg</span>';
      }
      return `<td class="py-2">${badge}</td>`;
    }).join('');

    shiftOtRow.innerHTML = dates.map(d => {
      const otVal = (targetWorker.ot && targetWorker.ot[d.key]) || 0;
      return `<td class="py-1 small fw-bold ${otVal > 0 ? 'text-danger' : 'text-muted'}">${otVal > 0 ? `+${otVal}h OT` : '-'}</td>`;
    }).join('');
  }

  if (remarkInput) {
    remarkInput.value = targetWorker.remarks || '';
  }

  renderWorkerNotesList();

  const modalEl = document.getElementById("workerProfileModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function launchFocusForActiveWorker() {
  if (!activeWorkerForNotes) return;
  const modalEl = document.getElementById("workerProfileModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
  startFocusMode(activeWorkerForNotes);
}

function saveWorkerRemarkFromProfile(remark) {
  if (!activeWorkerForNotes) return;
  updateWorkerRemarks(activeWorkerForNotes, remark);
  renderUI();
}

function updateWorkerRemarks(workerId, remark) {
  for (let loc in currentActiveData.locations) {
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === workerId);
    if (w) {
      w.remarks = remark;
      w.updatedAt = Date.now();
      saveStore();
      return;
    }
  }
}

function renderWorkerNotesList() {
  const container = document.getElementById("workerNotesHistoryContainer");
  if (!container || !activeWorkerForNotes) return;

  let targetWorker = null;
  for (let loc in currentActiveData.locations) {
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === activeWorkerForNotes);
    if (w) { targetWorker = w; break; }
  }

  const notes = (targetWorker && targetWorker.notesHistory) || [];
  if (notes.length === 0) {
    container.innerHTML = `<div class="text-muted small p-2">No observations or incident notes recorded for this period yet.</div>`;
    return;
  }

  container.innerHTML = notes.map((n, idx) => `
    <div class="p-2 border rounded bg-light d-flex justify-content-between align-items-center">
      <div>
        <div class="small fw-semibold text-dark">${n.text}</div>
        <small class="text-muted">${n.dateStr || ''}</small>
      </div>
      <button class="btn btn-sm btn-outline-danger p-0 px-2 border-0" onclick="deleteWorkerNote(${idx})">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  `).join('');
}

function addWorkerNote() {
  const inputEl = document.getElementById("newWorkerNoteInput");
  if (!inputEl || !activeWorkerForNotes) return;

  const text = inputEl.value.trim();
  if (!text) return;

  for (let loc in currentActiveData.locations) {
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === activeWorkerForNotes);
    if (w) {
      if (!w.notesHistory) w.notesHistory = [];
      const now = new Date();
      w.notesHistory.push({
        text: text,
        timestamp: Date.now(),
        dateStr: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      });
      saveStore();
      inputEl.value = "";
      renderWorkerNotesList();
      renderUI();
      return;
    }
  }
}

function deleteWorkerNote(idx) {
  for (let loc in currentActiveData.locations) {
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === activeWorkerForNotes);
    if (w && w.notesHistory) {
      w.notesHistory.splice(idx, 1);
      saveStore();
      renderWorkerNotesList();
      renderUI();
      return;
    }
  }
}

// --- SITE NOTES LOGIC ---
let siteNotesVisible = {};

function toggleSiteNotes(loc) {
  siteNotesVisible[loc] = !siteNotesVisible[loc];
  renderUI();
}

function updateSiteRemarks(loc, text) {
  if (currentActiveData.locations[loc]) {
    currentActiveData.locations[loc].remarks = text;
    saveStore();
  }
}

function saveSiteNotesDirect(loc) {
  const textarea = document.getElementById(`siteNotesText_${loc}`);
  if (textarea && currentActiveData.locations[loc]) {
    currentActiveData.locations[loc].remarks = textarea.value;
    saveStore();
    const statusEl = document.getElementById(`siteNotesSavedStatus_${loc}`);
    if (statusEl) {
      statusEl.innerText = "✓ Site notes saved successfully!";
      statusEl.className = "text-success fw-bold small";
      setTimeout(() => {
        if (statusEl) {
          statusEl.innerText = "Notes saved for this site.";
          statusEl.className = "text-muted small";
        }
      }, 3000);
    }
    const previewEl = document.getElementById(`siteNotesPreviewText_${loc}`);
    if (previewEl) {
      previewEl.innerText = textarea.value;
    }
  }
}

function appendSiteNotePreset(loc, presetText) {
  const textarea = document.getElementById(`siteNotesText_${loc}`);
  if (!textarea) return;
  const current = textarea.value.trim();
  const updated = current ? `${current}\n• ${presetText}` : `• ${presetText}`;
  textarea.value = updated;
  updateSiteRemarks(loc, updated);
  const statusEl = document.getElementById(`siteNotesSavedStatus_${loc}`);
  if (statusEl) {
    statusEl.innerText = "✓ Preset added & saved!";
    statusEl.className = "text-success fw-bold small";
    setTimeout(() => {
      if (statusEl) {
        statusEl.innerText = "Notes saved for this site.";
        statusEl.className = "text-muted small";
      }
    }, 2500);
  }
}

let activeSiteForNotesModal = null;

function openSiteNotesModal(loc) {
  activeSiteForNotesModal = loc;
  const locData = currentActiveData.locations[loc];
  const titleEl = document.getElementById("siteNotesModalTitle");
  const textEl = document.getElementById("modalSiteNotesText");
  const statusEl = document.getElementById("modalSiteNotesStatus");

  if (titleEl) titleEl.innerText = loc;
  if (textEl) textEl.value = (locData && locData.remarks) || '';
  if (statusEl) statusEl.innerText = (locData && locData.remarks) ? "Existing notes loaded." : "";

  const modalEl = document.getElementById("siteNotesModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function saveModalSiteNotes() {
  if (!activeSiteForNotesModal) return;
  const textEl = document.getElementById("modalSiteNotesText");
  const text = textEl ? textEl.value : '';
  updateSiteRemarks(activeSiteForNotesModal, text);
  renderUI();
  const modalEl = document.getElementById("siteNotesModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

function appendModalSiteNotePreset(presetText) {
  const textEl = document.getElementById("modalSiteNotesText");
  if (!textEl) return;
  const current = textEl.value.trim();
  textEl.value = current ? `${current}\n• ${presetText}` : `• ${presetText}`;
}

// --- RENAME WORKER MODAL ---
function openRenameWorkerModal(workerId) {
  activeWorkerForRename = workerId;
  let targetWorker = null;

  for (let loc in currentActiveData.locations) {
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === workerId);
    if (w) { targetWorker = w; break; }
  }

  if (!targetWorker) return;

  const nameInput = document.getElementById("renameWorkerNameInput");
  const roleInput = document.getElementById("renameWorkerRoleInput");

  if (nameInput) nameInput.value = targetWorker.name;
  if (roleInput) roleInput.value = targetWorker.role;

  const modalEl = document.getElementById("renameWorkerModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function confirmRenameWorker() {
  if (!activeWorkerForRename) return;
  const name = (document.getElementById("renameWorkerNameInput")?.value || "").trim().toUpperCase();
  const role = document.getElementById("renameWorkerRoleInput")?.value || "LABOR";

  if (!name) {
    alert("Worker name cannot be empty.");
    return;
  }

  for (let loc in currentActiveData.locations) {
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === activeWorkerForRename);
    if (w) {
      w.name = name;
      w.role = role;
      w.updatedAt = Date.now();
      saveStore();
      renderUI();
      break;
    }
  }

  const modalEl = document.getElementById("renameWorkerModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

// --- CREATE STAFF ACCOUNT MODAL ---
function showCreateAccountModal() {
  if (!isAdmin()) {
    alert("Administrator permission required to manage staff accounts.");
    return;
  }

  const userField = document.getElementById("newStaffUsername");
  const passField = document.getElementById("newStaffPassword");
  const alertEl = document.getElementById("createAccountAlert");

  if (userField) userField.value = "";
  if (passField) passField.value = "";
  if (alertEl) alertEl.classList.add("d-none");

  renderStaffAccountsList();

  const modalEl = document.getElementById("createAccountModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function renderStaffAccountsList() {
  const container = document.getElementById("existingStaffList");
  if (!container) return;

  const accounts = getStaffAccounts();
  if (accounts.length === 0) {
    container.innerHTML = `<div class="text-muted small">No secondary staff accounts registered yet.</div>`;
    return;
  }

  container.innerHTML = accounts.map((acc, idx) => `
    <div class="d-flex justify-content-between align-items-center p-2 border rounded bg-white">
      <div>
        <strong class="text-dark"><i class="bi bi-person-badge text-danger me-1"></i>${acc.username}</strong>
        <span class="badge bg-secondary ms-1">Staff</span>
      </div>
      <button class="btn btn-sm btn-outline-danger p-0 px-2" onclick="deleteStaffAccount(${idx})">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  `).join('');
}

function confirmCreateStaffAccount() {
  const u = (document.getElementById("newStaffUsername")?.value || "").trim();
  const p = (document.getElementById("newStaffPassword")?.value || "").trim();
  const alertEl = document.getElementById("createAccountAlert");

  if (!u || !p) {
    if (alertEl) {
      alertEl.innerText = "Please provide both Username and Password.";
      alertEl.classList.remove("d-none");
    }
    return;
  }

  if (u.toLowerCase() === "admin") {
    if (alertEl) {
      alertEl.innerText = "Cannot create account with reserved name 'Admin'.";
      alertEl.classList.remove("d-none");
    }
    return;
  }

  const accounts = getStaffAccounts();
  if (accounts.some(a => a.username.toLowerCase() === u.toLowerCase())) {
    if (alertEl) {
      alertEl.innerText = "An account with this username already exists.";
      alertEl.classList.remove("d-none");
    }
    return;
  }

  accounts.push({ username: u, password: p, createdAt: Date.now() });
  saveStaffAccounts(accounts);

  if (alertEl) {
    alertEl.className = "alert alert-success py-2 small";
    alertEl.innerText = `Staff account '${u}' created successfully!`;
    alertEl.classList.remove("d-none");
  }

  document.getElementById("newStaffUsername").value = "";
  document.getElementById("newStaffPassword").value = "";
  renderStaffAccountsList();
}

function deleteStaffAccount(idx) {
  if (confirm("Permanently delete this staff account?")) {
    const accounts = getStaffAccounts();
    accounts.splice(idx, 1);
    saveStaffAccounts(accounts);
    renderStaffAccountsList();
  }
}

// --- CREATE PROJECT SITE MODAL ---
function showCreateProjectModal() {
  if (!isAdmin()) {
    alert("Administrator permission required to create project sites.");
    return;
  }
  const inputEl = document.getElementById("newProjectName");
  if (inputEl) inputEl.value = "";

  const modalEl = document.getElementById("createProjectModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function confirmCreateProject() {
  const inputEl = document.getElementById("newProjectName");
  const name = (inputEl?.value || "").trim().toUpperCase();

  if (!name) {
    alert("Please enter a valid project location name.");
    return;
  }

  if (currentActiveData.locations[name]) {
    alert(`Site "${name}" already exists.`);
    return;
  }

  currentActiveData.locations[name] = {
    baleValue: 0,
    isDone: false,
    siteRemarksHistory: [],
    updatedAt: Date.now(),
    workers: []
  };

  currentLocation = name;
  saveStore();
  renderLocationDropdown();
  renderUI();

  const modalEl = document.getElementById("createProjectModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

// --- DAILY WAGE PAYROLL ENGINE ---
function getWorkerHourlyRate(loc, workerId, dailyRate) {
  if (payrollDB[currentDate] && payrollDB[currentDate][loc] && payrollDB[currentDate][loc][workerId] && payrollDB[currentDate][loc][workerId].hourlyRate) {
    return payrollDB[currentDate][loc][workerId].hourlyRate;
  }
  return Math.round((dailyRate || 450) / 8.0);
}

function getWorkerRate(workerId, role) {
  const currentWeekRates = payrollDB[currentDate] || {};
  for (let loc in currentWeekRates) {
    if (currentWeekRates[loc] && currentWeekRates[loc][workerId]) {
      return currentWeekRates[loc][workerId].dailyRate || (DEFAULT_ROLE_DAY_RATES[role] || 450);
    }
  }
  return DEFAULT_ROLE_DAY_RATES[role] || 450;
}

function saveWorkerRate(loc, workerId, rate) {
  if (!payrollDB[currentDate]) payrollDB[currentDate] = {};
  if (!payrollDB[currentDate][loc]) payrollDB[currentDate][loc] = {};
  if (!payrollDB[currentDate][loc][workerId]) payrollDB[currentDate][loc][workerId] = {};
  payrollDB[currentDate][loc][workerId].dailyRate = parseFloat(rate) || 0;
  safeStorageSet(PAYROLL_STORAGE_KEY, JSON.stringify(payrollDB));
}

function saveWorkerHourlyRate(loc, workerId, rate) {
  if (!payrollDB[currentDate]) payrollDB[currentDate] = {};
  if (!payrollDB[currentDate][loc]) payrollDB[currentDate][loc] = {};
  if (!payrollDB[currentDate][loc][workerId]) payrollDB[currentDate][loc][workerId] = {};
  payrollDB[currentDate][loc][workerId].hourlyRate = parseFloat(rate) || 0;
  safeStorageSet(PAYROLL_STORAGE_KEY, JSON.stringify(payrollDB));
}

function openDailyWagePayrollModal() {
  const modalEl = document.getElementById("dailyWagePayrollModal");
  if (!modalEl || !window.bootstrap) return;

  const locBadge = document.getElementById("payrollLocationBadge");
  if (locBadge) locBadge.innerText = currentLocation === "VIEW_ALL" ? "ALL SITES" : currentLocation;

  const dates = getCalculatedDates();
  const dateRangeStr = (dates.length > 0) ? `${dates[0].monthStr} ${dates[0].dayNum} - ${dates[dates.length - 1].monthStr} ${dates[dates.length - 1].dayNum}` : currentDate;
  const periodBadge = document.getElementById("payrollPeriodBadge");
  if (periodBadge) periodBadge.innerText = dateRangeStr;

  renderPayrollTable();
  bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

function renderPayrollTable() {
  const tbody = document.getElementById("payrollTableBody");
  const tfoot = document.getElementById("payrollTableFooter");
  if (!tbody || !tfoot) return;

  const delSites = getDeletedSites();
  let sitesToRender = (currentLocation === "VIEW_ALL") 
    ? Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase()))
    : [currentLocation];

  let totalDays = 0;
  let totalHourlyHours = 0;
  let totalOTHours = 0;
  let totalOTPay = 0;
  let totalAmountPaid = 0;
  let totalSubtotal = 0;
  let totalBale = 0;

  let rowsHtml = '';

  sitesToRender.forEach(loc => {
    const locData = currentActiveData.locations[loc];
    if (!locData) return;

    let workers = locData.workers || [];
    if (selectedRolesFilter.length > 0) {
      workers = workers.filter(w => selectedRolesFilter.includes(w.role));
    }

    if (currentLocation === "VIEW_ALL" && workers.length > 0) {
      rowsHtml += `
        <tr class="table-dark">
          <td colspan="11" class="text-start ps-3 fw-bold text-uppercase">
            <i class="bi bi-building text-danger me-2"></i>${loc}
          </td>
        </tr>
      `;
    }

    workers.forEach(w => {
      const m = getWorkerMetrics(w);
      const dailyRate = getWorkerRate(w.id, w.role);
      const hourlyRate = getWorkerHourlyRate(loc, w.id, dailyRate);
      const otHourlyRate = hourlyRate * 1.0;

      const regularDaysPay = m.daysWorked * dailyRate;
      const hourlyPay = m.hourlyHours * hourlyRate;
      const otPay = m.totalOT * otHourlyRate;
      const gross = regularDaysPay + hourlyPay + otPay;
      const baleDeduction = parseFloat(w.baleValue) || 0;
      const net = Math.max(0, gross - baleDeduction);

      totalDays += m.daysWorked;
      totalHourlyHours += m.hourlyHours;
      totalOTHours += m.totalOT;
      totalOTPay += otPay;
      totalSubtotal += gross;
      totalBale += baleDeduction;
      totalAmountPaid += net;

      const safePayrollWorkerName = (w.name || '').replace(/ /g, '&nbsp;');

      rowsHtml += `
        <tr>
          <td class="text-start ps-2 fw-bold text-uppercase text-nowrap">${safePayrollWorkerName}</td>
          <td class="text-center fw-bold text-muted small">${w.role}</td>
          <td class="text-center fw-bold">${m.daysWorked > 0 ? m.daysWorked.toFixed(1) : '-'}</td>
          <td class="text-center fw-bold text-secondary">${m.hourlyHours > 0 ? `${m.hourlyHours}h` : '-'}</td>
          <td class="text-center fw-bold text-danger">${m.totalOT > 0 ? `${m.totalOT}h` : '-'}</td>
          <td class="text-center p-1">
            <input type="number" step="any" class="form-control form-control-sm text-end fw-bold px-1" 
                   value="${dailyRate}" style="max-width: 90px; margin: 0 auto;"
                   onchange="saveWorkerRate('${loc}', '${w.id}', this.value); renderPayrollTable();">
          </td>
          <td class="text-center p-1">
            <input type="number" step="any" class="form-control form-control-sm text-end fw-bold px-1" 
                   value="${hourlyRate}" style="max-width: 80px; margin: 0 auto;"
                   onchange="saveWorkerHourlyRate('${loc}', '${w.id}', this.value); renderPayrollTable();">
          </td>
          <td class="text-end fw-bold text-danger pe-2">₱${otPay.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
          <td class="text-end fw-bold bg-danger text-white pe-2">₱${net.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
          <td class="text-center text-muted" style="min-width: 100px; height: 32px;"></td>
          <td class="text-center small text-muted">
            ${w.remarks ? `<span class="fw-bold text-dark">${(w.remarks).replace(/</g, '&lt;')}</span>` : ''}
            ${baleDeduction > 0 ? `<span class="text-danger ${w.remarks ? 'd-block' : ''}">(Bale: ₱${baleDeduction})</span>` : (!w.remarks ? '-' : '')}
          </td>
        </tr>
      `;
    });
  });

  tbody.innerHTML = rowsHtml || `<tr><td colspan="11" class="p-3 text-muted">No workers found.</td></tr>`;

  tfoot.innerHTML = `
    <tr class="table-dark fw-bold" style="border-top: 2px solid #d11a2a;">
      <td colspan="2" class="text-end text-white">PAYROLL TOTALS:</td>
      <td class="text-center text-white">${totalDays.toFixed(1)}</td>
      <td class="text-center text-white">${totalHourlyHours}h</td>
      <td class="text-center text-warning">${totalOTHours}h</td>
      <td colspan="2" class="text-muted small">Subtotal: ₱${totalSubtotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} | Bale: -₱${totalBale.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
      <td class="text-end text-warning pe-2">₱${totalOTPay.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
      <td class="text-end text-white pe-2 fs-6" style="background-color: #d11a2a !important;">₱${totalAmountPaid.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
      <td colspan="2" class="text-muted small">Net Disbursement</td>
    </tr>
  `;
}

function onQuickRoleChange(role) {
  const dayInput = document.getElementById("quickRateDayInput");
  const hourInput = document.getElementById("quickRateHourInput");
  const defaultRate = DEFAULT_ROLE_DAY_RATES[role] || 450;
  if (dayInput) dayInput.value = defaultRate;
  if (hourInput) hourInput.value = Math.round(defaultRate / 8);
}

function autoCalculateQuickHourRate(val) {
  const dayVal = parseFloat(val) || 0;
  const hourInput = document.getElementById("quickRateHourInput");
  if (hourInput) hourInput.value = Math.round(dayVal / 8);
}

function applyQuickRoleRates() {
  const roleSelect = document.getElementById("quickRoleSelect");
  const dayInput = document.getElementById("quickRateDayInput");
  if (!roleSelect || !dayInput) return;

  const role = roleSelect.value;
  const rate = parseFloat(dayInput.value) || 450;

  const delSites = getDeletedSites();
  let sitesToUpdate = (currentLocation === "VIEW_ALL") 
    ? Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase()))
    : [currentLocation];

  sitesToUpdate.forEach(loc => {
    const workers = (currentActiveData.locations[loc]?.workers) || [];
    workers.filter(w => w.role === role).forEach(w => {
      saveWorkerRate(loc, w.id, rate);
    });
  });

  renderPayrollTable();
  alert(`Applied ₱${rate}/day to all ${role} workers successfully.`);
}

async function exportPayroll(destination) {
  await exportPayrollPdfLandscape(destination);
}

async function exportPayrollPdfLandscape(destination = 'device') {
  const modalTable = document.getElementById("payrollMainTable");
  if (!modalTable) {
    alert("Payroll table not found.");
    return;
  }

  if (typeof window.jspdf === 'undefined') {
    alert("PDF generation library is loading. Please try again in a moment.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: 'legal'
  });

  const dates = getCalculatedDates();
  const dateRangeStr = (dates.length > 0) ? `${dates[0].monthStr} ${dates[0].dayNum} - ${dates[dates.length - 1].monthStr} ${dates[dates.length - 1].dayNum}` : currentDate;

  const clone = modalTable.cloneNode(true);
  clone.querySelectorAll('input').forEach(el => {
    const span = document.createElement('span');
    span.innerText = el.value;
    span.className = "fw-bold";
    el.parentNode.replaceChild(span, el);
  });

  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '0';
  tempContainer.style.width = '1300px';
  tempContainer.style.background = '#ffffff';
  tempContainer.style.padding = '25px';

  const includeSignatures = document.getElementById("payrollSignaturesCheck")?.checked ?? true;

  tempContainer.innerHTML = `
    <div style="border-bottom: 3px solid #d11a2a; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h2 style="font-weight: 900; color: #18181b; margin: 0; text-transform: uppercase;">ARCDESIGN CONSTRUCTION SERVICES</h2>
        <p style="color: #71717a; margin: 3px 0 0 0; font-size: 13px; font-weight: 700;">OFFICIAL WEEKLY PAYROLL STATEMENT (LEGAL LANDSCAPE)</p>
      </div>
      <div style="text-align: right;">
        <span style="font-weight: 800; font-size: 13px; background: #18181b; color: #fff; padding: 5px 12px; border-radius: 4px;">LOCATION: ${currentLocation}</span>
        <div style="font-weight: 700; font-size: 12px; color: #d11a2a; margin-top: 4px;">PERIOD: ${dateRangeStr}</div>
      </div>
    </div>
    ${clone.outerHTML}
    ${includeSignatures ? `
      <div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 15px; border-top: 1px solid #e4e4e7;">
        <div style="text-align: center; width: 30%;">
          <div style="border-bottom: 1px solid #000; height: 35px;"></div>
          <div style="font-weight: 800; font-size: 11px; margin-top: 4px;">PREPARED BY (TIMEKEEPER)</div>
        </div>
        <div style="text-align: center; width: 30%;">
          <div style="border-bottom: 1px solid #000; height: 35px;"></div>
          <div style="font-weight: 800; font-size: 11px; margin-top: 4px;">CHECKED BY (SITE ENGINEER)</div>
        </div>
        <div style="text-align: center; width: 30%;">
          <div style="border-bottom: 1px solid #000; height: 35px;"></div>
          <div style="font-weight: 800; font-size: 11px; margin-top: 4px;">APPROVED BY (PROJECT MANAGER)</div>
        </div>
      </div>
    ` : ''}
  `;

  document.body.appendChild(tempContainer);

  try {
    const canvas = await html2canvas(tempContainer, { scale: 2, useCORS: true, logging: false });
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdfWidth = 14.0;
    const imgWidth = 13.2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0.4, 0.4, imgWidth, Math.min(imgHeight, 7.7));
    const fileName = `ARCDESIGN_Payroll_${currentLocation}_${currentDate}.pdf`;

    if (destination === 'share' && Android && Android.shareFile) {
      const base64Data = pdf.output('datauristring').split(',')[1];
      Android.shareFile("ARCDESIGN Payroll PDF", `Payroll report for ${currentLocation} (${currentDate})`, base64Data, fileName, "application/pdf", "");
    } else if (destination === 'share' && navigator.share) {
      const blob = pdf.output('blob');
      const file = new File([blob], fileName, { type: 'application/pdf' });
      await navigator.share({ files: [file], title: "ARCDESIGN Payroll", text: `Payroll for ${currentLocation}` });
    } else if (Android && Android.printPage) {
      Android.printPage();
    } else {
      pdf.save(fileName);
    }
  } catch (err) {
    console.error("Payroll export error:", err);
    alert("An error occurred during payroll export.");
  } finally {
    document.body.removeChild(tempContainer);
  }
}

// --- PDF EXPORT & OPTIONS MODAL ---
function exportToPDF(event) {
  if (event && event.preventDefault) event.preventDefault();
  const modalEl = document.getElementById("arcPdfConfigModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

async function handlePdfExportAction(actionType) {
  const isTimesheet = document.getElementById("pdfChoiceTimesheet")?.checked ?? true;
  const includeSignatures = document.getElementById("pdfIncludeSignaturesCheck")?.checked ?? true;

  const modalEl = document.getElementById("arcPdfConfigModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }

  await generatePDF(actionType, isTimesheet, includeSignatures);
}

async function generatePDF(actionType = 'download', isTimesheet = true, includeSignatures = true) {
  let targetArea;
  if (!isTimesheet) {
    const statsEl = document.getElementById("siteStatsContainer");
    if (statsEl) {
      renderSiteStats(statsEl);
      statsEl.classList.remove("d-none");
      targetArea = statsEl;
    } else {
      targetArea = document.getElementById("exportArea") || document.getElementById("mainTimesheetContainer");
    }
  } else {
    targetArea = document.getElementById("exportArea") || document.getElementById("mainTimesheetContainer");
  }
  if (!targetArea) return;

  if (typeof window.jspdf === 'undefined') {
    alert("PDF library is still loading. Please try again in a few moments.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: 'legal'
  });

  const dates = getCalculatedDates();
  const dateRangeStr = (dates.length > 0) ? `${dates[0].monthStr} ${dates[0].dayNum} - ${dates[dates.length - 1].monthStr} ${dates[dates.length - 1].dayNum}` : currentDate;

  const clone = targetArea.cloneNode(true);
  clone.querySelectorAll('.no-print, button, input, select').forEach(el => {
    if (el.tagName === 'INPUT') {
      const span = document.createElement('span');
      span.innerText = el.value;
      span.className = "fw-bold";
      el.parentNode.replaceChild(span, el);
    } else if (el.tagName === 'SELECT') {
      const span = document.createElement('span');
      span.innerText = el.options[el.selectedIndex]?.text || '';
      span.className = "fw-bold";
      el.parentNode.replaceChild(span, el);
    } else {
      el.remove();
    }
  });

  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '0';
  tempContainer.style.width = '1300px';
  tempContainer.style.background = '#ffffff';
  tempContainer.style.padding = '25px';

  tempContainer.innerHTML = `
    <div style="border-bottom: 3px solid #d11a2a; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h2 style="font-weight: 900; color: #18181b; margin: 0; text-transform: uppercase;">ARCDESIGN CONSTRUCTION SERVICES</h2>
        <p style="color: #71717a; margin: 3px 0 0 0; font-size: 13px; font-weight: 700;">${!isTimesheet ? "OFFICIAL SITE ANALYTICS & REMARKS STATEMENT (LEGAL LANDSCAPE)" : "OFFICIAL ATTENDANCE & TIMESHEET STATEMENT (LEGAL LANDSCAPE)"}</p>
      </div>
      <div style="text-align: right;">
        <span style="font-weight: 800; font-size: 13px; background: #18181b; color: #fff; padding: 5px 12px; border-radius: 4px;">LOCATION: ${currentLocation}</span>
        <div style="font-weight: 700; font-size: 12px; color: #d11a2a; margin-top: 4px;">PERIOD: ${dateRangeStr}</div>
      </div>
    </div>
    ${clone.innerHTML}
    ${includeSignatures ? `
      <div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 15px; border-top: 1px solid #e4e4e7;">
        <div style="text-align: center; width: 30%;">
          <div style="border-bottom: 1px solid #000; height: 35px;"></div>
          <div style="font-weight: 800; font-size: 11px; margin-top: 4px;">PREPARED BY (TIMEKEEPER)</div>
        </div>
        <div style="text-align: center; width: 30%;">
          <div style="border-bottom: 1px solid #000; height: 35px;"></div>
          <div style="font-weight: 800; font-size: 11px; margin-top: 4px;">CHECKED BY (SITE ENGINEER)</div>
        </div>
        <div style="text-align: center; width: 30%;">
          <div style="border-bottom: 1px solid #000; height: 35px;"></div>
          <div style="font-weight: 800; font-size: 11px; margin-top: 4px;">APPROVED BY (PROJECT MANAGER)</div>
        </div>
      </div>
    ` : ''}
  `;

  document.body.appendChild(tempContainer);

  try {
    const canvas = await html2canvas(tempContainer, { scale: 2, useCORS: true, logging: false });
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdfWidth = 14.0;
    const imgWidth = 13.2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0.4, 0.4, imgWidth, Math.min(imgHeight, 7.7));
    const fileName = `ARCDESIGN_Timesheet_${currentLocation}_${currentDate}.pdf`;

    if (actionType === 'messenger' && Android && Android.shareFile) {
      const base64Data = pdf.output('datauristring').split(',')[1];
      Android.shareFile("ARCDESIGN Timesheet PDF", `Timesheet for ${currentLocation} (${currentDate})`, base64Data, fileName, "application/pdf", "");
    } else if (actionType === 'messenger' && navigator.share) {
      const blob = pdf.output('blob');
      const file = new File([blob], fileName, { type: 'application/pdf' });
      await navigator.share({ files: [file], title: "ARCDESIGN Timesheet", text: `Timesheet for ${currentLocation}` });
    } else if (Android && Android.printPage) {
      Android.printPage();
    } else {
      pdf.save(fileName);
    }
  } catch (err) {
    console.error("PDF generation error:", err);
    alert("An error occurred during PDF generation.");
  } finally {
    document.body.removeChild(tempContainer);
  }
}

// --- SHARE MODAL & CHANNELS ---
function promptSharePermissionModal() {
  const modalEl = document.getElementById("arcSharePermissionModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

async function processShareAction(targetChannel) {
  const modalEl = document.getElementById("arcSharePermissionModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }

  const isCard = document.getElementById("shareFormatCardImg")?.checked ?? true;

  if (isCard) {
    // Generate snapshot card
    const targetArea = document.getElementById("exportArea") || document.getElementById("mainTimesheetContainer");
    if (!targetArea) return;

    try {
      const canvas = await html2canvas(targetArea, { scale: 1.5, useCORS: true, logging: false });
      const imgData = canvas.toDataURL('image/png');
      const base64Data = imgData.split(',')[1];
      const fileName = `ARCDESIGN_${currentLocation}_${currentDate}.png`;

      if (Android && Android.shareFile) {
        Android.shareFile("ARCDESIGN Timesheet Card", `Attendance report for ${currentLocation}`, base64Data, fileName, "image/png", "");
      } else if (navigator.share) {
        const blob = await (await fetch(imgData)).blob();
        const file = new File([blob], fileName, { type: 'image/png' });
        await navigator.share({ files: [file], title: "ARCDESIGN Timesheet", text: `Attendance for ${currentLocation}` });
      } else {
        const a = document.createElement('a');
        a.href = imgData;
        a.download = fileName;
        a.click();
      }
    } catch(e) {
      console.error("Card snapshot share error:", e);
      alert("Unable to generate card image.");
    }
  } else {
    // Share as standalone HTML transcript
    const htmlContent = document.documentElement.outerHTML;
    const base64Data = btoa(unescape(encodeURIComponent(htmlContent)));
    const fileName = `ARCDESIGN_Timesheet_${currentLocation}_${currentDate}.html`;

    if (Android && Android.shareFile) {
      Android.shareFile("ARCDESIGN App File", `Timesheet file for ${currentLocation}`, base64Data, fileName, "text/html", "");
    } else {
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
    }
  }
}

function openShareQrModal() {
  const modalEl = document.getElementById("shareQrCodeModal") || document.getElementById("quickShareQrModal");
  const linkInput = document.getElementById("shareQrLinkText") || document.getElementById("shareQrLinkInput");
  const qrContainer = document.getElementById("qrCodeContainer") || document.getElementById("shareQrImage")?.parentElement;

  const appUrl = window.location.href;
  if (linkInput) linkInput.value = appUrl;

  if (qrContainer) {
    qrContainer.innerHTML = `
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(appUrl)}" 
           alt="QR Code" class="img-fluid border p-1 rounded bg-white shadow-sm" style="max-width: 180px;">
    `;
  }

  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function copyShareQrLink() {
  const input = document.getElementById("shareQrLinkText") || document.getElementById("shareQrLinkInput");
  if (input) {
    input.select();
    navigator.clipboard?.writeText(input.value);
    alert("Application link copied to clipboard!");
  }
}

function shareDirectQrLink() {
  const appUrl = window.location.href;
  if (Android && Android.shareText) {
    Android.shareText("ARCDESIGN Construction Timesheet", appUrl);
  } else if (navigator.share) {
    navigator.share({ title: "ARCDESIGN Timesheet", url: appUrl });
  } else {
    copyShareQrLink();
  }
}

// --- TXT EXPORT MODAL ---
function showExportTxtModal() {
  const startEl = document.getElementById("exportStartDate");
  const endEl = document.getElementById("exportEndDate");
  const dates = getCalculatedDates();

  if (startEl && dates.length > 0) {
    startEl.value = currentDate;
  }
  if (endEl && dates.length > 0) {
    endEl.value = currentDate;
  }

  const modalEl = document.getElementById("exportTxtModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function executeTxtExport() {
  const dates = getCalculatedDates();
  const dateRangeStr = (dates.length > 0) ? `${dates[0].monthStr} ${dates[0].dayNum} - ${dates[dates.length - 1].monthStr} ${dates[dates.length - 1].dayNum}` : currentDate;

  let txt = `====================================================\n`;
  txt += `ARCDESIGN CONSTRUCTION SERVICES\n`;
  txt += `OFFICIAL TIMESHEET & ATTENDANCE TRANSCRIPT\n`;
  txt += `PERIOD: ${dateRangeStr}\n`;
  txt += `SITE: ${currentLocation}\n`;
  txt += `GENERATED: ${new Date().toLocaleString()}\n`;
  txt += `====================================================\n\n`;

  const delSites = getDeletedSites();
  let sitesToRender = (currentLocation === "VIEW_ALL") 
    ? Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase()))
    : [currentLocation];

  sitesToRender.forEach(loc => {
    const locData = currentActiveData.locations[loc];
    if (!locData) return;

    txt += `[SITE: ${loc}]\n`;
    txt += `Project Bale: ₱${locData.baleValue || 0}\n`;
    txt += `Status: ${locData.isDone ? 'COMPLETED' : 'IN PROGRESS'}\n`;
    if (locData.remarks) {
      txt += `Site Notes: ${locData.remarks}\n`;
    }
    txt += `----------------------------------------------------\n`;

    const workers = locData.workers || [];
    workers.forEach(w => {
      const m = getWorkerMetrics(w);
      const att = dates.map(d => `${d.key}: ${(w.attendance && w.attendance[d.key]) || '-'}`).join(' | ');
      const ot = dates.map(d => `${d.key}: ${(w.ot && w.ot[d.key]) || 0}h`).join(' | ');

      txt += `Worker: ${w.name} (${w.role})\n`;
      txt += `  Attendance: [ ${att} ]\n`;
      txt += `  Overtime:   [ ${ot} ]\n`;
      txt += `  Days: ${m.daysWorked.toFixed(1)} | Hourly: ${m.hourlyHours}h | OT: ${m.totalOT}h | Bale: ₱${w.baleValue || 0}\n`;
      if (w.remarks) {
        txt += `  Remarks: ${w.remarks}\n`;
      }
      if (w.notesHistory && w.notesHistory.length > 0) {
        txt += `  Notes: ${w.notesHistory.map(n => n.text).join('; ')}\n`;
      }
      txt += `\n`;
    });
    txt += `\n`;
  });

  const fileName = `ARCDESIGN_Timesheet_${currentLocation}_${currentDate}.txt`;
  const base64Data = btoa(unescape(encodeURIComponent(txt)));

  if (Android && Android.shareFile) {
    Android.shareFile("ARCDESIGN Timesheet Transcript", `Text export for ${currentLocation}`, base64Data, fileName, "text/plain", "");
  } else if (navigator.share) {
    const blob = new Blob([txt], { type: 'text/plain' });
    const file = new File([blob], fileName, { type: 'text/plain' });
    navigator.share({ files: [file], title: "ARCDESIGN Transcript" });
  } else {
    const a = document.createElement('a');
    a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt);
    a.download = fileName;
    a.click();
  }

  const modalEl = document.getElementById("exportTxtModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

function copyTranscriptToClipboard() {
  const dates = getCalculatedDates();
  const dateRangeStr = (dates.length > 0) ? (dates[0].monthStr + " " + dates[0].dayNum + " - " + dates[dates.length - 1].monthStr + " " + dates[dates.length - 1].dayNum) : currentDate;

  let txt = "====================================================\n";
  txt += "ARCDESIGN CONSTRUCTION SERVICES\n";
  txt += "ATTENDANCE & TIMESHEET TRANSCRIPT\n";
  txt += "PERIOD: " + dateRangeStr + "\n";
  txt += "LOCATION: " + currentLocation + "\n";
  txt += "====================================================\n\n";

  const delSites = getDeletedSites();
  let sitesToRender = (currentLocation === "VIEW_ALL") 
    ? Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase()))
    : [currentLocation];

  sitesToRender.forEach(loc => {
    const locData = currentActiveData.locations[loc];
    if (!locData) return;
    txt += "--- SITE: " + loc + " ---\n";
    (locData.workers || []).forEach(w => {
      const m = getWorkerMetrics(w);
      const att = dates.map(d => d.key + ": " + ((w.attendance && w.attendance[d.key]) || "-")).join(" | ");
      txt += w.name + " (" + w.role + "): [" + att + "] | Days: " + m.daysWorked.toFixed(1) + " | OT: " + m.totalOT + "h | Bale: ₱" + (w.baleValue || 0) + "\n";
    });
    txt += "\n";
  });

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).then(() => {
      alert("Timesheet details successfully copied to clipboard!");
    }).catch(() => {
      executeTxtExport();
    });
  } else {
    executeTxtExport();
  }
}

// --- SECURITY CHALLENGES: CLEAR RECORDS & DELETE ---
function generateMathChallenge() {
  const n1 = Math.floor(Math.random() * 12) + 3;
  const n2 = Math.floor(Math.random() * 12) + 2;
  return {
    question: `${n1} + ${n2}`,
    answer: n1 + n2
  };
}

function promptClearRecords() {
  if (currentLocation === "VIEW_ALL") {
    alert("Please select a specific project site to clear records.");
    return;
  }

  currentClearMath = generateMathChallenge();
  const rangeEl = document.getElementById("clearTimeframeRange");
  const qEl = document.getElementById("mathQuestionText");
  const ansEl = document.getElementById("mathAnswerInput");
  const errEl = document.getElementById("mathErrorAlert");

  if (rangeEl) rangeEl.innerText = `${currentLocation} (${currentDate})`;
  if (qEl) qEl.innerText = currentClearMath.question;
  if (ansEl) ansEl.value = "";
  if (errEl) errEl.classList.add("d-none");

  const modalEl = document.getElementById("clearRecordsModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function executeClearRecords() {
  const ansEl = document.getElementById("mathAnswerInput");
  const errEl = document.getElementById("mathErrorAlert");
  const val = parseInt(ansEl?.value, 10);

  if (val !== currentClearMath.answer) {
    if (errEl) errEl.classList.remove("d-none");
    return;
  }

  if (currentLocation !== "VIEW_ALL" && currentActiveData.locations[currentLocation]) {
    const workers = currentActiveData.locations[currentLocation].workers || [];
    workers.forEach(w => {
      w.attendance = { M: '', T: '', W: '', Th: '', F: '', S: '' };
      w.ot = { M: 0, T: 0, W: 0, Th: 0, F: 0, S: 0 };
      w.baleValue = 0;
      w.updatedAt = Date.now();
    });
    currentActiveData.locations[currentLocation].baleValue = 0;
    saveStore();
    renderUI();
  }

  const modalEl = document.getElementById("clearRecordsModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

function promptDeleteRecordedDate() {
  if (!isAdmin()) {
    alert("Administrator authorization required to delete recorded periods.");
    return;
  }

  currentDeleteDateMath = generateMathChallenge();
  const rangeEl = document.getElementById("deleteDateRangeDisplay");
  const qEl = document.getElementById("deleteDateMathQuestionText");
  const ansEl = document.getElementById("deleteDateMathAnswerInput");
  const errEl = document.getElementById("deleteDateMathErrorAlert");

  const dates = getCalculatedDates();
  const dateRangeStr = (dates.length > 0) ? `${dates[0].monthStr} ${dates[0].dayNum} - ${dates[dates.length - 1].monthStr} ${dates[dates.length - 1].dayNum}` : currentDate;

  if (rangeEl) rangeEl.innerText = `${dateRangeStr} (${currentDate})`;
  if (qEl) qEl.innerText = currentDeleteDateMath.question;
  if (ansEl) ansEl.value = "";
  if (errEl) errEl.classList.add("d-none");

  const modalEl = document.getElementById("deleteRecordedDateModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function executeDeleteRecordedDate() {
  const ansEl = document.getElementById("deleteDateMathAnswerInput");
  const errEl = document.getElementById("deleteDateMathErrorAlert");
  const val = parseInt(ansEl?.value, 10);

  if (val !== currentDeleteDateMath.answer) {
    if (errEl) errEl.classList.remove("d-none");
    return;
  }

  delete timesheetDB[currentDate];
  const delDates = getDeletedDates();
  if (!delDates.includes(currentDate)) {
    delDates.push(currentDate);
    saveDeletedDates(delDates);
  }

  const remaining = Object.keys(timesheetDB);
  if (remaining.length > 0) {
    currentDate = remaining.sort().reverse()[0];
    currentActiveData = timesheetDB[currentDate];
  } else {
    currentDate = getTodayFormatted();
    timesheetDB[currentDate] = buildFreshLocationsData();
    currentActiveData = timesheetDB[currentDate];
  }

  saveStore();
  const picker = document.getElementById("startDatePicker");
  if (picker) picker.value = currentDate;
  renderLocationDropdown();
  renderUI();

  const modalEl = document.getElementById("deleteRecordedDateModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

function promptDeleteSite(loc) {
  if (!isAdmin()) {
    alert("Administrator authorization required to delete project sites.");
    return;
  }

  sitePendingDeletion = loc;
  currentDeleteProjectMath = generateMathChallenge();

  const nameEl = document.getElementById("deleteProjectNameDisplay");
  const qEl = document.getElementById("deleteMathQuestionText");
  const ansEl = document.getElementById("deleteMathAnswerInput");
  const errEl = document.getElementById("deleteMathErrorAlert");

  if (nameEl) nameEl.innerText = loc;
  if (qEl) qEl.innerText = currentDeleteProjectMath.question;
  if (ansEl) ansEl.value = "";
  if (errEl) errEl.classList.add("d-none");

  const modalEl = document.getElementById("deleteProjectModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function executeDeleteProject() {
  const ansEl = document.getElementById("deleteMathAnswerInput");
  const errEl = document.getElementById("deleteMathErrorAlert");
  const val = parseInt(ansEl?.value, 10);

  if (val !== currentDeleteProjectMath.answer) {
    if (errEl) errEl.classList.remove("d-none");
    return;
  }

  if (sitePendingDeletion) {
    const delSites = getDeletedSites();
    if (!delSites.includes(sitePendingDeletion.toUpperCase())) {
      delSites.push(sitePendingDeletion.toUpperCase());
      saveDeletedSites(delSites);
    }

    for (let d in timesheetDB) {
      if (timesheetDB[d].locations && timesheetDB[d].locations[sitePendingDeletion]) {
        delete timesheetDB[d].locations[sitePendingDeletion];
      }
    }

    saveStore();
    currentLocation = "VIEW_ALL";
    renderLocationDropdown();
    renderUI();
  }

  const modalEl = document.getElementById("deleteProjectModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

function promptDeleteWorker(loc, workerId, workerName) {
  if (!isAdmin()) {
    alert("Administrator authorization required to delete workers.");
    return;
  }

  if (confirm(`Permanently remove worker "${workerName}" from ${loc}?`)) {
    if (currentActiveData.locations[loc]) {
      currentActiveData.locations[loc].workers = (currentActiveData.locations[loc].workers || []).filter(w => w.id !== workerId);
      const delWorkers = getDeletedWorkers();
      if (!delWorkers.includes(workerId)) {
        delWorkers.push(workerId);
        saveDeletedWorkers(delWorkers);
      }
      saveStore();
      renderUI();
    }
  }
}

// --- NOTIFICATION PERMISSION & STATUS ---
function updateNotifButtonUI() {
  const isEnabled = localStorage.getItem(NOTIF_FLAG_KEY) === "true";
  const icon = document.getElementById("notifIconStatus");
  const text = document.getElementById("notifStatusText");
  const btn = document.getElementById("btnToggleDeviceNotifs");

  if (!btn || !icon || !text) return;

  if (isEnabled && ("Notification" in window) && Notification.permission === "granted") {
    btn.className = "btn btn-outline-success btn-sm w-100 fw-bold";
    icon.className = "bi bi-bell-fill me-1 text-success";
    text.innerText = "Notifications Active";
  } else {
    btn.className = "btn btn-outline-warning btn-sm w-100 fw-bold";
    icon.className = "bi bi-bell-slash-fill me-1 text-warning";
    text.innerText = "Enable Notifications";
  }
}

async function toggleDeviceNotificationPermission() {
  if (!("Notification" in window)) {
    alert("Device notifications ready.");
    return;
  }

  if (Notification.permission === "granted") {
    const isCurrentlyOn = localStorage.getItem(NOTIF_FLAG_KEY) === "true";
    if (isCurrentlyOn) {
      localStorage.setItem(NOTIF_FLAG_KEY, "false");
      alert("Device notifications muted.");
    } else {
      localStorage.setItem(NOTIF_FLAG_KEY, "true");
      alert("Device notifications activated!");
    }
    updateNotifButtonUI();
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      localStorage.setItem(NOTIF_FLAG_KEY, "true");
      new Notification("ARCDESIGN Timesheet", {
        body: "Notifications active. Daily attendance & payroll updates ready.",
        icon: "arc_logo.jpg"
      });
    } else {
      localStorage.setItem(NOTIF_FLAG_KEY, "false");
    }
  } catch (e) {
    console.warn("Notification request:", e);
  }
  updateNotifButtonUI();
}

// --- FEATURE INTRO MODAL ---
function checkShowFeatureIntro() {
  const dismissed = localStorage.getItem("arc_feature_guide_dismissed_v2");
  if (dismissed === "true") return;

  const modalEl = document.getElementById("appFeaturesModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function dismissFeatureModal() {
  const dontShow = document.getElementById("dontShowFeatureAgain")?.checked;
  if (dontShow) {
    localStorage.setItem("arc_feature_guide_dismissed_v2", "true");
  }
  const modalEl = document.getElementById("appFeaturesModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

// --- DOM INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  initStore();
  renderLocationDropdown();
  renderUI();
  checkShowFeatureIntro();
});

// --- GLOBAL WINDOW BINDINGS ---
if (typeof attemptLogin === "function") window.attemptLogin = attemptLogin;
if (typeof dismissFeatureModal === "function") window.dismissFeatureModal = dismissFeatureModal;
if (typeof onStartDateChange === "function") window.onStartDateChange = onStartDateChange;
if (typeof switchLocation === "function") window.switchLocation = switchLocation;
if (typeof showExportTxtModal === "function") window.showExportTxtModal = showExportTxtModal;
if (typeof exportToPDF === "function") window.exportToPDF = exportToPDF;
if (typeof promptSharePermissionModal === "function") window.promptSharePermissionModal = promptSharePermissionModal;
if (typeof openDailyWagePayrollModal === "function") window.openDailyWagePayrollModal = openDailyWagePayrollModal;
if (typeof toggleDeviceNotificationPermission === "function") window.toggleDeviceNotificationPermission = toggleDeviceNotificationPermission;
if (typeof startFocusMode === "function") window.startFocusMode = startFocusMode;
if (typeof showSearchWorkerModal === "function") window.showSearchWorkerModal = showSearchWorkerModal;
if (typeof showAddWorkerModal === "function") window.showAddWorkerModal = showAddWorkerModal;
if (typeof showCreateAccountModal === "function") window.showCreateAccountModal = showCreateAccountModal;
if (typeof logoutSession === "function") window.logoutSession = logoutSession;
if (typeof exportPayroll === "function") window.exportPayroll = exportPayroll;
if (typeof onQuickRoleChange === "function") window.onQuickRoleChange = onQuickRoleChange;
if (typeof autoCalculateQuickHourRate === "function") window.autoCalculateQuickHourRate = autoCalculateQuickHourRate;
if (typeof applyQuickRoleRates === "function") window.applyQuickRoleRates = applyQuickRoleRates;
if (typeof focusNavWorker === "function") window.focusNavWorker = focusNavWorker;
if (typeof setCustomHourInputValue === "function") window.setCustomHourInputValue = setCustomHourInputValue;
if (typeof confirmCustomHoursEntry === "function") window.confirmCustomHoursEntry = confirmCustomHoursEntry;
if (typeof handleWorkerSearchLive === "function") window.handleWorkerSearchLive = handleWorkerSearchLive;
if (typeof confirmAddWorker === "function") window.confirmAddWorker = confirmAddWorker;
if (typeof confirmRenameWorker === "function") window.confirmRenameWorker = confirmRenameWorker;
if (typeof addWorkerNote === "function") window.addWorkerNote = addWorkerNote;
if (typeof confirmCreateStaffAccount === "function") window.confirmCreateStaffAccount = confirmCreateStaffAccount;
if (typeof confirmCreateProject === "function") window.confirmCreateProject = confirmCreateProject;
if (typeof executeClearRecords === "function") window.executeClearRecords = executeClearRecords;
if (typeof executeDeleteRecordedDate === "function") window.executeDeleteRecordedDate = executeDeleteRecordedDate;
if (typeof executeDeleteProject === "function") window.executeDeleteProject = executeDeleteProject;
if (typeof executeTxtExport === "function") window.executeTxtExport = executeTxtExport;
if (typeof handlePdfExportAction === "function") window.handlePdfExportAction = handlePdfExportAction;
if (typeof openShareQrModal === "function") window.openShareQrModal = openShareQrModal;
if (typeof processShareAction === "function") window.processShareAction = processShareAction;
if (typeof copyTranscriptToClipboard === "function") window.copyTranscriptToClipboard = copyTranscriptToClipboard;
if (typeof copyShareQrLink === "function") window.copyShareQrLink = copyShareQrLink;
if (typeof shareDirectQrLink === "function") window.shareDirectQrLink = shareDirectQrLink;
window.getWorkerMetrics = getWorkerMetrics;
window.saveWorkerRate = saveWorkerRate;
window.saveWorkerHourlyRate = saveWorkerHourlyRate;
window.renderPayrollTable = renderPayrollTable;
window.updateAttendance = updateAttendance;
window.updateOT = updateOT;
window.updateWorkerBale = updateWorkerBale;
window.updateLocationBale = updateLocationBale;
window.toggleStatsView = toggleStatsView;
window.openFocusCustomHours = openFocusCustomHours;
window.updateFocusWorkerRemarks = updateFocusWorkerRemarks;
window.jumpToFocusWorker = jumpToFocusWorker;
window.updateSiteRemarks = updateSiteRemarks;

window.setFocusAttendance = setFocusAttendance;
window.setFocusOT = setFocusOT;
window.updateFocusBale = updateFocusBale;
window.focusNavWorker = focusNavWorker;
window.startFocusMode = startFocusMode;
window.renderFocusWorker = renderFocusWorker;

window.openWorkerProfileModal = openWorkerProfileModal;
window.launchFocusForActiveWorker = launchFocusForActiveWorker;
window.saveWorkerRemarkFromProfile = saveWorkerRemarkFromProfile;
window.updateWorkerRemarks = updateWorkerRemarks;
window.deleteWorkerNote = deleteWorkerNote;
window.toggleSiteNotes = toggleSiteNotes;
window.saveSiteNotesDirect = saveSiteNotesDirect;
window.appendSiteNotePreset = appendSiteNotePreset;
window.openSiteNotesModal = openSiteNotesModal;
window.saveModalSiteNotes = saveModalSiteNotes;
window.appendModalSiteNotePreset = appendModalSiteNotePreset;
window.switchAnalyticsSiteRemarks = switchAnalyticsSiteRemarks;
window.saveAnalyticsSiteRemarks = saveAnalyticsSiteRemarks;
window.appendAnalyticsPresetTag = appendAnalyticsPresetTag;
window.renderSingleWorkerGraphCard = renderSingleWorkerGraphCard;
window.filterWorkerGraphs = filterWorkerGraphs;
window.toggleFocusRateEditor = toggleFocusRateEditor;
window.onFocusDailyRateInput = onFocusDailyRateInput;
window.onFocusHourlyRateInput = onFocusHourlyRateInput;
window.setFocusRatePreset = setFocusRatePreset;
window.getWorkerLocation = getWorkerLocation;
