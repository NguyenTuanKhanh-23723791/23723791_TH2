import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShopStack } from './ShopStack';
import { CartScreen } from '@screens/CartScreen';
import { MeScreen } from '@screens/MeScreen';
import { COLORS } from '@constants/theme';
import { VARIANT } from '@constants/student';
import { useCartStore } from '@stores/cartStore';

export type MainTabsParamList = {
    ShopTab: undefined;
    CartTab: undefined;
    MeTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

export const MainTabs = () => {
    const totalQty = useCartStore((s) => s.totalQuantity());

    const shopTab = (
        <Tab.Screen
            key="Shop"
            name="ShopTab"
            component={ShopStack}
            options={{ tabBarLabel: 'Cửa hàng' }}
        />
    );

    const cartTab = (
        <Tab.Screen
            key="Cart"
            name="CartTab"
            component={CartScreen}
            options={{
                tabBarLabel: 'Giỏ',
                tabBarBadge: totalQty > 0 ? totalQty : undefined,
                tabBarBadgeStyle: { backgroundColor: COLORS.secondary },
            }}
        />
    );

    const meTab = (
        <Tab.Screen
            key="Me"
            name="MeTab"
            component={MeScreen}
            options={{ tabBarLabel: 'Tôi' }}
        />
    );

    return (
        <Tab.Navigator
            id="MainTabs"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textLight,
            }}>
            {VARIANT.tabOrder === 'cartFirst'
                ? [cartTab, shopTab, meTab]
                : [shopTab, cartTab, meTab]}
        </Tab.Navigator>
    );
};