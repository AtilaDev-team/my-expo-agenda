import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

type Props = {
  children: JSX.Element | JSX.Element[];
  isVisible: boolean;
};

export const AgendaModal = ({ children, isVisible }: Props) => {
  return (
    <Modal
      animationIn={'slideInDown'}
      isVisible={isVisible}
      style={styles.modalContainer}
    >
      <View>{children}</View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
