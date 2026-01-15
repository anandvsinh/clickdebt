let currentSite = "";
let startTime = null;
let siteUsage = {};   // { "google.com": 120, "youtube.com": 300 }

// Load data from storage on startup
chrome.storage.local.get(["siteUsage"], (result) => {
  if (result.siteUsage) {
    siteUsage = result.siteUsage;
    console.log("📂 Data loaded from storage:", siteUsage);
  }
});

// --------------------
// Time formatter
// --------------------
function formatTime(seconds) {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;

  let result = "";
  if (hrs > 0) result += hrs + " hr ";
  if (mins > 0) result += mins + " min ";
  result += secs + " sec";

  return result.trim();
}

// --------------------
// Extension start
// --------------------
chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ ClickDebt background service worker running");
  chrome.storage.local.set({ siteUsage: {} });
});

// --------------------
// Save to storage aur notify popup
// --------------------
function saveToStorage() {
  chrome.storage.local.set({ siteUsage: siteUsage }, () => {
    console.log("💾 Saved to storage:", siteUsage);
  });
}

// --------------------
// Active tab se domain lo
// --------------------
function getActiveDomain(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0] || !tabs[0].url) return;
    try {
      let url = new URL(tabs[0].url);
      callback(url.hostname);
    } catch (e) {}
  });
}

// --------------------
// Jab tab / window change ho
// --------------------
function handleSiteChange() {
  getActiveDomain((domain) => {
    if (!domain) return;

    // First time
    if (!currentSite) {
      currentSite = domain;
      startTime = Date.now();
      console.log("▶️ Started:", currentSite);
      return;
    }

    // Site changed
    if (currentSite !== domain) {
      saveTime();
      currentSite = domain;
      startTime = Date.now();
      console.log("🔁 Switched to:", currentSite);
    }
  });
}

// --------------------
// Time save function
// --------------------
function saveTime() {
  if (!currentSite || !startTime) return;

  let timeSpent = Math.floor((Date.now() - startTime) / 1000); // seconds

  if (!siteUsage[currentSite]) {
    siteUsage[currentSite] = 0;
  }

  siteUsage[currentSite] += timeSpent;

  console.log(
    "⏱️ Time on",
    currentSite,
    ":",
    formatTime(siteUsage[currentSite])
  );
  
  saveToStorage();
  startTime = Date.now(); // Reset timer for continuous tracking
}

// --------------------
// Live tracking every 5 seconds
// --------------------
setInterval(() => {
  if (currentSite && startTime) {
    saveTime();
  }
}, 5000);

// --------------------
// Events
// --------------------
chrome.tabs.onActivated.addListener(handleSiteChange);
chrome.windows.onFocusChanged.addListener(handleSiteChange);
chrome.tabs.onUpdated.addListener(handleSiteChange);

// Browser close / service worker stop
chrome.runtime.onSuspend.addListener(() => {
  saveTime();
  saveToStorage();
});

// --------------------
// Popup se data bhejna
// --------------------
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg === "getUsage") {
    sendResponse(siteUsage);
  }
});