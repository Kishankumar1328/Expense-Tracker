// Financial simulation controller

exports.runSimulation = (req, res) => {
    try {
        const { type, initialAmount, monthlyContribution, interestRate, years } = req.body;

        if (!initialAmount || !monthlyContribution || !interestRate || !years) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }

        const initial = parseFloat(initialAmount);
        const monthly = parseFloat(monthlyContribution);
        const rate = parseFloat(interestRate) / 100 / 12; // Monthly rate
        const months = parseInt(years) * 12;

        let balance = initial;
        const chartData = [];

        // Calculate compound interest with monthly contributions
        for (let month = 0; month <= months; month++) {
            if (month > 0) {
                balance = balance * (1 + rate) + monthly;
            }

            // Add data point for chart (every 3 months)
            if (month % 3 === 0) {
                chartData.push({
                    x: month / 12,
                    y: Math.round(balance),
                });
            }
        }

        const totalInvested = initial + monthly * months;
        const totalReturns = balance - totalInvested;

        res.json({
            success: true,
            data: {
                totalInvested: Math.round(totalInvested),
                totalReturns: Math.round(totalReturns),
                finalAmount: Math.round(balance),
                chartData,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Simulation error',
        });
    }
};
