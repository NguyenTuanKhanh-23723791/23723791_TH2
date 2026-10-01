import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@screens/HomeScreen';
import { DetailScreen } from '@screens/DetailScreen';
import { VARIANT } from '@constants/student';
import { Product } from '@services/productApi';

export type ShopStackParamList = {
    Home: undefined;
    Detail: { id: string; product?: Product };
};

const Stack = createNativeStackNavigator<ShopStackParamList>();

export const ShopStack = () => {
    return (
        <Stack.Navigator id="ShopStack" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{
                    presentation: VARIANT.detailPresentation === 'modal' ? 'modal' : 'card',
                }}
            />
        </Stack.Navigator>
    );
};