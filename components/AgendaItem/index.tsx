import React from 'react';
import * as Calendar from 'expo-calendar';
import { View, Text, StyleSheet } from 'react-native';
import Spacer from '../Spacer';

type Props = {
  item: Calendar.Event;
};

export const AgendaItem = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textDate}>
        {new Date(item.startDate).toLocaleDateString()}
      </Text>
      <Spacer h={2} />
      <Text style={styles.eventText}>{item.title}</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#E1BEE7',
    paddingBottom: 5,
    marginBottom: 15,
    paddingLeft: 5,
  },
  textDate: {
    fontWeight: 'bold',
  },
  eventText: {
    fontSize: 16,
  },
});
