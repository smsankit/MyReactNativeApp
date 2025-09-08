import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const ErrorState = ({ error }: { error: string }) => (
  <View style={styles.c}>
    <Text style={styles.t}>⚠️ {error}</Text>
  </View>
);

const styles = StyleSheet.create({
  c: { padding: 16 },
  t: { color: colors.danger },
});
