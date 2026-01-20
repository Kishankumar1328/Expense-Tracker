import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const Input = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    keyboardType = 'default',
    error,
    icon,
    rightIcon,
    onRightIconPress,
    multiline = false,
    numberOfLines = 1,
    editable = true,
    style,
}) => {
    const { colors } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={[{ marginBottom: 16 }, style]}>
            {label && (
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: colors.text,
                        marginBottom: 8,
                    }}
                >
                    {label}
                </Text>
            )}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.surface,
                    borderWidth: 2,
                    borderColor: error
                        ? colors.danger
                        : isFocused
                            ? colors.primary
                            : colors.border,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: multiline ? 12 : 0,
                }}
            >
                {icon && (
                    <Icon
                        name={icon}
                        size={20}
                        color={colors.textSecondary}
                        style={{ marginRight: 12 }}
                    />
                )}
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colors.textSecondary}
                    secureTextEntry={secureTextEntry && !showPassword}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    editable={editable}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={{
                        flex: 1,
                        fontSize: 16,
                        color: colors.text,
                        paddingVertical: multiline ? 0 : 14,
                        textAlignVertical: multiline ? 'top' : 'center',
                    }}
                />
                {secureTextEntry && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={20}
                            color={colors.textSecondary}
                        />
                    </TouchableOpacity>
                )}
                {rightIcon && !secureTextEntry && (
                    <TouchableOpacity onPress={onRightIconPress}>
                        <Icon name={rightIcon} size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                )}
            </View>
            {error && (
                <Text
                    style={{
                        fontSize: 12,
                        color: colors.danger,
                        marginTop: 4,
                    }}
                >
                    {error}
                </Text>
            )}
        </View>
    );
};

export default Input;
