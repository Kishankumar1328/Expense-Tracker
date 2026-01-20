import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        setLoading(true);
        const result = await login(email, password);
        setLoading(false);

        if (result.success) {
            navigation.replace('Main');
        } else {
            Alert.alert('Login Failed', result.message);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <LinearGradient
                colors={['#2196F3', '#1976D2']}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        padding: 24,
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ alignItems: 'center', marginBottom: 48 }}>
                        <View
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 20,
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 16,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 36,
                                    fontWeight: '900',
                                    color: '#FFFFFF',
                                }}
                            >
                                FS
                            </Text>
                        </View>
                        <Text
                            style={{
                                fontSize: 32,
                                fontWeight: '900',
                                color: '#FFFFFF',
                                marginBottom: 8,
                            }}
                        >
                            Welcome Back
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                color: 'rgba(255, 255, 255, 0.9)',
                                textAlign: 'center',
                            }}
                        >
                            Sign in to continue to FinSentinel
                        </Text>
                    </View>

                    <View
                        style={{
                            backgroundColor: colors.card,
                            borderRadius: 24,
                            padding: 24,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 12,
                            elevation: 8,
                        }}
                    >
                        <Input
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            icon="email-outline"
                            error={errors.email}
                        />

                        <Input
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter your password"
                            secureTextEntry
                            icon="lock-outline"
                            error={errors.password}
                        />

                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end', marginBottom: 24 }}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: colors.primary,
                                    fontWeight: '600',
                                }}
                            >
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>

                        <Button
                            title="Sign In"
                            onPress={handleLogin}
                            loading={loading}
                            fullWidth
                            size="large"
                        />

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 24,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: colors.textSecondary,
                                }}
                            >
                                Don't have an account?{' '}
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: colors.primary,
                                        fontWeight: '700',
                                    }}
                                >
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View
                        style={{
                            marginTop: 32,
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: 'rgba(255, 255, 255, 0.7)',
                                textAlign: 'center',
                            }}
                        >
                            By signing in, you agree to our{'\n'}
                            Terms of Service and Privacy Policy
                        </Text>
                    </View>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
