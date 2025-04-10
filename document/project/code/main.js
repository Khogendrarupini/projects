/**
 * Premium UI Loader - JavaScript Controller
 * 
 * Handles the animated loading progress, dynamic status updates,
 * and interactive functionality for the Premium UI Loader
 * 
 * @author Khogendra Rupini
 * @version v1.1
 * @license MIT
 * 
 * Features:
 * - Animated progress bar
 * - Dynamic status messages
 * - Speed simulation
 * - Priority load functionality
 */

const progressBar = document.getElementById('progressBar');
const speedStat = document.getElementById('speedStat');
const timeStat = document.getElementById('timeStat');
const loaderDetails = document.getElementById('loaderDetails');
const priorityBtn = document.getElementById('priorityBtn');

let progress = 0;
let speed = 5.2;
let timeRemaining = 12;
let currentTask = 0;

const tasks = [
    "Loading core modules...",
    "Fetching user data...",
    "Initializing components...",
    "Building interface...",
    "Optimizing performance...",
    "Finalizing setup..."
];

const updateStats = () => {

    speed = Math.max(2, Math.min(10, speed + (Math.random() - 0.5) * 1.5));
    speedStat.textContent = speed.toFixed(1);
    
    timeRemaining = Math.max(0, Math.ceil((100 - progress) / (speed * 0.8)));
    timeStat.textContent = timeRemaining;
    
    const taskIndex = Math.min(Math.floor(progress / 20), tasks.length - 1);
    if (taskIndex !== currentTask) {
        currentTask = taskIndex;
        loaderDetails.textContent = tasks[currentTask];
        
        loaderDetails.style.opacity = 0;
        setTimeout(() => {
            loaderDetails.style.opacity = 1;
        }, 200);
    }
};

const simulateLoading = () => {

    let increment = 0;
    
    if (Math.random() > 0.9) {

        increment = 0.1 + Math.random() * 0.3;
    } else if (Math.random() > 0.7) {

        increment = 1 + Math.random() * 3;
    } else {

        increment = 0.5 + Math.random();
    }
    
    progress = Math.min(100, progress + increment);
    progressBar.style.width = progress + '%';
    
    updateStats();
    
    if (progress < 100) {

        const interval = 300 + Math.random() * 500;
        setTimeout(simulateLoading, interval);
    } else {

        loaderDetails.textContent = "Ready! Redirecting...";
        speedStat.textContent = "0";
        timeStat.textContent = "0";
        
    }
};

setTimeout(simulateLoading, 800);

priorityBtn.addEventListener('click', () => {
    priorityBtn.textContent = "Loading...";
    priorityBtn.disabled = true;

    speed = 8;
    const fastInterval = setInterval(() => {
        progress = Math.min(100, progress + 2);
        progressBar.style.width = progress + '%';
        updateStats();
        
        if (progress >= 100) {
            clearInterval(fastInterval);
        }
    }, 200);
});
