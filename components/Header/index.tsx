import { View, Text, StyleSheet } from 'react-native';

export const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Left button */}
        <View>
          <Text style={styles.text}>Btn1</Text>
        </View>
        {/* Header Title */}
        <View>
          <Text style={styles.text}>My Expo Agenda</Text>
        </View>
        {/* Right button */}
        <View>
          <Text style={styles.text}>Btn2</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    height: 110,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    paddingHorizontal: 15,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 67,
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
