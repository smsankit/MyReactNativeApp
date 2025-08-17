import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  content: {
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  description: {
    marginTop: 5,
    fontSize: 16,
    color: '#555',
    paddingHorizontal: 10,
  },
});
