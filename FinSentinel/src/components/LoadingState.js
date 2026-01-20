import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const LoadingState = ({ message = 'Loading...' }) => {
    const { colors } = useTheme();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.background,
            }}
        >
            <ActivityIndicator size="large" color={colors.primary} />
            <Text
                style={{
                    marginTop: 16,
                    fontSize: 16,
                    color: colors.textSecondary,
                }}
            >
                {message}
            </Text>
        </View>
    );
};

export default LoadingState;
