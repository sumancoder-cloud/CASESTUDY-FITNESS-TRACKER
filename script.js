// Navigation and Page Handling
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link, .btn[data-page]');
    const pages = document.querySelectorAll('.page');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = navLinksContainer.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
        spans[1].style.opacity = navLinksContainer.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navLinksContainer.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : '';
    });

    // Page navigation
    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));
        
        const targetPage = document.getElementById(pageId);
        const targetLink = document.querySelector(`[data-page="${pageId}"]`);
        
        if (targetPage) targetPage.classList.add('active');
        if (targetLink && targetLink.classList.contains('nav-link')) {
            targetLink.classList.add('active');
        }

        

        // Close mobile menu when navigating
        navLinksContainer.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach(span => span.style.transform = '');
        spans[1].style.opacity = '1';
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Calendar Implementation
    const calendar = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');

    let currentDate = new Date();

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        currentMonthElement.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        calendar.innerHTML = '';
        
        // Add day headers
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day header';
            dayHeader.textContent = day;
            calendar.appendChild(dayHeader);
        });
        
        // Add empty cells for days before first day of month
        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendar.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // Add workout indicator (demo data)
            if ([3, 7, 12, 15, 20, 24, 28].includes(day)) {
                dayElement.classList.add('has-workout');
            }
            
            calendar.appendChild(dayElement);
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Initialize calendar
    renderCalendar();

    // Progress Charts
    const workoutChart = document.getElementById('workoutChart');
    const weightChart = document.getElementById('weightChart');

    if (workoutChart) {
        new Chart(workoutChart, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Workouts Completed',
                    data: [3, 4, 3, 5],
                    borderColor: '#3b82f6',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 7
                    }
                }
            }
        });
    }

    if (weightChart) {
        new Chart(weightChart, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Weight (kg)',
                    data: [80, 79, 78.5, 77.5],
                    borderColor: '#10b981',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form handling logic here
            alert('Form submitted! (Demo only)');
        });
    });

    // Meal Planning
    const addMealButtons = document.querySelectorAll('.add-meal');
    addMealButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mealType = button.getAttribute('data-meal');
            const mealItems = document.getElementById(mealType);
            
            // Demo: Add a new meal item
            const newMeal = document.createElement('div');
            newMeal.className = 'meal-item';
            newMeal.innerHTML = `
                <span>New Meal Item</span>
                <div class="meal-macros">
                    <span>300 cal</span>
                    <span>20g protein</span>
                </div>
            `;
            
            mealItems.appendChild(newMeal);
        });
    });
});