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

// History Filters
const todayFilter = document.getElementById('today-filter');
const weekFilter = document.getElementById('week-filter');
const monthFilter = document.getElementById('month-filter');
const historyContent = document.getElementById('history-content');

const todayHistory = `
    <div class="history-card">
        <div class="date">2023-10-05</div>
        <div class="details">
            <span>Instagram – 45 min</span>
            <span>Tax: ₹450</span>
        </div>
    </div>
    <div class="history-card">
        <div class="date">2023-10-05</div>
        <div class="details">
            <span>YouTube – 30 min</span>
            <span>Tax: ₹300</span>
        </div>
    </div>
`;

const weekHistory = `
    <div class="history-card">
        <div class="date">2023-10-05</div>
        <div class="details">
            <span>Instagram – 45 min</span>
            <span>Tax: ₹450</span>
        </div>
    </div>
    <div class="history-card">
        <div class="date">2023-10-04</div>
        <div class="details">
            <span>Facebook – 20 min</span>
            <span>Tax: ₹200</span>
        </div>
    </div>
    <div class="history-card">
        <div class="date">2023-10-03</div>
        <div class="details">
            <span>Twitter – 15 min</span>
            <span>Tax: ₹150</span>
        </div>
    </div>
`;

const monthHistory = `
    <div class="history-card">
        <div class="date">2023-10-05</div>
        <div class="details">
            <span>Instagram – 45 min</span>
            <span>Tax: ₹450</span>
        </div>
    </div>
    <div class="history-card">
        <div class="date">2023-10-04</div>
        <div class="details">
            <span>Facebook – 20 min</span>
            <span>Tax: ₹200</span>
        </div>
    </div>
    <div class="history-card">
        <div class="date">2023-10-03</div>
        <div class="details">
            <span>Twitter – 15 min</span>
            <span>Tax: ₹150</span>
        </div>
    </div>
    <div class="history-card">
        <div class="date">2023-10-02</div>
        <div class="details">
            <span>LinkedIn – 10 min</span>
            <span>Tax: ₹100</span>
        </div>
    </div>
`;

todayFilter.addEventListener('click', () => {
    todayFilter.classList.add('active');
    weekFilter.classList.remove('active');
    monthFilter.classList.remove('active');
    historyContent.style.opacity = '0';
    setTimeout(() => {
        historyContent.innerHTML = todayHistory;
        historyContent.style.opacity = '1';
    }, 250);
});

weekFilter.addEventListener('click', () => {
    weekFilter.classList.add('active');
    todayFilter.classList.remove('active');
    monthFilter.classList.remove('active');
    historyContent.style.opacity = '0';
    setTimeout(() => {
        historyContent.innerHTML = weekHistory;
        historyContent.style.opacity = '1';
    }, 250);
});

monthFilter.addEventListener('click', () => {
    monthFilter.classList.add('active');
    todayFilter.classList.remove('active');
    weekFilter.classList.remove('active');
    historyContent.style.opacity = '0';
    setTimeout(() => {
        historyContent.innerHTML = monthHistory;
        historyContent.style.opacity = '1';
    }, 250);
});

// Stats Charts (Canvas)
const dailyCanvas = document.getElementById('daily-chart');
const weeklyCanvas = document.getElementById('weekly-chart');

function drawBarChart(canvas, data, labels) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = 30;
    const maxHeight = 150;
    const maxValue = Math.max(...data);
    data.forEach((value, index) => {
        const height = (value / maxValue) * maxHeight;
        const x = 50 + index * 50;
        const y = canvas.height - height -