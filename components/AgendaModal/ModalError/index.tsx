import { View, Text } from 'react-native';
import React from 'react';

import { AgendaModal } from '..';
import { Button } from '../../Button';

import styles from './ModalError.styles';

type Props = {
  isVisible: boolean;
  onPress: () => void;
};

export const ModalError = ({ isVisible, onPress }: Props) => {
  return (
    <AgendaModal isVisible={isVisible}>
      <View style={styles.modalErrorContainer}>
        <Text style={styles.textMessage}>You must select a date first!</Text>
        <View style={styles.buttonContainer}>
          <Button title='Ok' onPress={onPress} />
        </View>
      </View>
    </AgendaModal>
  );
};
