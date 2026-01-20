const db = require('../config/database');

// Get all expenses
exports.getExpenses = (req, res) => {
    const userId = req.userId;

    db.all(
        'SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC',
        [userId],
        (err, expenses) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error fetching expenses',
                });
            }

            res.json(expenses);
        }
    );
};

// Add expense
exports.addExpense = (req, res) => {
    const userId = req.userId;
    const { description, amount, category, type, date } = req.body;

    if (!description || !amount || !category || !date) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields',
        });
    }

    db.run(
        'INSERT INTO expenses (user_id, description, amount, category, type, date) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, description, amount, category, type || 'expense', date],
        function (err) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error adding expense',
                });
            }

            db.get('SELECT * FROM expenses WHERE id = ?', [this.lastID], (err, expense) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Error fetching expense',
                    });
                }

                res.status(201).json(expense);
            });
        }
    );
};

// Update expense
exports.updateExpense = (req, res) => {
    const userId = req.userId;
    const { id } = req.params;
    const { description, amount, category, type, date } = req.body;

    db.run(
        'UPDATE expenses SET description = ?, amount = ?, category = ?, type = ?, date = ? WHERE id = ? AND user_id = ?',
        [description, amount, category, type, date, id, userId],
        function (err) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error updating expense',
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Expense not found',
                });
            }

            db.get('SELECT * FROM expenses WHERE id = ?', [id], (err, expense) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Error fetching expense',
                    });
                }

                res.json(expense);
            });
        }
    );
};

// Delete expense
exports.deleteExpense = (req, res) => {
    const userId = req.userId;
    const { id } = req.params;

    db.run(
        'DELETE FROM expenses WHERE id = ? AND user_id = ?',
        [id, userId],
        function (err) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error deleting expense',
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Expense not found',
                });
            }

            res.json({
                success: true,
                message: 'Expense deleted successfully',
            });
        }
    );
};

// Get summary
exports.getSummary = (req, res) => {
    const userId = req.userId;

    db.all(
        'SELECT type, SUM(amount) as total FROM expenses WHERE user_id = ? GROUP BY type',
        [userId],
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error fetching summary',
                });
            }

            let totalIncome = 0;
            let totalExpenses = 0;

            results.forEach((row) => {
                if (row.type === 'income') {
                    totalIncome = row.total;
                } else {
                    totalExpenses = row.total;
                }
            });

            res.json({
                totalIncome,
                totalExpenses,
                balance: totalIncome - totalExpenses,
                monthlyChange: 0, // Can be calculated based on previous month
            });
        }
    );
};
