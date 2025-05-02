import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function AddTool() {
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [condition, setCondition] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Permission to access media library is needed!');
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !barcode || !condition || !status) {
      Alert.alert('Missing fields', 'Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('barcode', barcode);
    formData.append('current_condition', condition);
    formData.append('status', status);

    if (image) {
      formData.append('image', {
        uri: image,
        name: 'tool.jpg',
        type: 'image/jpeg',
      } as any); // Type workaround for React Native
    }

    try {
      await axios.post('http://192.168.91.143:8000/api/tools/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'Tool added successfully');
      setName('');
      setBarcode('');
      setCondition('');
      setStatus('');
      setImage(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add tool');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Tool</Text>

      <TextInput
        style={styles.input}
        placeholder="Tool Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Barcode"
        value={barcode}
        onChangeText={setBarcode}
      />

      <TextInput
        style={styles.input}
        placeholder="Condition"
        value={condition}
        onChangeText={setCondition}
      />

      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />

      <Button title="Pick an Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={{ marginTop: 20 }}>
        <Button title="Submit Tool" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 15,
    borderRadius: 8,
  },
});
