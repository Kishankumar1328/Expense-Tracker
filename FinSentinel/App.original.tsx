import 'react-native-gesture-handler';
// import './global.css';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import { FinanceProvider } from './src/context/FinanceContext';
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ErrorBoundary>
                <ThemeProvider>
                    <AuthProvider>
                        <FinanceProvider>
                            <StatusBar style="auto" />
                            <AppNavigator />
                        </FinanceProvider>
                    </AuthProvider>
                </ThemeProvider>
            </ErrorBoundary>
        </GestureHandlerRootView>
    );
}
