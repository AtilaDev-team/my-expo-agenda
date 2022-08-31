import { StatusBar } from 'expo-status-bar';
import { useEffect, useReducer } from 'react';
import { View, Text, FlatList } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import useCalendar from '@atiladev/usecalendar';

import {
  AgendaItem,
  Header,
  ModalNewEvent,
  ModalError,
  ModalRemove,
} from './components';

import reducer, { stateProps } from './reducer';

import styles from './App.styles';

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

      <ModalNewEvent
        isVisible={state.visibleModalNewEvent}
        selectedDate={state.selectedDate?.toString()}
        onChangeText={(text) =>
          dispatch({ type: 'setEventTitle', payload: text })
        }
        onPressAdd={() => {
          createCalAndEvent();
          closeModalNewEvent();
        }}
        onPressCancel={closeModalNewEvent}
      />

      <ModalError
        isVisible={state.visibleModalError}
        onPress={closeModalError}
      />

      <ModalRemove
        isVisible={state.visibleModalRemove}
        onPressCancel={closeModalRemove}
        onPressContinue={() => {
          dispatch({ type: 'setEvents', payload: undefined });
          removeCalendar();
          closeModalRemove();
        }}
      />

      <StatusBar style='light' />
    </View>
  );
}
