import * as Calendar from 'expo-calendar';
import { DateChangedCallback } from 'react-native-calendar-picker';

export type stateProps = {
  visibleModalNewEvent: boolean;
  visibleModalError: boolean;
  visibleModalRemove: boolean;
  visibleModalNoCalendar: boolean;
  eventTitle: string;
  selectedDate: DateChangedCallback | undefined;
  events: Calendar.Event[] | undefined;
};

type Actions =
  | { type: 'setVisibleModalNewEvent'; payload: boolean }
  | { type: 'setVisibleModalError'; payload: boolean }
  | { type: 'setVisibleModalRemove'; payload: boolean }
  | { type: 'setVisibleModalNoCalendar'; payload: boolean }
  | { type: 'setEventTitle'; payload: string }
  | { type: 'setSelectedDate'; payload: DateChangedCallback | undefined }
  | { type: 'setEvents'; payload: Calendar.Event[] | undefined }
  | { type: 'clear' };

function reducer(state: stateProps, action: Actions) {
  switch (action.type) {
    case 'setVisibleModalNewEvent':
      return {
        ...state,
        visibleModalNewEvent: action.payload,
      };
    case 'setVisibleModalError':
      return {
        ...state,
        visibleModalError: action.payload,
      };
    case 'setVisibleModalRemove':
      return {
        ...state,
        visibleModalRemove: action.payload,
      };
    case 'setVisibleModalNoCalendar':
      return {
        ...state,
        visibleModalNoCalendar: action.payload,
      };
    case 'setEventTitle':
      return {
        ...state,
        eventTitle: action.payload,
      };
    case 'setSelectedDate':
      return {
        ...state,
        selectedDate: action.payload,
      };
    case 'setEvents':
      return {
        ...state,
        events: action.payload,
      };

    case 'clear':
      return {
        ...state,
        eventTitle: '',
      };
    default:
      return state;
  }
}

export default reducer;
