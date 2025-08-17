import { saveData } from '../../common/AsyncStorageUtils';
import { HomeScreenProps } from './types/props.type';
import { ScreenName } from '../../navigation/screenName';

export const useHomeUI = (props: HomeScreenProps) => {
  const { navigation } = props;
  const logout = async () => {
    await saveData('isLoggedIn', false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleTabButtonClick = () => {
    navigation.navigate(ScreenName.TABS);
  };

  return {
    logout,
    handleTabButtonClick,
  };
};
