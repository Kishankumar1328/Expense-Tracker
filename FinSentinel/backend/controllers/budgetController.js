const db = require('../config/database');

// Get all budgets
exports.getBudgets = (req, res) => {
    const userId = req.userId;

    db.all(
        'SELECT * FROM budgets WHERE user_id = ? ORDER BY created_at DESC',
        [userId],
        (err, budgets) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error fetching budgets',
                });
            }

            res.json(budgets);
        }
    );
};

// Create budget
exports.createBudget = (req, res) => {
    const userId = req.userId;
    const { category, amount, period, start_date, end_date } = req.body;

    if (!category || !amount || !start_date || !end_date) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields',
        });
    }

    db.run(
        'INSERT INTO budgets (user_id, category, amount, period, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, category, amount, period || 'monthly', start_date, end_date],
        function (err) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error creating budget',
                });
            }

            db.get('SELECT * FROM budgets WHERE id = ?', [this.lastID], (err, budget) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Error fetching budget',
                    });
                }

                res.status(201).json(budget);
            });
        }
    );
};

// Update budget
exports.updateBudget = (req, res) => {
    const userId = req.userId;
    const { id } = req.params;
    const { category, amount, period, start_date, end_date } = req.body;

    db.run(
        'UPDATE budgets SET category = ?, amount = ?, period = ?, start_date = ?, end_date = ? WHERE id = ? AND user_id = ?',
        [category, amount, period, start_date, end_date, id, userId],
        function (err) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error updating budget',
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Budget not found',
                });
            }

            db.get('SELECT * FROM budgets WHERE id = ?', [id], (err, budget) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Error fetching budget',
                    });
                }

                res.json(budget);
            });
        }
    );
};
