import { View, Text } from 'react-native';
import React from 'react';

import { AgendaModal } from '..';
import { Button } from '../../Button';

import styles from './ModalRemove.styles';
import { Spacer } from '../../Spacer';

type Props = {
  isVisible: boolean;
  onPressCancel: () => void;
  onPressContinue: () => void;
  calendarName: string;
};

export const ModalRemove = ({
  isVisible,
  onPressCancel,
  onPressContinue,
  calendarName,
}: Props) => {
  return (
    <AgendaModal isVisible={isVisible}>
      <View style={styles.modalRemoveContainer}>
        <Text style={styles.text}>
          This actions will remove your{' '}
          {<Text style={{ fontWeight: '500' }}>{calendarName}</Text>} calendar!
        </Text>
        <View style={styles.buttonsContainer}>
          <Button title='Cancel' onPress={onPressCancel} />
          <Spacer w={5} />
          <Button title='Continue' onPress={onPressContinue} />
        </View>
      </View>
    </AgendaModal>
  );
};
