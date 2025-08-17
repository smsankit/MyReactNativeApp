/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/appNavigator';
import React, { useEffect, useState } from 'react';
import { SplashScreen } from './screens/splash';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, Store, RootState } from './common/redux/store/store';
import { autoLoginAsync } from './common/redux/slice/authSlice';
import { SPLASH_SCREEN_DURATION } from './common/utils/config';

function App() {
  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        <RootComponent />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;

const RootComponent = () => {
  const [isSplashScreenLoading, setIsSplashScreenLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { isInitialLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashScreenLoading(false);
    }, SPLASH_SCREEN_DURATION);

    dispatch(autoLoginAsync());
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  if (isSplashScreenLoading || isInitialLoading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};
