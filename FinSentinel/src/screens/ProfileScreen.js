import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const ProfileScreen = () => {
    const { colors, isDark, toggleTheme } = useTheme();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: logout,
            },
        ]);
    };

    const handleExportData = () => {
        Alert.alert('Export Data', 'Your data will be exported as CSV file');
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View
                style={{
                    paddingTop: 60,
                    paddingBottom: 24,
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
                    Profile
                </Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {/* User Info */}
                <Card style={{ marginBottom: 16 }}>
                    <View style={{ alignItems: 'center', paddingVertical: 16 }}>
                        <View
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                backgroundColor: colors.primary + '20',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 16,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 32,
                                    fontWeight: '900',
                                    color: colors.primary,
                                }}
                            >
                                {user?.name?.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: '700',
                                color: colors.text,
                                marginBottom: 4,
                            }}
                        >
                            {user?.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: colors.textSecondary,
                            }}
                        >
                            {user?.email}
                        </Text>
                    </View>
                </Card>

                {/* Settings */}
                <Card title="Settings" style={{ marginBottom: 16 }}>
                    <TouchableOpacity
                        onPress={toggleTheme}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 16,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.border,
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                name={isDark ? 'weather-night' : 'weather-sunny'}
                                size={24}
                                color={colors.text}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: '600',
                                    color: colors.text,
                                    marginLeft: 16,
                                }}
                            >
                                Dark Mode
                            </Text>
                        </View>
                        <View
                            style={{
                                width: 50,
                                height: 28,
                                borderRadius: 14,
                                backgroundColor: isDark ? colors.primary : colors.border,
                                justifyContent: 'center',
                                paddingHorizontal: 2,
                            }}
                        >
                            <View
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: 12,
                                    backgroundColor: '#FFFFFF',
                                    alignSelf: isDark ? 'flex-end' : 'flex-start',
                                }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 16,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.border,
                        }}
                    >
                        <Icon name="bell-outline" size={24} color={colors.text} />
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: colors.text,
                                marginLeft: 16,
                            }}
                        >
                            Notifications
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 16,
                        }}
                    >
                        <Icon name="lock-outline" size={24} color={colors.text} />
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: colors.text,
                                marginLeft: 16,
                            }}
                        >
                            Privacy & Security
                        </Text>
                    </TouchableOpacity>
                </Card>

                {/* Data Management */}
                <Card title="Data Management" style={{ marginBottom: 16 }}>
                    <TouchableOpacity
                        onPress={handleExportData}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 16,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.border,
                        }}
                    >
                        <Icon name="download" size={24} color={colors.primary} />
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: colors.text,
                                marginLeft: 16,
                            }}
                        >
                            Export Data
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 16,
                        }}
                    >
                        <Icon name="backup-restore" size={24} color={colors.text} />
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: colors.text,
                                marginLeft: 16,
                            }}
                        >
                            Backup & Restore
                        </Text>
                    </TouchableOpacity>
                </Card>

                {/* About */}
                <Card title="About" style={{ marginBottom: 16 }}>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 16,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.border,
                        }}
                    >
                        <Icon name="help-circle-outline" size={24} color={colors.text} />
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: colors.text,
                                marginLeft: 16,
                            }}
                        >
                            Help & Support
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 16,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.border,
                        }}
                    >
                        <Icon name="file-document-outline" size={24} color={colors.text} />
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: colors.text,
                                marginLeft: 16,
                            }}
                        >
                            Terms & Conditions
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 16,
                        }}
                    >
                        <Icon name="shield-check-outline" size={24} color={colors.text} />
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: colors.text,
                                marginLeft: 16,
                            }}
                        >
                            Privacy Policy
                        </Text>
                    </TouchableOpacity>
                </Card>

                <Button
                    title="Logout"
                    onPress={handleLogout}
                    variant="danger"
                    fullWidth
                    icon={<Icon name="logout" size={20} color="#FFFFFF" />}
                />

                <Text
                    style={{
                        fontSize: 12,
                        color: colors.textSecondary,
                        textAlign: 'center',
                        marginTop: 24,
                    }}
                >
                    FinSentinel v1.0.0
                </Text>
            </ScrollView>
        </View>
    );
};

export default ProfileScreen;
