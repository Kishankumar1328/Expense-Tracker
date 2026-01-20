import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const API_URL = 'http://192.168.51.136:3000/api';

const FinanceContext = createContext();

export const useFinance = () => {
    const context = useContext(FinanceContext);
    if (!context) {
        throw new Error('useFinance must be used within FinanceProvider');
    }
    return context;
};

export const FinanceProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [expenses, setExpenses] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [insights, setInsights] = useState([]);
    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        monthlyChange: 0,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchAllData();
        }
    }, [isAuthenticated]);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            await Promise.all([
                fetchExpenses(),
                fetchBudgets(),
                fetchInsights(),
                fetchSummary(),
            ]);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`${API_URL}/expenses`);
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const addExpense = async (expenseData) => {
        try {
            const response = await axios.post(`${API_URL}/expenses`, expenseData);
            setExpenses([response.data, ...expenses]);
            await fetchSummary();
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to add expense',
            };
        }
    };

    const updateExpense = async (id, expenseData) => {
        try {
            const response = await axios.put(`${API_URL}/expenses/${id}`, expenseData);
            setExpenses(expenses.map(exp => exp.id === id ? response.data : exp));
            await fetchSummary();
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update expense',
            };
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${API_URL}/expenses/${id}`);
            setExpenses(expenses.filter(exp => exp.id !== id));
            await fetchSummary();
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to delete expense',
            };
        }
    };

    const fetchBudgets = async () => {
        try {
            const response = await axios.get(`${API_URL}/budgets`);
            setBudgets(response.data);
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    };

    const createBudget = async (budgetData) => {
        try {
            const response = await axios.post(`${API_URL}/budgets`, budgetData);
            setBudgets([...budgets, response.data]);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to create budget',
            };
        }
    };

    const updateBudget = async (id, budgetData) => {
        try {
            const response = await axios.put(`${API_URL}/budgets/${id}`, budgetData);
            setBudgets(budgets.map(b => b.id === id ? response.data : b));
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update budget',
            };
        }
    };

    const fetchInsights = async () => {
        try {
            const response = await axios.get(`${API_URL}/insights`);
            setInsights(response.data);
        } catch (error) {
            console.error('Error fetching insights:', error);
        }
    };

    const fetchSummary = async () => {
        try {
            const response = await axios.get(`${API_URL}/expenses/summary`);
            setSummary(response.data);
        } catch (error) {
            console.error('Error fetching summary:', error);
        }
    };

    const runSimulation = async (simulationData) => {
        try {
            const response = await axios.post(`${API_URL}/simulations`, simulationData);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Simulation failed',
            };
        }
    };

    const value = {
        expenses,
        budgets,
        insights,
        summary,
        loading,
        fetchExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
        fetchBudgets,
        createBudget,
        updateBudget,
        fetchInsights,
        fetchSummary,
        runSimulation,
        refreshAll: fetchAllData,
    };

    return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
};
