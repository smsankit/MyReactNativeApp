import { View, Text, Button } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../common/redux/store/store';
import { logoutAsync } from '../../common/redux/slice/authSlice';

const AccountScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>AccountScreen</Text>
      <Button
        title="Logout"
        onPress={() => {
          handleLogout();
        }}
      />
    </View>
  );
};

export default AccountScreen;
