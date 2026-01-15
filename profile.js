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

// Profile Editing
const nameDisplay = document.getElementById('name-display');
const emailDisplay = document.getElementById('email-display');
const editControls = document.getElementById('edit-controls');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');

function toggleEditMode() {
    nameDisplay.style.display = 'none';
    emailDisplay.style.display = 'none';
    editControls.style.display = 'block';
}

nameDisplay.addEventListener('click', toggleEditMode);
emailDisplay.addEventListener('click', toggleEditMode);

saveBtn.addEventListener('click', () => {
    nameDisplay.textContent = nameInput.value;
    emailDisplay.textContent = emailInput.value;
    editControls.style.display = 'none';
    nameDisplay.style.display = 'block';
    emailDisplay.style.display = 'block';
});

cancelBtn.addEventListener('click', () => {
    nameInput.value = nameDisplay.textContent;
    emailInput.value = emailDisplay.textContent;
    editControls.style.display = 'none';
    nameDisplay.style.display = 'block';
    emailDisplay.style.display = 'block';
});

// Setting Card Expansions and Clicks
document.querySelectorAll('.setting-card').forEach(card => {
    card.addEventListener('click', () => {
        const setting = card.getAttribute('data-setting');
        const subSettings = card.querySelector('.sub-settings');
        if (setting === 'delete') {
            alert('Delete Account: This will permanently remove your data (dummy action)');
        } else {
            card.classList.toggle('expanded');
            subSettings.style.display = subSettings.style.display === 'none' ? 'block' : 'none';
        }
    });
});