import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Button from './Button';

const EmptyState = ({
    icon = 'inbox-outline',
    title = 'No data found',
    message = 'There is nothing to display here yet.',
    actionLabel,
    onAction,
}) => {
    const { colors } = useTheme();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 32,
            }}
        >
            <Icon name={icon} size={80} color={colors.textSecondary} />
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: colors.text,
                    marginTop: 16,
                    textAlign: 'center',
                }}
            >
                {title}
            </Text>
            <Text
                style={{
                    fontSize: 14,
                    color: colors.textSecondary,
                    marginTop: 8,
                    textAlign: 'center',
                }}
            >
                {message}
            </Text>
            {actionLabel && onAction && (
                <View style={{ marginTop: 24 }}>
                    <Button title={actionLabel} onPress={onAction} />
                </View>
            )}
        </View>
    );
};

export default EmptyState;
