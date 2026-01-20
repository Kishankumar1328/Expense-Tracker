import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useFinance } from '../context/FinanceContext';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const InsightsScreen = () => {
    const { colors } = useTheme();
    const { insights, fetchInsights } = useFinance();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchInsights();
        setRefreshing(false);
    };

    const getInsightIcon = (type) => {
        switch (type) {
            case 'warning':
                return { name: 'alert-circle', color: colors.warning };
            case 'success':
                return { name: 'check-circle', color: colors.success };
            case 'info':
                return { name: 'information', color: colors.primary };
            default:
                return { name: 'lightbulb', color: colors.primary };
        }
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
                    AI Insights
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: colors.textSecondary,
                        marginTop: 4,
                    }}
                >
                    Personalized financial recommendations
                </Text>
            </View>

            {insights.length === 0 ? (
                <EmptyState
                    icon="lightbulb-outline"
                    title="No insights yet"
                    message="We're analyzing your spending patterns. Check back soon for personalized recommendations."
                />
            ) : (
                <ScrollView
                    contentContainerStyle={{ padding: 16 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {insights.map((insight, index) => {
                        const iconData = getInsightIcon(insight.type);
                        return (
                            <Card key={index} style={{ marginBottom: 16 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View
                                        style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 24,
                                            backgroundColor: iconData.color + '20',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: 16,
                                        }}
                                    >
                                        <Icon name={iconData.name} size={24} color={iconData.color} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                fontWeight: '700',
                                                color: colors.text,
                                                marginBottom: 8,
                                            }}
                                        >
                                            {insight.title}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                color: colors.textSecondary,
                                                lineHeight: 20,
                                            }}
                                        >
                                            {insight.description}
                                        </Text>
                                        {insight.recommendation && (
                                            <View
                                                style={{
                                                    marginTop: 12,
                                                    padding: 12,
                                                    backgroundColor: colors.primary + '10',
                                                    borderRadius: 8,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 13,
                                                        color: colors.primary,
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    💡 {insight.recommendation}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </Card>
                        );
                    })}
                </ScrollView>
            )}
        </View>
    );
};

export default InsightsScreen;
