const express = require('express');
const { body, validationResult } = require('express-validator'); // Import express-validator
const {
    addExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense
} = require('./expenseController');

const router = express.Router();

// Route to add an expense with validation
router.post(
    '/api/expenses',
    [
        // Validation checks for add expense
        body('name').notEmpty().withMessage('Name is required'),
        body('amount').isNumeric().withMessage('Amount must be a valid number'),
        body('category').notEmpty().withMessage('Category is required')
    ],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const expense = await addExpense(req.body);
            res.status(201).json(expense);  // Send created expense with 201 status
        } catch (error) {
            console.error('Error adding expense:', error);
            res.status(500).json({ error: 'Failed to add expense. Please try again later.' });
        }
    }
);

// Route to get all expenses
router.get('/api/expenses', async (req, res) => {
    try {
        const expenses = await getAllExpenses();
        res.status(200).json(expenses);  // Send all expenses with 200 status
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Failed to fetch expenses. Please try again later.' });
    }
});

// Route to update an expense
router.put('/api/expenses/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedExpense = await updateExpense(id, req.body);
        if (!updatedExpense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json(updatedExpense);  // Send updated expense with 200 status
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ error: 'Failed to update expense. Please try again later.' });
    }
});

// Route to delete an expense
router.delete('/api/expenses/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedExpense = await deleteExpense(id);
        if (!deletedExpense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(204).send();  // No content to send back for successful deletion
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ error: 'Failed to delete expense. Please try again later.' });
    }
});

module.exports = router;
