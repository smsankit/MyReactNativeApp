import { ScreenName } from '../screenName';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { User } from '../../screens/login/types/user.type';

export type RootStackParamList = {
  [ScreenName.SPLASH]: undefined;
  [ScreenName.LOGIN]: undefined;
  [ScreenName.HOME]: User;
  [ScreenName.TABS]: undefined;
  [ScreenName.CART]: undefined;
  [ScreenName.WISHLIST]: undefined;
  [ScreenName.ACCOUNTS]: undefined;
};

export type ScreenProps<Route extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, Route>;
  route: RouteProp<RootStackParamList, Route>;
};
