import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useFinance } from '../context/FinanceContext';
import Card from '../components/Card';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
// import { VictoryPie, VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory-native';
import { format } from 'date-fns';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
    const { colors, isDark } = useTheme();
    const { user } = useAuth();
    const { summary, expenses, insights, loading, refreshAll } = useFinance();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refreshAll();
        setRefreshing(false);
    };

    const getCategoryData = () => {
        const categoryTotals = {};
        expenses.forEach((expense) => {
            if (categoryTotals[expense.category]) {
                categoryTotals[expense.category] += parseFloat(expense.amount);
            } else {
                categoryTotals[expense.category] = parseFloat(expense.amount);
            }
        });

        return Object.keys(categoryTotals).map((category) => ({
            x: category,
            y: categoryTotals[category],
        }));
    };

    const getMonthlyTrend = () => {
        const monthlyData = {};
        expenses.forEach((expense) => {
            const month = format(new Date(expense.date), 'MMM');
            if (monthlyData[month]) {
                monthlyData[month] += parseFloat(expense.amount);
            } else {
                monthlyData[month] = parseFloat(expense.amount);
            }
        });

        return Object.keys(monthlyData).map((month, index) => ({
            x: index + 1,
            y: monthlyData[month],
            label: month,
        }));
    };

    const formatCurrency = (amount) => {
        return `₹${parseFloat(amount).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    const categoryColors = ['#2196F3', '#4CAF50', '#FF9800', '#E91E63', '#9C27B0', '#00BCD4'];

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <LinearGradient
                colors={isDark ? ['#1F2937', '#111827'] : ['#2196F3', '#1976D2']}
                style={{
                    paddingTop: 60,
                    paddingBottom: 24,
                    paddingHorizontal: 24,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontSize: 16,
                                color: isDark ? colors.textSecondary : 'rgba(255, 255, 255, 0.9)',
                            }}
                        >
                            Welcome back,
                        </Text>
                        <Text
                            style={{
                                fontSize: 28,
                                fontWeight: '900',
                                color: isDark ? colors.text : '#FFFFFF',
                                marginTop: 4,
                            }}
                        >
                            {user?.name || 'User'}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Profile')}
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 24,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Icon name="account" size={28} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 16 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Financial Overview */}
                <Card
                    gradient
                    gradientColors={['#2196F3', '#1976D2']}
                    style={{ marginBottom: 16 }}
                >
                    <View>
                        <Text
                            style={{
                                fontSize: 14,
                                color: 'rgba(255, 255, 255, 0.9)',
                                marginBottom: 8,
                            }}
                        >
                            Total Balance
                        </Text>
                        <Text
                            style={{
                                fontSize: 36,
                                fontWeight: '900',
                                color: '#FFFFFF',
                                marginBottom: 16,
                            }}
                        >
                            {formatCurrency(summary.balance)}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="arrow-down" size={16} color="#4CAF50" />
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            marginLeft: 4,
                                        }}
                                    >
                                        Income
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: '700',
                                        color: '#FFFFFF',
                                        marginTop: 4,
                                    }}
                                >
                                    {formatCurrency(summary.totalIncome)}
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="arrow-up" size={16} color="#EF4444" />
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            marginLeft: 4,
                                        }}
                                    >
                                        Expenses
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: '700',
                                        color: '#FFFFFF',
                                        marginTop: 4,
                                    }}
                                >
                                    {formatCurrency(summary.totalExpenses)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Card>

                {/* AI Insight Card */}
                {insights.length > 0 && (
                    <Card
                        title="💡 AI Insight"
                        style={{ marginBottom: 16 }}
                        onPress={() => navigation.navigate('Insights')}
                    >
                        <View
                            style={{
                                backgroundColor: isDark ? '#374151' : '#E3F2FD',
                                borderRadius: 12,
                                padding: 16,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: '600',
                                    color: colors.text,
                                    marginBottom: 8,
                                }}
                            >
                                {insights[0].title}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: colors.textSecondary,
                                    lineHeight: 20,
                                }}
                            >
                                {insights[0].description}
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: colors.primary,
                                        fontWeight: '600',
                                    }}
                                >
                                    View all insights
                                </Text>
                                <Icon name="chevron-right" size={20} color={colors.primary} />
                            </View>
                        </View>
                    </Card>
                )}

                {/* Quick Actions */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 16,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Expenses')}
                        style={{
                            flex: 1,
                            marginRight: 8,
                        }}
                    >
                        <Card>
                            <View style={{ alignItems: 'center' }}>
                                <View
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 28,
                                        backgroundColor: colors.primary + '20',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: 12,
                                    }}
                                >
                                    <Icon name="plus" size={28} color={colors.primary} />
                                </View>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '600',
                                        color: colors.text,
                                    }}
                                >
                                    Add Expense
                                </Text>
                            </View>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Simulator')}
                        style={{
                            flex: 1,
                            marginLeft: 8,
                        }}
                    >
                        <Card>
                            <View style={{ alignItems: 'center' }}>
                                <View
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 28,
                                        backgroundColor: colors.success + '20',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: 12,
                                    }}
                                >
                                    <Icon name="chart-line" size={28} color={colors.success} />
                                </View>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '600',
                                        color: colors.text,
                                    }}
                                >
                                    Simulate
                                </Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                </View>

                {/* Spending by Category */}
                {expenses.length > 0 && (
                    <Card title="Spending by Category" style={{ marginBottom: 16 }}>
                        <View style={{ alignItems: 'center', marginVertical: 16 }}>
                            {/* <VictoryPie
                                data={getCategoryData()}
                                width={width - 80}
                                height={200}
                                colorScale={categoryColors}
                                innerRadius={60}
                                labelRadius={80}
                                style={{
                                    labels: {
                                        fill: colors.text,
                                        fontSize: 12,
                                        fontWeight: '600',
                                    },
                                }}
                            /> */}
                            <Text style={{ color: colors.text, padding: 20 }}>Chart Disabled for Debugging</Text>
                        </View>
                    </Card>
                )}

                {/* Recent Transactions */}
                <Card
                    title="Recent Transactions"
                    headerRight={
                        <TouchableOpacity onPress={() => navigation.navigate('Expenses')}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: colors.primary,
                                    fontWeight: '600',
                                }}
                            >
                                View All
                            </Text>
                        </TouchableOpacity>
                    }
                >
                    {expenses.slice(0, 5).map((expense, index) => (
                        <View
                            key={expense.id}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingVertical: 12,
                                borderBottomWidth: index < 4 ? 1 : 0,
                                borderBottomColor: colors.border,
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor: colors.primary + '20',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: 12,
                                    }}
                                >
                                    <Icon name="cash" size={20} color={colors.primary} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '600',
                                            color: colors.text,
                                        }}
                                    >
                                        {expense.description}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: colors.textSecondary,
                                            marginTop: 2,
                                        }}
                                    >
                                        {expense.category} • {format(new Date(expense.date), 'MMM dd')}
                                    </Text>
                                </View>
                            </View>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: '700',
                                    color: expense.type === 'income' ? colors.success : colors.danger,
                                }}
                            >
                                {expense.type === 'income' ? '+' : '-'}
                                {formatCurrency(expense.amount)}
                            </Text>
                        </View>
                    ))}
                </Card>
            </ScrollView>
        </View>
    );
};

export default DashboardScreen;
