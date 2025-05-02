import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AddTool from '../../components/AddTool'; // Adjust the path as needed

export default function ShareScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/share/share-tool.jpg')} 
        style={styles.image}
      />
      <Text style={styles.title}>Share a Tool</Text>
      <AddTool />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
