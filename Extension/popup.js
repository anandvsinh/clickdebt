// Clock update
function updateClock() {
  let now = new Date();
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("clock").innerText = `${hours}:${minutes}`;
}

// Format time
function formatTime(seconds) {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;
  
  let result = "";
  if (hrs > 0) result += hrs + "h ";
  if (mins > 0) result += mins + "m ";
  result += secs + "s";
  
  return result.trim();
}

// Update all website stats
function updateAllStats() {
  chrome.storage.local.get(["siteUsage"], (result) => {
    if (result.siteUsage && Object.keys(result.siteUsage).length > 0) {
      let statsHTML = "<div style='font-size: 11px; max-height: 150px; overflow-y: auto;'>";
      
      // Sort by time spent (descending)
      let sorted = Object.entries(result.siteUsage)
        .sort((a, b) => b[1] - a[1]);
      
      // Show top 5 websites
      sorted.slice(0, 5).forEach(([site, time]) => {
        let ytMoney = site === "youtube.com" ? (time / 3600) * 5 : 0;
        let moneyStr = ytMoney > 0 ? ` (₹${ytMoney.toFixed(2)})` : "";
        statsHTML += `<div><b>${site}</b><br>${formatTime(time)}${moneyStr}</div><hr style='margin: 5px 0;'>`;
      });
      
      statsHTML += "</div>";
      document.getElementById("statsContainer").innerHTML = statsHTML;
    } else {
      document.getElementById("statsContainer").innerHTML = "<p style='font-size: 12px; color: gray;'>No data yet...</p>";
    }
  });
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock();

// Update stats every 2 seconds (for live tracking)
setInterval(updateAllStats, 2000);
updateAllStats();

// Listen for storage changes
chrome.storage.onChanged.addListener(() => {
  updateAllStats();
});

// Focus Mode Toggle
document.getElementById("focusToggle").addEventListener("change", (e) => {
  let isFocused = e.target.checked;
  chrome.storage.local.set({ focusMode: isFocused }, () => {
    console.log("Focus Mode:", isFocused);
  });
});

// Load Focus Mode state
chrome.storage.local.get(["focusMode"], (result) => {
  if (result.focusMode) {
    document.getElementById("focusToggle").checked = true;
  }
});

// Open Dashboard
document.getElementById("openDash").addEventListener("click", () => {
  chrome.tabs.create({ url: "https://clickdebt.unaux.com/" });
});