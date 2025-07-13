import { StyleSheet } from 'react-native';

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 38,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#10a37f',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#10a37f',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  buttonStop: {
    backgroundColor: '#a31029',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});

export { styles };
