import React from 'react';
import { View, Text } from 'react-native';
import AddTool from '../../components/AddTool';  // adjust the path if needed

export default function ShareScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, padding: 16 }}>Share a Tool</Text>
      <AddTool />
    </View>
  );
}
