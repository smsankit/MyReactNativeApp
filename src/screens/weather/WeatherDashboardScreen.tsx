import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useWeather } from './useWeather';
import WeatherSkeleton from './WeatherSkeleton';

const WeatherDashboardScreen: React.FC = () => {
  const { data, isLoading, error, fetchWeatherData } = useWeather();

  if (isLoading) {
    return <WeatherSkeleton />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Button title="Retry" onPress={fetchWeatherData} />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>No weather data available. Please refresh.</Text>
        <Button title="Fetch Weather" onPress={fetchWeatherData} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>{data.locationName}</Text>
      <Text style={styles.temperatureText}>{data.temperature}°C</Text>
      <Text style={styles.conditionText}>Condition: {data.condition}</Text>
      <Text style={styles.humidityText}>Humidity: {data.humidity}%</Text>
      <Button title="Refresh" onPress={fetchWeatherData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  locationText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperatureText: {
    fontSize: 64,
    fontWeight: '200',
    marginVertical: 10,
  },
  conditionText: {
    fontSize: 20,
  },
  humidityText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default WeatherDashboardScreen;
