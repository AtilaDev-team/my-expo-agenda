import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Button,
  FlatList,
} from 'react-native';
import CalendarPicker, {
  DateChangedCallback,
} from 'react-native-calendar-picker';
import useCalendar from '@atiladev/usecalendar';

import { Header } from './components/Header';
import { AgendaModal } from './components/Modal';

const modalWidth = Dimensions.get('window').width;

export default function App() {
  const {
    getPermission,
    createCalendar,
    addEventsToCalendar,
    deleteCalendar,
    openSettings,
  } = useCalendar('My Expo Agenda', 'purple', 'my-expo-agenda');

  const [visible, setVisible] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [visibleRemove, setVisibleRemove] = useState(false);
  const [eventTitle, setEventTitle] = useState('');

  const openModal = () => {
    if (selectedDate) {
      setVisible(true);
    } else {
      setVisibleError(true);
    }
  };
  const closeModal = () => setVisible(false);
  const closeModalError = () => setVisibleError(false);

  const openModalRemove = () => setVisibleRemove(true);
  const closeModalRemove = () => setVisibleRemove(false);

  const [selectedDate, setSelectedDate] = useState<
    DateChangedCallback | undefined
  >();

  const createCalAndEvent = async () => {
    const granted = await getPermission();

    if (granted) {
      await createCalendar();

      if (selectedDate) {
        try {
          addEventsToCalendar(
            eventTitle,
            new Date(selectedDate.toString()),
            new Date(selectedDate.toString())
          );
        } catch (e) {
          // Something went wrong
        }
      }
    } else {
      openSettings();
    }
  };

  const removeCalendar = () => deleteCalendar();

  return (
    <View style={styles.container}>
      <Header
        onPressLeft={openModalRemove}
        onPressRight={openModal}
        title={'My Expo Agenda'}
      />
      <View style={styles.calendarContainer}>
        {/* @ts-ignore */}
        <CalendarPicker onDateChange={setSelectedDate} />
      </View>

      <View
        style={{ marginTop: 20, flex: 1, flexDirection: 'row', padding: 20 }}
      >
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      </View>

      <StatusBar style='light' />

      <AgendaModal isVisible={visible}>
        <View style={styles.modalContainer}>
          <Text
            style={{
              fontSize: 15,
              marginBottom: 20,
            }}
          >
            {selectedDate?.toString()}
          </Text>
          <TextInput
            placeholder='Event Name'
            style={{
              paddingLeft: 5,
              borderBottomWidth: 1,
              borderColor: 'purple',
              height: 26,
            }}
            onChangeText={setEventTitle}
            value={eventTitle}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
            }}
          >
            <Button
              title='Add'
              onPress={() => {
                createCalAndEvent();
                setEventTitle('');
                closeModal();
              }}
            />
            <Button
              title='Cancel'
              onPress={() => {
                setEventTitle('');
                closeModal();
              }}
            />
          </View>
        </View>
      </AgendaModal>

      <AgendaModal isVisible={visibleError}>
        <View style={styles.modalErrorContainer}>
          <Text style={{ fontSize: 20 }}>You must select a date first!</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
            }}
          >
            <Button title='Ok' onPress={closeModalError} />
          </View>
        </View>
      </AgendaModal>

      <AgendaModal isVisible={visibleRemove}>
        <View style={styles.modalRemoveContainer}>
          <Text style={{ fontSize: 20 }}>
            This actions will remove your actual calendar!
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
            }}
          >
            <Button
              title='Continue'
              onPress={() => {
                removeCalendar();
                closeModalRemove();
              }}
            />

            <Button
              title='Cancel'
              onPress={() => {
                closeModalRemove();
              }}
            />
          </View>
        </View>
      </AgendaModal>
    </View>
  );
}

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
});
