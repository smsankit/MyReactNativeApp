import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  parentView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5fffa',
    paddingTop: 100,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
    color: '#2c3e50',
  },
  input: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 124,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#ccc',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  linkButton: {
    marginTop: 16,
  },
  linkText: {
    color: '#2980b9',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
