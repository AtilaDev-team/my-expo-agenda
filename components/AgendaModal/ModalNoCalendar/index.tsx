import { View, Text } from 'react-native';
import React from 'react';

import { AgendaModal } from '..';
import { Button } from '../../Button';

import styles from './ModalNoCalendar.styles';

type Props = {
  isVisible: boolean;
  onPress: () => void;
};

export const ModalNoCalendar = ({ isVisible, onPress }: Props) => {
  return (
    <AgendaModal isVisible={isVisible}>
      <View style={styles.modalNoCalendarContainer}>
        <Text style={styles.textMessage}>
          There isn't exist a calendar yet!
        </Text>
        <View style={styles.buttonContainer}>
          <Button title='Ok' onPress={onPress} />
        </View>
      </View>
    </AgendaModal>
  );
};
