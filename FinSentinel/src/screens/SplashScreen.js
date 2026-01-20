import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const SplashScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                if (isAuthenticated) {
                    navigation.replace('Main');
                } else {
                    navigation.replace('Login');
                }
            }, 2000);
        }
    }, [loading, isAuthenticated]);

    return (
        <LinearGradient
            colors={['#2196F3', '#1976D2', '#0D47A1']}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 30,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 24,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 48,
                            fontWeight: '900',
                            color: '#FFFFFF',
                        }}
                    >
                        FS
                    </Text>
                </View>
                <Text
                    style={{
                        fontSize: 36,
                        fontWeight: '900',
                        color: '#FFFFFF',
                        marginBottom: 8,
                    }}
                >
                    FinSentinel
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        color: 'rgba(255, 255, 255, 0.9)',
                        textAlign: 'center',
                    }}
                >
                    Your AI-Powered Financial Assistant
                </Text>
            </View>
        </LinearGradient>
    );
};

export default SplashScreen;
