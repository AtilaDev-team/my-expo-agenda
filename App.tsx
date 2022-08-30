import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from './components/Header';

export default function App() {
  return (
    <View style={styles.container}>
      <Header
        onPressLeft={() => {}}
        onPressRight={() => {}}
        title={'My Expo Agenda'}
      />

      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
