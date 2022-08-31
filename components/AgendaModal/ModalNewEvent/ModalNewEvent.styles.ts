import { StyleSheet, Dimensions } from 'react-native';

const modalWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  modalContainer: {
    height: '45%',
    width: (modalWidth * 75) / 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  selectedDate: {
    fontSize: 15,
    marginBottom: 20,
  },
  input: {
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderColor: 'purple',
    height: 26,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
});

export default styles;
