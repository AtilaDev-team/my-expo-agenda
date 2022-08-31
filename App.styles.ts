import { StyleSheet, Dimensions } from 'react-native';

const modalWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  calendarContainer: {
    marginTop: 130,
  },
  modalContainer: {
    height: '45%',
    width: (modalWidth * 75) / 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalErrorContainer: {
    alignItems: 'center',
    height: '40%',
    width: (modalWidth * 75) / 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalRemoveContainer: {
    alignItems: 'center',
    height: '43%',
    width: (modalWidth * 75) / 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  flatListContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  textEvents: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 40,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;
