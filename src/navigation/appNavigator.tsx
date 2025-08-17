import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamList } from './type/rootStackParamList';
import LoginScreen from '../screens/login';
import { ScreenName } from './screenName';
import { TabNavigator } from './tabNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '../common/redux/store/store';

const Stack = createNativeStackNavigator<RootStackParamList>();

// const AppNavigator = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
const AppNavigator = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!token;

  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={isAuthenticated ? ScreenName.TABS : ScreenName.LOGIN}
        screenOptions={{ headerShown: false }}
      >
        {/* <Stack.Screen name={ScreenName.HOME} component={HomeScreen} /> */}
        {isAuthenticated ? (
          <Stack.Screen
            name={ScreenName.TABS}
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen name={ScreenName.LOGIN} component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
