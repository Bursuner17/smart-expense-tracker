// assets/js/script.js

// Function to display expense on the UI
const displayExpense = (expenseData) => {
    const expenseList = document.getElementById('expense-list'); // Assumes there's a list element in the HTML
    const listItem = document.createElement('li');
    listItem.textContent = `Amount: $${expenseData.amount.toFixed(2)}, Description: ${expenseData.description}`; // Format amount to 2 decimal places
    expenseList.appendChild(listItem);
};

// Example of form validation and handling
document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;

    // Basic validation
    if (isNaN(amount) || amount <= 0 || !description.trim()) {
        alert("Please enter a valid amount and description."); // Added trim() to avoid empty spaces
        return;
    }

    // Call the addExpense function with valid data
    // addExpense({ amount, description }); // Commented out to avoid Firebase call
    displayExpense({ amount, description }); // Update UI with the new expense

    // Reset form fields
    document.getElementById('expense-form').reset();
});

// Function to toggle feature content
function toggleFeatureContent(feature) {
    // Hide content of the previously opened card
    const allFeatures = document.querySelectorAll('.feature');
    allFeatures.forEach(f => {
        if (f !== feature) {
            const content = f.querySelector('.feature-content');
            if (content) {
                content.style.display = 'none'; // Hide content of other features
                f.classList.remove('active'); // Remove active class
            }
        }
    });

    // Toggle the clicked feature
    feature.classList.toggle('active'); // Toggle the active class
    const content = feature.querySelector('.feature-content');
    if (content) {
        content.style.display = content.style.display === 'block' ? 'none' : 'block'; // Show/hide content
    }

    // Redirect to the corresponding feature page (update with actual paths)
    const featureName = feature.getAttribute('data-feature-name'); // Assuming each feature has a data attribute for the feature name
    if (featureName) {
        window.location.href = `features/${featureName}.html`; // Redirect to feature page
    }
}

// Add click event listeners to each feature card for toggling content
document.querySelectorAll('.feature').forEach(feature => {
    feature.addEventListener('click', () => toggleFeatureContent(feature));
});
// Sample expense data
const expenses = [
    { date: "2024-10-01", category: "Food", amount: 50 },
    { date: "2024-10-05", category: "Transport", amount: 20 },
    { date: "2024-10-10", category: "Entertainment", amount: 30 },
    { date: "2024-10-12", category: "Groceries", amount: 40 }
];

// Function to render the expense list
function renderExpenseList() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = ''; // Clear existing items
    expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${expense.date} - ${expense.category}</span><span>$${expense.amount}</span>`;
        expenseList.appendChild(listItem);
    });
}

// Function to render the chart
function renderExpenseChart() {
    const ctx = document.getElementById('expense-chart').getContext('2d');
    const categories = expenses.map(expense => expense.category);
    const amounts = expenses.map(expense => expense.amount);

    new Chart(ctx, {
        type: 'bar', // Change to 'pie' or 'line' for different chart types
        data: {
            labels: categories,
            datasets: [{
                label: 'Expenses by Category',
                data: amounts,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize functions on page load
document.addEventListener('DOMContentLoaded', () => {
    renderExpenseList();
    renderExpenseChart();
});
