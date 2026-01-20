import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Replace with your PC's IP address (get it using 'ipconfig')
// For Android Emulator use: http://10.0.2.2:3000/api
const API_URL = 'http://192.168.51.136:3000/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('authToken');
            const storedUser = await AsyncStorage.getItem('user');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            }
        } catch (error) {
            console.error('Error loading auth:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password,
            });

            const { token: authToken, user: userData } = response.data;

            await AsyncStorage.setItem('authToken', authToken);
            await AsyncStorage.setItem('user', JSON.stringify(userData));

            setToken(authToken);
            setUser(userData);
            axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

            return { success: true };
        } catch (error) {
            console.error('Login Error:', error.message);
            if (error.response) {
                console.error('Response Data:', error.response.data);
                console.error('Response Status:', error.response.status);
            } else if (error.request) {
                console.error('Request Error (No response):', error.request);
            }
            return {
                success: false,
                message: error.response?.data?.message || 'Network error: Cannot reach server',
            };
        }
    };

    const signup = async (name, email, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, {
                name,
                email,
                password,
            });

            const { token: authToken, user: userData } = response.data;

            await AsyncStorage.setItem('authToken', authToken);
            await AsyncStorage.setItem('user', JSON.stringify(userData));

            setToken(authToken);
            setUser(userData);
            axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Signup failed',
            };
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.removeItem('user');
            delete axios.defaults.headers.common['Authorization'];
            setToken(null);
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const value = {
        user,
        token,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
