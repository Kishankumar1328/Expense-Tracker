import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    resetError = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <View style={{ flex: 1, backgroundColor: '#EF4444', paddingTop: 50, padding: 20 }}>
                    <ScrollView>
                        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                            Something crashed!
                        </Text>
                        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Error:</Text>
                            <Text style={{ color: 'red', marginTop: 5 }}>{this.state.error?.toString()}</Text>

                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Stack Trace:</Text>
                            <Text style={{ color: 'gray', marginTop: 5, fontSize: 12 }}>
                                {this.state.errorInfo?.componentStack}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={this.resetError}
                            style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' }}
                        >
                            <Text style={{ color: '#EF4444', fontWeight: 'bold' }}>Try Again</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
