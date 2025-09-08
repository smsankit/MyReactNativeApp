import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const EmptyState = ({
  message = 'No products found.',
}: {
  message?: string;
}) => (
  <View style={styles.c}>
    <Text style={styles.t}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  c: { padding: 24, alignItems: 'center' },
  t: { color: colors.subText },
});
