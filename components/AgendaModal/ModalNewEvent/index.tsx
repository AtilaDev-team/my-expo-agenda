import { View, Text, TextInput } from 'react-native';
import { DateChangedCallback } from 'react-native-calendar-picker';

import { AgendaModal } from '../';
import { Button } from '../../Button';

import styles from './ModalNewEvent.styles';

type Props = {
  isVisible: boolean;
  selectedDate: string | undefined;
  onChangeText: (text: string) => void;
  onPressCancel: () => void;
  onPressAdd: () => void;
};

export const ModalNewEvent = ({
  isVisible,
  selectedDate,
  onChangeText,
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
        />
        <View style={styles.buttonsContainer}>
          <Button title='Cancel' onPress={onPressCancel} />
          <Button title='Add' onPress={onPressAdd} />
        </View>
      </View>
    </AgendaModal>
  );
};
