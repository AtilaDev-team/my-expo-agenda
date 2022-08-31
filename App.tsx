import { StatusBar } from 'expo-status-bar';
import { useEffect, useReducer } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import useCalendar from '@atiladev/usecalendar';

import { AgendaModal } from './components/AgendaModal';
import { Button } from './components/Button/';
import { Spacer } from './components/Spacer';
import { AgendaItem } from './components/AgendaItem';
import { Header } from './components/Header/index';
import styles from './App.styles';
import reducer, { stateProps } from './reducer';

const initialState: stateProps = {
  visibleModalNewEvent: false,
  visibleModalError: false,
  visibleModalRemove: false,
  eventTitle: '',
  selectedDate: undefined,
  events: undefined,
};

export default function App() {
  const {
    getPermission,
    createCalendar,
    addEventsToCalendar,
    deleteCalendar,
    openSettings,
    getEvents,
  } = useCalendar('My Expo Agenda', 'purple', 'my-expo-agenda');

  const [state, dispatch] = useReducer(reducer, initialState);

  const openModalNewEvent = () => {
    if (state.selectedDate) {
      dispatch({ type: 'setVisibleModalNewEvent', payload: true });
    } else {
      dispatch({ type: 'setVisibleModalError', payload: true });
    }
  };
  const closeModalNewEvent = () => {
    dispatch({ type: 'setVisibleModalNewEvent', payload: false });
    dispatch({ type: 'clear' });
  };

  const closeModalError = () => {
    dispatch({ type: 'setVisibleModalError', payload: false });
  };

  const openModalRemove = () => {
    dispatch({ type: 'setVisibleModalRemove', payload: true });
  };
  const closeModalRemove = () => {
    dispatch({ type: 'setVisibleModalRemove', payload: false });
  };

  const createCalAndEvent = async () => {
    const granted = await getPermission();

    if (granted) {
      await createCalendar();

      if (state.selectedDate) {
        try {
          addEventsToCalendar(
            state.eventTitle,
            new Date(state.selectedDate.toString()),
            new Date(state.selectedDate.toString())
          );

          const listEvent = await getEvents();

          dispatch({ type: 'setEvents', payload: listEvent });
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
      dispatch({ type: 'setEvents', payload: events });
    }
    loadEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        onPressLeft={openModalRemove}
        onPressRight={openModalNewEvent}
        title={'My Expo Agenda'}
      />
      <View style={styles.calendarContainer}>
        <CalendarPicker
          onDateChange={(evt) =>
            // @ts-ignore
            dispatch({ type: 'setSelectedDate', payload: evt })
          }
          minDate={new Date()}
        />
      </View>

      {!!state.events?.length && (
        <Text style={styles.textEvents}>Next Events</Text>
      )}

      <View style={styles.flatListContainer}>
        <FlatList
          data={state.events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AgendaItem item={item} />}
        />
      </View>

      <AgendaModal isVisible={state.visibleModalNewEvent}>
        <View style={styles.modalContainer}>
          <Text
            style={{
              fontSize: 15,
              marginBottom: 20,
            }}
          >
            {state.selectedDate?.toString()}
          </Text>
          <TextInput
            placeholder='Event Name'
            style={{
              paddingLeft: 5,
              borderBottomWidth: 1,
              borderColor: 'purple',
              height: 26,
            }}
            onChangeText={(text) =>
              dispatch({ type: 'setEventTitle', payload: text })
            }
            value={state.eventTitle}
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
                closeModalNewEvent();
              }}
            />
            <Button
              title='Add'
              onPress={() => {
                createCalAndEvent();
                closeModalNewEvent();
              }}
            />
          </View>
        </View>
      </AgendaModal>

      <AgendaModal isVisible={state.visibleModalError}>
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

      <AgendaModal isVisible={state.visibleModalRemove}>
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
                dispatch({ type: 'setEvents', payload: undefined });
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
