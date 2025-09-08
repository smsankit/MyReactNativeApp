import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AccountScreen from '../screens/account';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabNavigatorProps } from './type/tabprops.type';
import { ScreenName } from './screenName';
import NewsScreen from '../screens/news';
import WeatherDashboardScreen from '../screens/weather/WeatherDashboardScreen';
import ProductListScreen from '../screens/product/ProductListScreen';
import { ExpenseScreen } from '../screens/expence/expense';

const Tab = createBottomTabNavigator();

const getTabbarIcon = (
  routeName: string,
  focused: boolean,
  color: string,
  size: number,
) => {
  let iconName: string;
  if (routeName === ScreenName.WEATHER) {
    iconName = focused ? 'people' : 'people-outline';
  } else if (routeName === ScreenName.PRODUCTS) {
    iconName = focused ? 'home' : 'home-outline';
  } else if (routeName === ScreenName.PRODUCTS) {
    iconName = focused ? 'home' : 'home-outline';
  } else if (routeName === ScreenName.EXPENCE) {
    iconName = focused ? 'cash' : 'cash-outline';
  } else {
    iconName = focused ? 'newspaper' : 'newspaper-outline';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

export const TabNavigator: React.FC<TabNavigatorProps> = _props => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          getTabbarIcon(route.name, focused, color, size),
        tabBarStyle: {
          position: 'relative',
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 5, // for Android shadow
          shadowOpacity: 0.1, // for iOS shadow
          height: 80,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 10,
        },
        tabBarLabelPosition: 'below-icon',
        animation: 'fade',
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 600,
        },
        tabBarActiveTintColor: '#780000',
        tabBarInactiveTintColor: '#000',
        tabBarActiveBackgroundColor: '#ffafcc',
        tabBarHideOnKeyboard: true,
        headerShown: true,
        tabBarIconStyle: { marginTop: 2 },
      })}
    >
      <Tab.Screen name={ScreenName.HOME} component={NewsScreen} />
      <Tab.Screen
        name={ScreenName.WEATHER}
        component={WeatherDashboardScreen}
      />
      <Tab.Screen name={ScreenName.PRODUCTS} component={ProductListScreen} />
      <Tab.Screen name={ScreenName.EXPENCE} component={ExpenseScreen} />
      <Tab.Screen name={ScreenName.ACCOUNTS} component={AccountScreen} />
    </Tab.Navigator>
  );
};
