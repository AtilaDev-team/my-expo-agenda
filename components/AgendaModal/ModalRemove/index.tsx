import { View, Text } from 'react-native';
import React from 'react';

import { AgendaModal } from '..';
import { Button } from '../../Button';

import styles from './ModalRemove.styles';
import Spacer from '../../Spacer';

type Props = {
  isVisible: boolean;
  onPressCancel: () => void;
  onPressContinue: () => void;
};

export const ModalRemove = ({
  isVisible,
  onPressCancel,
  onPressContinue,
}: Props) => {
  return (
    <AgendaModal isVisible={isVisible}>
      <View style={styles.modalRemoveContainer}>
        <Text style={styles.text}>
          This actions will remove your actual calendar!
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
