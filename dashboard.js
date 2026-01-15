// Live Clock
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    document.getElementById('clock').textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

// Sidebar Navigation (SPA-style)
document.querySelectorAll('#sidebar li').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('#sidebar li').forEach(li => li.classList.remove('active'));
        item.classList.add('active');
        const page = item.getAttribute('data-page');
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(page).classList.add('active');
    });
});

// Focus Mode Toggle
const focusToggle = document.getElementById('focus-toggle');
const focusStatus = document.getElementById('focus-status');
focusToggle.addEventListener('change', () => {
    if (focusToggle.checked) {
        focusStatus.textContent = 'Focus Mode Active 🟢';
    } else {
        focusStatus.textContent = 'Focus Mode Off 🔴';
    }
});

// Dummy App Usage Timer (increments every 5 seconds)
let instaTime = 45;
let snapTime = 34;
let waTime = 26;
function updateAppTimes() {
    instaTime += Math.floor(Math.random() * 5);
    snapTime += Math.floor(Math.random() * 5);
    waTime += Math.floor(Math.random() * 5);
    document.getElementById('insta-time').textContent = `${instaTime} min`;
    document.getElementById('snap-time').textContent = `${snapTime} min`;
    document.getElementById('wa-time').textContent = `${waTime} min`;
}
setInterval(updateAppTimes, 5000);

// Usage Graph (Canvas Bar Chart)
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
let chartData = [45, 34, 26, 50, 40, 30, 20]; // Dummy daily data
let labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function drawChart(data, animate = false) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = 50;
    const maxHeight = 250;
    const maxValue = Math.max(...data);
    data.forEach((value, index) => {
        const height = (value / maxValue) * maxHeight;
        const x = 50 + index * 70;
        const y = canvas.height - height - 50;
        if (animate) {
            animateBar(x, y, barWidth, height, value);
        } else {
            ctx.fillStyle = '#00ff96';
            ctx.fillRect(x, y, barWidth, height);
            ctx.fillStyle = '#e0e0e0';
            ctx.fillText(labels[index], x + 10, canvas.height - 20);
            ctx.fillText(value, x + 10, y - 10);
        }
    });
}

function animateBar(x, y, width, targetHeight, value) {
    let currentHeight = 0;
    const animateStep = () => {
        if (currentHeight < targetHeight) {
            currentHeight += 5;
            ctx.clearRect(x, y, width, targetHeight);
            ctx.fillStyle = '#00ff96';
            ctx.fillRect(x, y + (targetHeight - currentHeight), width, currentHeight);
            requestAnimationFrame(animateStep);
        } else {
            ctx.fillStyle = '#e0e0e0';
            ctx.fillText(labels[Math.floor((x - 50) / 70)], x + 10, canvas.height - 20);
            ctx.fillText(value, x + 10, y - 10);
        }
    };
    animateStep();
}

drawChart(chartData,