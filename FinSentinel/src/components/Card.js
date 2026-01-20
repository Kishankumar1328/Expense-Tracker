import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const Card = ({
    children,
    title,
    subtitle,
    onPress,
    gradient = false,
    gradientColors,
    style,
    headerRight,
}) => {
    const { colors, isDark } = useTheme();

    const defaultGradientColors = isDark
        ? ['#1F2937', '#374151']
        : ['#FFFFFF', '#F9FAFB'];

    const CardContent = () => (
        <View
            style={[
                {
                    backgroundColor: gradient ? 'transparent' : colors.card,
                    borderRadius: 16,
                    padding: 16,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: isDark ? 0.3 : 0.1,
                    shadowRadius: 8,
                    elevation: 4,
                },
                style,
            ]}
        >
            {(title || subtitle || headerRight) && (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 12,
                    }}
                >
                    <View style={{ flex: 1 }}>
                        {title && (
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '700',
                                    color: colors.text,
                                    marginBottom: subtitle ? 4 : 0,
                                }}
                            >
                                {title}
                            </Text>
                        )}
                        {subtitle && (
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: colors.textSecondary,
                                }}
                            >
                                {subtitle}
                            </Text>
                        )}
                    </View>
                    {headerRight && <View>{headerRight}</View>}
                </View>
            )}
            {children}
        </View>
    );

    if (gradient) {
        return (
            <LinearGradient
                colors={gradientColors || defaultGradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    {
                        borderRadius: 16,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: isDark ? 0.3 : 0.1,
                        shadowRadius: 8,
                        elevation: 4,
                    },
                    style,
                ]}
            >
                {onPress ? (
                    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
                        <View style={{ padding: 16 }}>
                            {(title || subtitle || headerRight) && (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: 12,
                                    }}
                                >
                                    <View style={{ flex: 1 }}>
                                        {title && (
                                            <Text
                                                style={{
                                                    fontSize: 18,
                                                    fontWeight: '700',
                                                    color: colors.text,
                                                    marginBottom: subtitle ? 4 : 0,
                                                }}
                                            >
                                                {title}
                                            </Text>
                                        )}
                                        {subtitle && (
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: colors.textSecondary,
                                                }}
                                            >
                                                {subtitle}
                                            </Text>
                                        )}
                                    </View>
                                    {headerRight && <View>{headerRight}</View>}
                                </View>
                            )}
                            {children}
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View style={{ padding: 16 }}>
                        {(title || subtitle || headerRight) && (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 12,
                                }}
                            >
                                <View style={{ flex: 1 }}>
                                    {title && (
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                fontWeight: '700',
                                                color: colors.text,
                                                marginBottom: subtitle ? 4 : 0,
                                            }}
                                        >
                                            {title}
                                        </Text>
                                    )}
                                    {subtitle && (
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                color: colors.textSecondary,
                                            }}
                                        >
                                            {subtitle}
                                        </Text>
                                    )}
                                </View>
                                {headerRight && <View>{headerRight}</View>}
                            </View>
                        )}
                        {children}
                    </View>
                )}
            </LinearGradient>
        );
    }

    return onPress ? (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <CardContent />
        </TouchableOpacity>
    ) : (
        <CardContent />
    );
};

export default Card;
