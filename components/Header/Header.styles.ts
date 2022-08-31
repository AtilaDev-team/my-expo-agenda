import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 110,
    left: 0,
    paddingHorizontal: 15,
    position: 'absolute',
    right: 0,
    top: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 46,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default styles;
