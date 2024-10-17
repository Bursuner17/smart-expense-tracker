const pool = require('./db'); // Import your database connection

// Function to add an expense
async function addExpense(data) {
    const { user_id, amount, description, date, category, is_recurring } = data;
    try {
        const result = await pool.query(
            'INSERT INTO expenses (user_id, amount, description, date, category, is_recurring) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [user_id, amount, description, date, category, is_recurring]
        );
        return result.rows[0]; // Return the newly created expense
    } catch (error) {
        console.error('Error adding expense:', error);
        throw new Error('Failed to add expense. Please try again later.');
    }
}

// Function to get all expenses
async function getAllExpenses() {
    try {
        const result = await pool.query('SELECT * FROM expenses');
        return result.rows; // Return all expenses
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw new Error('Failed to fetch expenses. Please try again later.');
    }
}

// Function to update an expense
async function updateExpense(id, data) {
    const { amount, description, date, category, is_recurring } = data;
    try {
        const result = await pool.query(
            'UPDATE expenses SET amount = $1, description = $2, date = $3, category = $4, is_recurring = $5 WHERE id = $6 RETURNING *',
            [amount, description, date, category, is_recurring, id]
        );
        if (result.rowCount === 0) {
            throw new Error('Expense not found'); // Handle case where no expense is updated
        }
        return result.rows[0]; // Return the updated expense
    } catch (error) {
        console.error('Error updating expense:', error);
        throw new Error('Failed to update expense. Please try again later.');
    }
}

// Function to delete an expense
async function deleteExpense(id) {
    try {
        const result = await pool.query('DELETE FROM expenses WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            throw new Error('Expense not found'); // Handle case where no expense is deleted
        }
        return result.rows[0]; // Return the deleted expense
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw new Error('Failed to delete expense. Please try again later.');
    }
}

module.exports = { addExpense, getAllExpenses, updateExpense, deleteExpense };
