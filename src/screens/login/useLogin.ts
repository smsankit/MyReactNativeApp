// src/presentation/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { LoginScreenProps } from './types/props.type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../common/redux/store/store';
import { loginAsync } from '../../common/redux/slice/authSlice';
import Snackbar from 'react-native-snackbar';

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
export const useNewLoginUI = (props: LoginScreenProps) => {
  const { navigation } = props;
  const [username, setUsername] = useState<string>('eve.holt@reqres.in');
  const [password, setPassword] = useState<string>('cityslicka');
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    if (!username || !password) {
      snackbar('Please enter both email and password.');
      return;
    }
    dispatch(loginAsync({ username, password }));
  };

  useEffect(() => {
    if (error) {
      snackbar(error || 'An error occurred during login.');
    }
  }, [error]);

  const snackbar = (message: string) => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  const value = {
    username,
    password,
    setUsername,
    setPassword,
    error,
    isLoading,
    handleLogin,
  };

  return value;
};
