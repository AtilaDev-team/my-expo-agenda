import { View } from 'react-native';
import Modal from 'react-native-modal';
import styles from './AgendaModal.styles';

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
