import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { styles } from './styles';

const LoadingComponent = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={60} />
      <Text style={styles.loadingText}>Loading…</Text>
    </View>
  );
};

export default LoadingComponent;
