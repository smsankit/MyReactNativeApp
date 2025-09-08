import React from 'react';
import { View } from 'react-native';

export const Spacer = ({ size = 8 }: { size?: number }) => (
  <View style={{ height: size, width: size }} />
);
