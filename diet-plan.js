// Diet Plan Management
document.addEventListener('DOMContentLoaded', () => {
    initializeDietPlan();
    setupWaterTracking();
    setupMealChecklist();
});

class DietPlan {
    constructor() {
        this.currentPlan = {
            calories: 2500,
            macros: {
                protein: 180,
                carbs: 250,
                fats: 70
            },
            meals: {
                breakfast: [],
                lunch: [],
                dinner: [],
                snacks: []
            },
            waterIntake: {
                current: 1.8,
                target: 3.0
            }
        };
    }

    updateWaterIntake(amount) {
        this.currentPlan.waterIntake.current = Math.min(
            this.currentPlan.waterIntake.current + amount,
            this.currentPlan.waterIntake.target
        );
        this.updateWaterDisplay();
    }

    updateWaterDisplay() {
        const progress = (this.currentPlan.waterIntake.current / this.currentPlan.waterIntake.target) * 100;
        const waterProgress = document.getElementById('waterProgress');
        const waterCount = document.getElementById('waterCount');
        
        if (waterProgress && waterCount) {
            waterProgress.style.width = `${progress}%`;
            waterCount.textContent = `${this.currentPlan.waterIntake.current}L / ${this.currentPlan.waterIntake.target}L`;
        }
    }

    generateNewPlan() {
        // This would typically make an API call to get a new plan
        console.log('Generating new diet plan...');
    }
}

function setupWaterTracking() {
    const addWaterBtn = document.getElementById('addWater');
    const dietPlan = new DietPlan();

    if (addWaterBtn) {
        addWaterBtn.addEventListener('click', () => {
            dietPlan.updateWaterIntake(0.25); // Add 250ml
        });
    }
}

function setupMealChecklist() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const label = e.target.nextElementSibling;
            if (label) {
                if (e.target.checked) {
                    label.classList.add('line-through', 'text-gray-400');
                } else {
                    label.classList.remove('line-through', 'text-gray-400');
                }
            }
            updateProgress();
        });
    });
}

function updateProgress() {
    const totalItems = document.querySelectorAll('input[type="checkbox"]').length;
    const checkedItems = document.querySelectorAll('input[type="checkbox"]:checked').length;
    const progress = (checkedItems / totalItems) * 100;

    // Update progress indicators if needed
    console.log(`Diet plan progress: ${progress}%`);
}

function initializeDietPlan() {
    const generatePlanBtn = document.getElementById('generatePlanBtn');
    const dietPlan = new DietPlan();

    if (generatePlanBtn) {
        generatePlanBtn.addEventListener('click', () => {
            dietPlan.generateNewPlan();
        });
    }

    // Initialize water tracking display
    dietPlan.updateWaterDisplay();
}