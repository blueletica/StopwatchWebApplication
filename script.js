let timerInterval;
let startTime;
let lapStartTime; // Variable to store the start time of the lap
let elapsedTime = 0;
let isRunning = false;
let lapCounter = 1;

function toggleTimer() {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        lapStartTime = Date.now();
        timerInterval = setInterval(updateTime, 10); // Update interval timing to every 10 milliseconds
        isRunning = true;
        document.getElementById('startPauseBtn').textContent = 'Pause';
        document.getElementById('lapBtn').disabled = false;
    }
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById('startPauseBtn').textContent = 'Resume';
}

function resetStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    lapCounter = 1;
    document.getElementById('lapList').innerHTML = '';
    document.getElementById('startPauseBtn').textContent = 'Start';
    document.getElementById('lapBtn').disabled = true;
}

function recordLap() {
    if (isRunning) {
        const lapTime = Date.now() - lapStartTime;
        const lapItem = document.createElement('li');
        lapItem.classList.add('lap-item');
        lapItem.textContent = `Lap ${lapCounter}: ${formatTime(elapsedTime)}`;
        document.getElementById('lapList').appendChild(lapItem);
        lapCounter++;
        lapStartTime = Date.now();
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    const formattedTime = formatTime(elapsedTime);
    document.querySelector('.time').textContent = formattedTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = Math.floor(totalSeconds % 60);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${padTime(minutes)}:${padTime(seconds)}:${padTime(centiseconds)}`;
}

function padTime(value) {
    return value < 10 ? '0' + value : value;
}
