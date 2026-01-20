import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Button = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    icon,
    fullWidth = false,
    style,
}) => {
    const { colors, isDark } = useTheme();

    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                };
            case 'secondary':
                return {
                    backgroundColor: 'transparent',
                    borderColor: colors.primary,
                };
            case 'success':
                return {
                    backgroundColor: colors.success,
                    borderColor: colors.success,
                };
            case 'danger':
                return {
                    backgroundColor: colors.danger,
                    borderColor: colors.danger,
                };
            case 'ghost':
                return {
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                };
            default:
                return {
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                };
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return {
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    fontSize: 14,
                };
            case 'medium':
                return {
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    fontSize: 16,
                };
            case 'large':
                return {
                    paddingVertical: 16,
                    paddingHorizontal: 32,
                    fontSize: 18,
                };
            default:
                return {
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    fontSize: 16,
                };
        }
    };

    const variantStyles = getVariantStyles();
    const sizeStyles = getSizeStyles();

    const getTextColor = () => {
        if (variant === 'secondary' || variant === 'ghost') {
            return colors.primary;
        }
        return '#FFFFFF';
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    borderWidth: variant === 'secondary' ? 2 : 0,
                    opacity: disabled ? 0.5 : 1,
                    width: fullWidth ? '100%' : 'auto',
                    ...variantStyles,
                    paddingVertical: sizeStyles.paddingVertical,
                    paddingHorizontal: sizeStyles.paddingHorizontal,
                },
                style,
            ]}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} size="small" />
            ) : (
                <>
                    {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
                    <Text
                        style={{
                            color: getTextColor(),
                            fontSize: sizeStyles.fontSize,
                            fontWeight: '600',
                        }}
                    >
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

export default Button;
