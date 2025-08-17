import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  loadingContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },

  errorText: {
    color: 'red',
    padding: 30,
  },

  itemSeparator: {
    padding: 10,
  },

  loadingText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
});
