// Chart Initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeWeightChart();
    initializeCompositionChart();
});

function initializeWeightChart() {
    const ctx = document.getElementById('weightChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Weight (kg)',
                data: [75, 74, 73, 72, 71, 70],
                borderColor: '#6366f1',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function initializeCompositionChart() {
    const ctx = document.getElementById('compositionChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Fat Mass', 'Muscle Mass', 'Other'],
            datasets: [{
                data: [20, 40, 40],
                backgroundColor: ['#ef4444', '#6366f1', '#10b981']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            cutout: '70%'
        }
    });
}

// Progress Tracking Class
class ProgressTracker {
    constructor() {
        this.data = {
            weight: [],
            bodyFat: [],
            muscleMass: [],
            workouts: []
        };
    }

    addWeight(value, date = new Date()) {
        this.data.weight.push({ value, date });
        this.updateCharts();
    }

    addBodyFat(value, date = new Date()) {
        this.data.bodyFat.push({ value, date });
        this.updateCharts();
    }

    addMuscleMass(value, date = new Date()) {
        this.data.muscleMass.push({ value, date });
        this.updateCharts();
    }

    addWorkout(type, duration, caloriesBurned, date = new Date()) {
        this.data.workouts.push({
            type,
            duration,
            caloriesBurned,
            date,
            status: 'completed'
        });
        this.updateWorkoutLog();
    }

    updateCharts() {
        // Update charts with new data
        // This would update the Chart.js instances
    }

    updateWorkoutLog() {
        // Update the workout log table
        const workoutLog = document.querySelector('tbody');
        if (!workoutLog) return;

        const workouts = this.data.workouts
            .sort((a, b) => b.date - a.date)
            .slice(0, 5);

        workoutLog.innerHTML = workouts.map(workout => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${workout.date.toLocaleDateString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${workout.type}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${workout.duration} min
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${workout.caloriesBurned} kcal
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        ${workout.status}
                    </span>
                </td>
            </tr>
        `).join('');
    }
}

// Initialize Progress Tracker
const tracker = new ProgressTracker();

// Add sample data
tracker.addWorkout('Weight Training', 45, 320);
tracker.addWorkout('Cardio', 30, 250);