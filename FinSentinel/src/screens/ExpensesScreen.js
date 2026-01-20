import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal,
    Alert,
    FlatList,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useFinance } from '../context/FinanceContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import EmptyState from '../components/EmptyState';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { format } from 'date-fns';

const CATEGORIES = [
    { name: 'Food', icon: 'food' },
    { name: 'Transport', icon: 'car' },
    { name: 'Shopping', icon: 'shopping' },
    { name: 'Entertainment', icon: 'movie' },
    { name: 'Bills', icon: 'receipt' },
    { name: 'Health', icon: 'medical-bag' },
    { name: 'Education', icon: 'school' },
    { name: 'Other', icon: 'dots-horizontal' },
];

const ExpensesScreen = () => {
    const { colors } = useTheme();
    const { expenses, addExpense, updateExpense, deleteExpense } = useFinance();
    const [modalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: 'Food',
        type: 'expense',
        date: new Date().toISOString(),
    });
    const [loading, setLoading] = useState(false);
    const [filterCategory, setFilterCategory] = useState('All');

    const resetForm = () => {
        setFormData({
            description: '',
            amount: '',
            category: 'Food',
            type: 'expense',
            date: new Date().toISOString(),
        });
        setEditMode(false);
        setCurrentExpense(null);
    };

    const handleSubmit = async () => {
        if (!formData.description || !formData.amount) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        setLoading(true);
        const result = editMode
            ? await updateExpense(currentExpense.id, formData)
            : await addExpense(formData);
        setLoading(false);

        if (result.success) {
            setModalVisible(false);
            resetForm();
        } else {
            Alert.alert('Error', result.message);
        }
    };

    const handleEdit = (expense) => {
        setCurrentExpense(expense);
        setFormData({
            description: expense.description,
            amount: expense.amount.toString(),
            category: expense.category,
            type: expense.type,
            date: expense.date,
        });
        setEditMode(true);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        Alert.alert(
            'Delete Expense',
            'Are you sure you want to delete this expense?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const result = await deleteExpense(id);
                        if (!result.success) {
                            Alert.alert('Error', result.message);
                        }
                    },
                },
            ]
        );
    };

    const filteredExpenses =
        filterCategory === 'All'
            ? expenses
            : expenses.filter((exp) => exp.category === filterCategory);

    const formatCurrency = (amount) => {
        return `₹${parseFloat(amount).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
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
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 28,
                            fontWeight: '900',
                            color: colors.text,
                        }}
                    >
                        Expenses
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            resetForm();
                            setModalVisible(true);
                        }}
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 24,
                            backgroundColor: colors.primary,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Icon name="plus" size={28} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* Category Filter */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 16 }}
                >
                    <TouchableOpacity
                        onPress={() => setFilterCategory('All')}
                        style={{
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 20,
                            backgroundColor:
                                filterCategory === 'All' ? colors.primary : colors.card,
                            marginRight: 8,
                        }}
                    >
                        <Text
                            style={{
                                color: filterCategory === 'All' ? '#FFFFFF' : colors.text,
                                fontWeight: '600',
                            }}
                        >
                            All
                        </Text>
                    </TouchableOpacity>
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat.name}
                            onPress={() => setFilterCategory(cat.name)}
                            style={{
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                borderRadius: 20,
                                backgroundColor:
                                    filterCategory === cat.name ? colors.primary : colors.card,
                                marginRight: 8,
                            }}
                        >
                            <Text
                                style={{
                                    color:
                                        filterCategory === cat.name ? '#FFFFFF' : colors.text,
                                    fontWeight: '600',
                                }}
                            >
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {filteredExpenses.length === 0 ? (
                <EmptyState
                    icon="cash-remove"
                    title="No expenses found"
                    message="Start tracking your expenses by adding your first transaction"
                    actionLabel="Add Expense"
                    onAction={() => {
                        resetForm();
                        setModalVisible(true);
                    }}
                />
            ) : (
                <FlatList
                    data={filteredExpenses}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 16 }}
                    renderItem={({ item }) => (
                        <Card style={{ marginBottom: 12 }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <View
                                    style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
                                >
                                    <View
                                        style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 24,
                                            backgroundColor:
                                                item.type === 'income'
                                                    ? colors.success + '20'
                                                    : colors.danger + '20',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: 12,
                                        }}
                                    >
                                        <Icon
                                            name={
                                                CATEGORIES.find((c) => c.name === item.category)?.icon ||
                                                'cash'
                                            }
                                            size={24}
                                            color={
                                                item.type === 'income' ? colors.success : colors.danger
                                            }
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: '600',
                                                color: colors.text,
                                            }}
                                        >
                                            {item.description}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: colors.textSecondary,
                                                marginTop: 4,
                                            }}
                                        >
                                            {item.category} • {format(new Date(item.date), 'MMM dd, yyyy')}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: '700',
                                            color:
                                                item.type === 'income' ? colors.success : colors.danger,
                                        }}
                                    >
                                        {item.type === 'income' ? '+' : '-'}
                                        {formatCurrency(item.amount)}
                                    </Text>
                                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                        <TouchableOpacity
                                            onPress={() => handleEdit(item)}
                                            style={{ marginRight: 12 }}
                                        >
                                            <Icon name="pencil" size={20} color={colors.primary} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                            <Icon name="delete" size={20} color={colors.danger} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    )}
                />
            )}

            {/* Add/Edit Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: 'flex-end',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: colors.surface,
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                            padding: 24,
                            maxHeight: '90%',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 24,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: '900',
                                    color: colors.text,
                                }}
                            >
                                {editMode ? 'Edit Expense' : 'Add Expense'}
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Icon name="close" size={28} color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Input
                                label="Description"
                                value={formData.description}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, description: text })
                                }
                                placeholder="Enter description"
                                icon="text"
                            />

                            <Input
                                label="Amount"
                                value={formData.amount}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, amount: text })
                                }
                                placeholder="Enter amount"
                                keyboardType="numeric"
                                icon="currency-inr"
                            />

                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: colors.text,
                                    marginBottom: 8,
                                }}
                            >
                                Category
                            </Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ marginBottom: 16 }}
                            >
                                {CATEGORIES.map((cat) => (
                                    <TouchableOpacity
                                        key={cat.name}
                                        onPress={() =>
                                            setFormData({ ...formData, category: cat.name })
                                        }
                                        style={{
                                            paddingHorizontal: 16,
                                            paddingVertical: 12,
                                            borderRadius: 12,
                                            backgroundColor:
                                                formData.category === cat.name
                                                    ? colors.primary
                                                    : colors.card,
                                            marginRight: 8,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Icon
                                            name={cat.icon}
                                            size={20}
                                            color={
                                                formData.category === cat.name
                                                    ? '#FFFFFF'
                                                    : colors.text
                                            }
                                            style={{ marginRight: 8 }}
                                        />
                                        <Text
                                            style={{
                                                color:
                                                    formData.category === cat.name
                                                        ? '#FFFFFF'
                                                        : colors.text,
                                                fontWeight: '600',
                                            }}
                                        >
                                            {cat.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: colors.text,
                                    marginBottom: 8,
                                }}
                            >
                                Type
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginBottom: 24,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => setFormData({ ...formData, type: 'expense' })}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 12,
                                        borderRadius: 12,
                                        backgroundColor:
                                            formData.type === 'expense' ? colors.danger : colors.card,
                                        marginRight: 8,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:
                                                formData.type === 'expense' ? '#FFFFFF' : colors.text,
                                            fontWeight: '600',
                                        }}
                                    >
                                        Expense
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setFormData({ ...formData, type: 'income' })}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 12,
                                        borderRadius: 12,
                                        backgroundColor:
                                            formData.type === 'income' ? colors.success : colors.card,
                                        marginLeft: 8,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:
                                                formData.type === 'income' ? '#FFFFFF' : colors.text,
                                            fontWeight: '600',
                                        }}
                                    >
                                        Income
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Button
                                title={editMode ? 'Update' : 'Add'}
                                onPress={handleSubmit}
                                loading={loading}
                                fullWidth
                                size="large"
                            />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ExpensesScreen;
