// TH2 | 23723791 | NGUYEN TUAN KHANH | #STAMP
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootNavigator } from '@navigation/RootNavigator';

const queryClient = new QueryClient();

export default function App() {
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <RootNavigator />
                </NavigationContainer>
            </QueryClientProvider>
        </SafeAreaProvider>
    );
}