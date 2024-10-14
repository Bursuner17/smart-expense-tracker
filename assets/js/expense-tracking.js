import Chart from 'https://cdn.jsdelivr.net/npm/chart.js'; // Import Chart.js for visual analytics

// Sample data storage (replace with localStorage or database in production)
let expenses = [];

// Helper function to display expenses on the page
const displayExpenses = (filteredExpenses = expenses) => {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = ''; // Clear the list

    filteredExpenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.date} - ${expense.category}: $${expense.amount.toFixed(2)} - ${expense.description}`;
        expenseList.appendChild(listItem);
    });
};

// Chart rendering function
let expenseChart;
const renderChart = () => {
    const categories = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const ctx = document.getElementById('expense-chart').getContext('2d');
    
    // Destroy previous chart instance if it exists
    if (expenseChart) expenseChart.destroy();

    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
};

// Form submission handling
document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const isRecurring = document.getElementById('is-recurring').checked;

    const newExpense = { amount, description, date, category, isRecurring };
    expenses.push(newExpense);

    displayExpenses();
    renderChart();

    this.reset();
});

// Filter and sort handling
document.getElementById('filter-category').addEventListener('change', function() {
    const filterCategory = this.value;
    const filteredExpenses = filterCategory === 'all' ? expenses : expenses.filter(e => e.category === filterCategory);
    displayExpenses(filteredExpenses);
});

document.getElementById('sort-expenses').addEventListener('change', function() {
    const sortType = this.value;
    const sortedExpenses = [...expenses]; // Clone expenses array

    sortedExpenses.sort((a, b) => sortType === 'date' 
        ? new Date(a.date) - new Date(b.date) 
        : a.amount - b.amount
    );

    displayExpenses(sortedExpenses);
});

// Recurring expense tracking (runs daily)
const trackRecurringExpenses = () => {
    const today = new Date().toISOString().split('T')[0];

    expenses.filter(expense => expense.isRecurring).forEach(expense => {
        // Check if expense is recurring and hasn't been tracked today
        if (!expense.lastTracked || expense.lastTracked !== today) {
            const newRecurringExpense = { ...expense, date: today, lastTracked: today };
            expenses.push(newRecurringExpense);
            displayExpenses();
            renderChart();
        }
    });
};

// Set interval to check for recurring expenses every day
setInterval(trackRecurringExpenses, 86400000); // 24 hours in milliseconds

// Initial render
displayExpenses();
renderChart();
