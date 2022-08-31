import { StyleSheet, Dimensions } from 'react-native';

const modalWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  modalRemoveContainer: {
    alignItems: 'center',
    height: '43%',
    width: (modalWidth * 75) / 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  text: {
    fontSize: 20,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
  },
});

export default styles;
