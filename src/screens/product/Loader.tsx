import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const Loader = () => (
  <View style={styles.c}>
    <ActivityIndicator size="small" color={colors.tint} />
  </View>
);

const styles = StyleSheet.create({ c: { paddingVertical: 16 } });
