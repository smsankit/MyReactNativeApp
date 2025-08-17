import { View, Text, Button } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrement,
  increment,
  reset,
} from '../../common/redux/slice/counterSlice';
import { styles } from './style';
import { HomeScreenProps } from './types/props.type';
import { useHomeUI } from './useHome.hook';

// Define RootState type according to your Redux store structure
interface RootState {
  counter: {
    value: number;
  };
}

const HomeScreen: React.FC<HomeScreenProps> = props => {
  const { handleTabButtonClick } = useHomeUI(props);

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Counter: {count}</Text>
      <Button
        title="Increment"
        onPress={() => {
          dispatch(increment());
        }}
      />
      <Button
        title="Decrement"
        onPress={() => {
          dispatch(decrement());
        }}
      />
      <Button
        title="Reset"
        onPress={() => {
          dispatch(reset());
        }}
      />

      <Button
        title="Bottom Tab Screen"
        onPress={() => {
          handleTabButtonClick();
        }}
      />
    </View>
  );
};

export default HomeScreen;
