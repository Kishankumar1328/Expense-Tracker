import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Replace with your PC's IP address (get it using 'ipconfig')
// For Android Emulator use: http://10.0.2.2:3000/api
const getApiUrl = () => {
    const debuggerHost = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
    const localhost = debuggerHost?.split(':')[0];
    return localhost ? `http://${localhost}:3000/api` : 'http://localhost:3000/api';
};
const API_URL = getApiUrl();

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
            console.log('Auth: Loading storage...');
            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve({ timeout: true }), 3000));
            const storagePromise = AsyncStorage.multiGet(['authToken', 'user']);

            const result = await Promise.race([storagePromise, timeoutPromise]);

            if (result.timeout) {
                console.warn('Auth: Storage load timed out');
                setLoading(false);
                return;
            }

            const [[, storedToken], [, storedUser]] = result;

            if (storedToken && storedUser) {
                console.log('Auth: Session restored');
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            } else {
                console.log('Auth: No session found');
            }
        } catch (error) {
            console.error('Error loading auth:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        // Hardcoded credentials for testing - bypass API
        const HARDCODED_EMAIL = 'test@test.com';
        const HARDCODED_PASSWORD = 'test123';

        if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
            const mockUser = {
                id: '1',
                name: 'Test User',
                email: HARDCODED_EMAIL,
            };
            const mockToken = 'mock-auth-token-12345';

            await AsyncStorage.setItem('authToken', mockToken);
            await AsyncStorage.setItem('user', JSON.stringify(mockUser));

            setToken(mockToken);
            setUser(mockUser);
            axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;

            return { success: true };
        }

        // If hardcoded credentials don't match, show error
        return {
            success: false,
            message: 'Invalid credentials. Use: test@test.com / test123',
        };
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
