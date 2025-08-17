import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenName } from '../../../navigation/screenName';
import { ScreenProps } from '../../../navigation/type/rootStackParamList';

// export type HomeScreenProps = ScreenProps<typeof ScreenName.HOME>;
export type HomeScreenProps = NativeStackScreenProps<
  any,
  typeof ScreenName.HOME
>;
