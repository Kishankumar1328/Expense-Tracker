const db = require('../config/database');

// Get AI insights
exports.getInsights = (req, res) => {
    const userId = req.userId;

    // First, get user's expenses to generate insights
    db.all(
        'SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC LIMIT 100',
        [userId],
        (err, expenses) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error fetching expenses',
                });
            }

            // Generate mock AI insights based on spending patterns
            const insights = generateInsights(expenses);

            // Clear old insights before inserting new ones to prevent duplicates
            db.run('DELETE FROM ai_insights WHERE user_id = ?', [userId], (deleteErr) => {
                if (deleteErr) {
                    console.error('Error clearing old insights:', deleteErr);
                }

                // Store insights in database
                const insertPromises = insights.map((insight) => {
                    return new Promise((resolve) => {
                        db.run(
                            'INSERT INTO ai_insights (user_id, title, description, type, recommendation) VALUES (?, ?, ?, ?, ?)',
                            [userId, insight.title, insight.description, insight.type, insight.recommendation],
                            (insertErr) => {
                                if (insertErr) console.error('Error storing insight:', insertErr);
                                resolve();
                            }
                        );
                    });
                });

                Promise.all(insertPromises).then(() => {
                    res.json({
                        success: true,
                        data: insights,
                    });
                });
            });
        }
    );
};

// Mock AI insight generation
const generateInsights = (expenses) => {
    const insights = [];

    if (!expenses || expenses.length === 0) {
        insights.push({
            title: 'Start Tracking',
            description: 'Add your first expense to get personalized financial insights.',
            type: 'info',
            recommendation: 'Begin by logging your daily expenses to help us analyze your spending patterns.',
        });
        return insights;
    }

    // Calculate category spending
    const categoryTotals = {};
    let totalExpenses = 0;

    expenses.forEach((expense) => {
        if (expense.type === 'expense') {
            categoryTotals[expense.category] =
                (categoryTotals[expense.category] || 0) + parseFloat(expense.amount);
            totalExpenses += parseFloat(expense.amount);
        }
    });

    // Find highest spending category
    let highestCategory = null;
    let highestAmount = 0;

    Object.keys(categoryTotals).forEach((category) => {
        if (categoryTotals[category] > highestAmount) {
            highestAmount = categoryTotals[category];
            highestCategory = category;
        }
    });

    if (highestCategory) {
        const percentage = ((highestAmount / totalExpenses) * 100).toFixed(1);
        insights.push({
            title: `High ${highestCategory} Spending`,
            description: `You've spent ₹${highestAmount.toFixed(
                2
            )} on ${highestCategory} this month, which is ${percentage}% of your total expenses.`,
            type: 'warning',
            recommendation: `Consider setting a budget limit for ${highestCategory} to better control your spending.`,
        });
    }

    // Savings recommendation
    const avgDailyExpense = totalExpenses / 30;
    const suggestedSavings = avgDailyExpense * 0.2 * 30;

    insights.push({
        title: 'Savings Opportunity',
        description: `Based on your spending patterns, you could potentially save ₹${suggestedSavings.toFixed(
            2
        )} per month by reducing discretionary expenses by 20%.`,
        type: 'success',
        recommendation: 'Start with small changes like cooking at home more often or reducing subscription services.',
    });

    // Spending trend
    insights.push({
        title: 'Spending Pattern Analysis',
        description: `Your average daily expense is ₹${avgDailyExpense.toFixed(
            2
        )}. Maintaining awareness of daily spending can help you stay within budget.`,
        type: 'info',
        recommendation: 'Track your expenses daily to identify areas where you can cut back.',
    });

    return insights;
};
