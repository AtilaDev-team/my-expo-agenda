import { StatusBar } from 'expo-status-bar';
import * as Calendar from 'expo-calendar';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  FlatList,
} from 'react-native';
import CalendarPicker, {
  DateChangedCallback,
} from 'react-native-calendar-picker';
import useCalendar from '@atiladev/usecalendar';

import { AgendaModal } from './components/Modal';
import { Button } from './components/Button/';
import Spacer from './components/Spacer';
import { AgendaItem } from './components/AgendaItem';
import { Header } from './components/Header/index';

const modalWidth = Dimensions.get('window').width;

export default function App() {
  const {
    getPermission,
    createCalendar,
    addEventsToCalendar,
    deleteCalendar,
    openSettings,
    getEvents,
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

  const [events, setEvents] = useState<Calendar.Event[] | undefined>();

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

          const listEvent = await getEvents();
          setEvents(listEvent);
        } catch (e) {
          // Something went wrong
        }
      }
    } else {
      openSettings();
    }
  };

  const removeCalendar = () => deleteCalendar();

  useEffect(() => {
    async function loadEvents() {
      const events = await getEvents();
      setEvents(events);
    }
    loadEvents();
  }, []);

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

      {!!events?.length && <Text style={styles.textEvents}>Next Events</Text>}

      <View style={styles.flatListcontainer}>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AgendaItem item={item} />}
        />
      </View>

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
              title='Cancel'
              onPress={() => {
                setEventTitle('');
                closeModal();
              }}
            />
            <Button
              title='Add'
              onPress={() => {
                createCalAndEvent();
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
              marginTop: 30,
            }}
          >
            <Button
              title='Cancel'
              onPress={() => {
                closeModalRemove();
              }}
            />
            <Spacer w={5} />
            <Button
              title='Continue'
              onPress={() => {
                setEvents(undefined);
                removeCalendar();
                closeModalRemove();
              }}
            />
          </View>
        </View>
      </AgendaModal>
      <StatusBar style='light' />
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
  flatListcontainer: {
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
