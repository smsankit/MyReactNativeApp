import { useState } from 'react';
import { LoginScreenProps } from './types/props.type';
import { Alert } from 'react-native';
import { ScreenName } from '../../navigation/screenName';
import { saveData } from '../../common/AsyncStorageUtils';

export const useLoginUI = (props: LoginScreenProps) => {
  const { navigation } = props;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    console.log(`username = ${email} and password = ${password}`);
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    const savedEmail = await saveData('email', email);
    await saveData('isLoggedIn', true);

    if (savedEmail) {
      navigation.reset({ routes: [{ name: ScreenName.TABS }] });
    } else {
      Alert.alert('Error', 'Failed to save login data.');
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
  };
};
