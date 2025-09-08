import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const WeatherSkeleton = () => {
  return (
    <View style={styles.wrapper}>
      <SkeletonPlaceholder
        backgroundColor="#ffffff"
        highlightColor="#F2F8FC"
        borderRadius={4}
      >
        <View style={styles.container}>
          <View style={styles.location} />
          <View style={styles.temperature} />
          <View style={styles.condition} />
          <View style={styles.humidity} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  container: {
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: '#ffffff',
  },
  location: {
    width: 120,
    height: 20,
    borderRadius: 4,
    marginBottom: 12,
  },
  temperature: {
    width: 80,
    height: 50,
    borderRadius: 4,
    marginBottom: 12,
  },
  condition: {
    width: 140,
    height: 20,
    borderRadius: 4,
    marginBottom: 12,
  },
  humidity: {
    width: 100,
    height: 20,
    borderRadius: 4,
  },
});

export default WeatherSkeleton;
