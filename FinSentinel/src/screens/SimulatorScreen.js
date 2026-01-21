import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useFinance } from '../context/FinanceContext';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
// import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryArea } from 'victory-native';

const { width } = Dimensions.get('window');

const SimulatorScreen = () => {
    const { colors } = useTheme();
    const { runSimulation } = useFinance();
    const [simulationType, setSimulationType] = useState('savings');
    const [formData, setFormData] = useState({
        initialAmount: '',
        monthlyContribution: '',
        interestRate: '',
        years: '',
        targetAmount: '',
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSimulate = async () => {
        setLoading(true);
        const response = await runSimulation({
            type: simulationType,
            ...formData,
        });
        setLoading(false);

        if (response.success) {
            setResult(response.data);
        }
    };

    const formatCurrency = (amount) => {
        return `₹${parseFloat(amount).toLocaleString('en-IN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })}`;
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View
                style={{
                    paddingTop: 60,
                    paddingBottom: 16,
                    paddingHorizontal: 24,
                    backgroundColor: colors.surface,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                }}
            >
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: '900',
                        color: colors.text,
                    }}
                >
                    Financial Simulator
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: colors.textSecondary,
                        marginTop: 4,
                    }}
                >
                    Plan your financial future with what-if scenarios
                </Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {/* Simulation Type Selector */}
                <Card style={{ marginBottom: 16 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '700',
                            color: colors.text,
                            marginBottom: 12,
                        }}
                    >
                        Simulation Type
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => setSimulationType('savings')}
                            style={{
                                flex: 1,
                                paddingVertical: 12,
                                borderRadius: 12,
                                backgroundColor:
                                    simulationType === 'savings' ? colors.primary : colors.card,
                                marginRight: 8,
                                alignItems: 'center',
                            }}
                        >
                            <Icon
                                name="piggy-bank"
                                size={24}
                                color={simulationType === 'savings' ? '#FFFFFF' : colors.text}
                            />
                            <Text
                                style={{
                                    color: simulationType === 'savings' ? '#FFFFFF' : colors.text,
                                    fontWeight: '600',
                                    marginTop: 4,
                                }}
                            >
                                Savings
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSimulationType('investment')}
                            style={{
                                flex: 1,
                                paddingVertical: 12,
                                borderRadius: 12,
                                backgroundColor:
                                    simulationType === 'investment' ? colors.primary : colors.card,
                                marginLeft: 8,
                                alignItems: 'center',
                            }}
                        >
                            <Icon
                                name="chart-line"
                                size={24}
                                color={simulationType === 'investment' ? '#FFFFFF' : colors.text}
                            />
                            <Text
                                style={{
                                    color:
                                        simulationType === 'investment' ? '#FFFFFF' : colors.text,
                                    fontWeight: '600',
                                    marginTop: 4,
                                }}
                            >
                                Investment
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Card>

                {/* Input Form */}
                <Card style={{ marginBottom: 16 }}>
                    <Input
                        label="Initial Amount (₹)"
                        value={formData.initialAmount}
                        onChangeText={(text) =>
                            setFormData({ ...formData, initialAmount: text })
                        }
                        placeholder="10000"
                        keyboardType="numeric"
                        icon="currency-inr"
                    />
                    <Input
                        label="Monthly Contribution (₹)"
                        value={formData.monthlyContribution}
                        onChangeText={(text) =>
                            setFormData({ ...formData, monthlyContribution: text })
                        }
                        placeholder="5000"
                        keyboardType="numeric"
                        icon="calendar-month"
                    />
                    <Input
                        label="Expected Return Rate (%)"
                        value={formData.interestRate}
                        onChangeText={(text) =>
                            setFormData({ ...formData, interestRate: text })
                        }
                        placeholder="12"
                        keyboardType="numeric"
                        icon="percent"
                    />
                    <Input
                        label="Time Period (Years)"
                        value={formData.years}
                        onChangeText={(text) => setFormData({ ...formData, years: text })}
                        placeholder="10"
                        keyboardType="numeric"
                        icon="clock-outline"
                    />
                    <Button
                        title="Run Simulation"
                        onPress={handleSimulate}
                        loading={loading}
                        fullWidth
                    />
                </Card>

                {/* Results */}
                {result && (
                    <>
                        <Card style={{ marginBottom: 16 }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '700',
                                    color: colors.text,
                                    marginBottom: 16,
                                }}
                            >
                                Projection Results
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 12,
                                }}
                            >
                                <Text style={{ fontSize: 14, color: colors.textSecondary }}>
                                    Total Investment
                                </Text>
                                <Text
                                    style={{ fontSize: 16, fontWeight: '700', color: colors.text }}
                                >
                                    {formatCurrency(result.totalInvested)}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 12,
                                }}
                            >
                                <Text style={{ fontSize: 14, color: colors.textSecondary }}>
                                    Expected Returns
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: '700',
                                        color: colors.success,
                                    }}
                                >
                                    {formatCurrency(result.totalReturns)}
                                </Text>
                            </View>
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: colors.border,
                                    marginVertical: 12,
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Text
                                    style={{ fontSize: 16, fontWeight: '700', color: colors.text }}
                                >
                                    Final Amount
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: '900',
                                        color: colors.primary,
                                    }}
                                >
                                    {formatCurrency(result.finalAmount)}
                                </Text>
                            </View>
                        </Card>

                        {result.chartData && (
                            <Card title="Growth Projection">
                                {/* <VictoryChart
                                    width={width - 80}
                                    height={250}
                                    theme={VictoryTheme.material}
                                >
                                    <VictoryAxis
                                        style={{
                                            axis: { stroke: colors.border },
                                            tickLabels: { fill: colors.textSecondary, fontSize: 10 },
                                        }}
                                    />
                                    <VictoryAxis
                                        dependentAxis
                                        style={{
                                            axis: { stroke: colors.border },
                                            tickLabels: { fill: colors.textSecondary, fontSize: 10 },
                                        }}
                                    />
                                    <VictoryArea
                                        data={result.chartData}
                                        style={{
                                            data: {
                                                fill: colors.primary + '40',
                                                stroke: colors.primary,
                                                strokeWidth: 2,
                                            },
                                        }}
                                    />
                                </VictoryChart> */}
                                <Text style={{ color: colors.text, textAlign: 'center' }}>Charts temporarily disabled</Text>
                            </Card>
                        )}
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default SimulatorScreen;
