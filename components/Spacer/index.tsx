import React from 'react';
import { View } from 'react-native';

export type SpacerProps = {
  h?: number;
  w?: number;
};

export const Spacer = ({ h, w }: SpacerProps) => {
  return <View style={{ marginVertical: h, marginHorizontal: w }} />;
};
