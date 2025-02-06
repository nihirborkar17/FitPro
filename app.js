// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');
const chatInterface = document.getElementById('chatInterface');

// Sample Data
const professionals = [
    {
        name: "Sarah Johnson",
        specialty: "Nutrition Expert",
        rating: 4.9,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Mike Thompson",
        specialty: "Personal Trainer",
        rating: 4.8,
        reviews: 93,
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Lisa Chen",
        specialty: "Yoga Instructor",
        rating: 4.7,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    renderProfessionals();
    setupEventListeners();
});

function setupEventListeners() {
    // Modal Controls
    loginBtn.addEventListener('click', () => loginModal.classList.remove('hidden'));
    closeModal.addEventListener('click', () => loginModal.classList.add('hidden'));
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.classList.add('hidden');
    });

    // Form Submission
    loginForm.addEventListener('submit', handleLogin);

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Chart Initialization
function initializeCharts() {
    // Weight Progress Chart
    const weightCtx = document.getElementById('weightChart').getContext('2d');
    new Chart(weightCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Weight (kg)',
                data: [75, 74, 73, 72, 71, 70],
                borderColor: '#6366f1',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

    // Macro Nutrients Chart
    const macroCtx = document.getElementById('macroChart').getContext('2d');
    new Chart(macroCtx, {
        type: 'doughnut',
        data: {
            labels: ['Protein', 'Carbs', 'Fats'],
            datasets: [{
                data: [30, 50, 20],
                backgroundColor: ['#6366f1', '#818cf8', '#a5b4fc']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

// Render Professional Cards
function renderProfessionals() {
    const container = document.querySelector('#professionals .grid');
    container.innerHTML = professionals.map(pro => `
        <div class="professional-card card-3d">
            <img src="${pro.image}" alt="${pro.name}" class="w-full h-48 object-cover rounded-lg mb-4">
            <h3 class="text-xl font-bold mb-2">${pro.name}</h3>
            <p class="text-gray-600 mb-2">${pro.specialty}</p>
            <div class="flex items-center mb-4">
                <span class="text-yellow-400">★</span>
                <span class="ml-1">${pro.rating}</span>
                <span class="text-gray-400 ml-2">(${pro.reviews} reviews)</span>
            </div>
            <button class="btn-primary w-full" onclick="startChat('${pro.name}')">
                Book Session
            </button>
        </div>
    `).join('');
}

// Chat Functions
function startChat(professionalName) {
    chatInterface.classList.remove('hidden');
    const messages = document.querySelector('.chat-messages');
    messages.innerHTML = `
        <div class="text-center text-gray-500 mb-4">
            You are now chatting with ${professionalName}
        </div>
    `;
}

// Login Handler
function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Here you would typically make an API call to authenticate
    console.log('Login attempted with:', Object.fromEntries(formData));
    loginModal.classList.add('hidden');
}

// Progress Tracking
class ProgressTracker {
    constructor() {
        this.data = {
            weight: [],
            sleep: [],
            macros: {
                protein: [],
                carbs: [],
                fats: []
            }
        };
    }

    addWeight(value, date = new Date()) {
        this.data.weight.push({ value, date });
    }

    addSleep(hours, date = new Date()) {
        this.data.sleep.push({ hours, date });
    }

    addMacros(protein, carbs, fats, date = new Date()) {
        this.data.macros.protein.push({ value: protein, date });
        this.data.macros.carbs.push({ value: carbs, date });
        this.data.macros.fats.push({ value: fats, date });
    }
}

// Initialize Progress Tracker
const tracker = new ProgressTracker();

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});








  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
 
  const firebaseConfig = {
    apiKey: "AIzaSyCPrxCWk-4W9zTGCE_eZ1x2CObQJmZEHYE",
    authDomain: "fit-pro-1ef11.firebaseapp.com",
    projectId: "fit-pro-1ef11",
    storageBucket: "fit-pro-1ef11.firebasestorage.app",
    messagingSenderId: "873001482585",
    appId: "1:873001482585:web:fbcc834a12191da1c03448",
    measurementId: "G-2E8ZKCHL03"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
