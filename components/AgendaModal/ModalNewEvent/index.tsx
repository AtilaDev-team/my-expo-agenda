import { View, Text, TextInput } from 'react-native';
import { DateChangedCallback } from 'react-native-calendar-picker';

import { AgendaModal } from '../';
import { Button } from '../../Button';

import styles from './ModalNewEvent.styles';

type Props = {
  isVisible: boolean;
  selectedDate: DateChangedCallback | undefined;
  onChangeText: (text: string) => void;
  value: string;
  onPressCancel: () => void;
  onPressAdd: () => void;
};

export const ModalNewEvent = ({
  isVisible,
  selectedDate,
  onChangeText,
  value,
  onPressCancel,
  onPressAdd,
}: Props) => {
  return (
    <AgendaModal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.selectedDate}>{selectedDate?.toString()}</Text>
        <TextInput
          placeholder='Event Name'
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
        />
        <View style={styles.buttonsContainer}>
          <Button title='Cancel' onPress={onPressCancel} />
          <Button title='Add' onPress={onPressAdd} />
        </View>
      </View>
    </AgendaModal>
  );
};
