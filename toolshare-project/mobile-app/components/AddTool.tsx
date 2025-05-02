import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function AddTool() {
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [purchaseCost, setPurchaseCost] = useState('');
  const [replacementValue, setReplacementValue] = useState('');
  const [condition, setCondition] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Permission to access media library is needed!');
      }
    })();
  }, []);

  const [sharedTools, setSharedTools] = useState([]);

useEffect(() => {
  fetchSharedTools();
}, []);

const fetchSharedTools = async () => {
  try {
    const res = await axios.get('http://192.168.91.143:8000/api/shared-tools/');
    setSharedTools(res.data);
  } catch (err) {
    console.error('Failed to fetch shared tools', err);
  }
};

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
    if (!name || !barcode || !condition || !status || !categoryId) {
      Alert.alert('Missing Required Fields', 'Name, Barcode, Condition, Status, and Category ID are required.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('barcode', barcode);
    formData.append('category_id', categoryId);
    formData.append('current_condition', condition);
    formData.append('status', status);

    if (description) formData.append('description', description);
    if (brand) formData.append('brand', brand);
    if (model) formData.append('model', model);
    if (serialNumber) formData.append('serial_number', serialNumber);
    if (purchaseDate) formData.append('purchase_date', purchaseDate);
    if (purchaseCost) formData.append('purchase_cost', purchaseCost);
    if (replacementValue) formData.append('replacement_value', replacementValue);

    if (image) {
      formData.append('image', {
        uri: image,
        name: 'tool.jpg',
        type: 'image/jpeg',
      } as any);
    }

    try {
      await axios.post('http://192.168.91.143:8000/api/tools/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'Tool added successfully');

      // Clear all fields
      setName('');
      setBarcode('');
      setCategoryId('');
      setDescription('');
      setBrand('');
      setModel('');
      setSerialNumber('');
      setPurchaseDate('');
      setPurchaseCost('');
      setReplacementValue('');
      setCondition('');
      setStatus('');
      setImage(null);
    } catch (error: any) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to add tool. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add a New Tool</Text>

      <TextInput style={styles.input} placeholder="Tool Name *" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Barcode *" value={barcode} onChangeText={setBarcode} />
      <TextInput style={styles.input} placeholder="Category ID * (e.g. 1 = Gardening)" value={categoryId} onChangeText={setCategoryId} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} multiline />
      <TextInput style={styles.input} placeholder="Brand" value={brand} onChangeText={setBrand} />
      <TextInput style={styles.input} placeholder="Model" value={model} onChangeText={setModel} />
      <TextInput style={styles.input} placeholder="Serial Number" value={serialNumber} onChangeText={setSerialNumber} />
      <TextInput style={styles.input} placeholder="Purchase Date (YYYY-MM-DD)" value={purchaseDate} onChangeText={setPurchaseDate} />
      <TextInput style={styles.input} placeholder="Purchase Cost" value={purchaseCost} onChangeText={setPurchaseCost} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Replacement Value" value={replacementValue} onChangeText={setReplacementValue} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Current Condition *" value={condition} onChangeText={setCondition} />
      <TextInput style={styles.input} placeholder="Status * (Available, Borrowed...)" value={status} onChangeText={setStatus} />

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>{image ? 'Change Image' : 'Pick an Image'}</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      {loading ? (
        <ActivityIndicator size="large" color="#1e90ff" style={{ marginTop: 20 }} />
      ) : (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Tool</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

<Text style={styles.subHeader}>Currently Shared Tools</Text>
{sharedTools.length === 0 ? (
  <Text style={styles.noDataText}>No tools are currently shared.</Text>
) : (
  sharedTools.map((tx: any, index: number) => (
    <View key={index} style={styles.sharedCard}>
      <Text style={styles.sharedText}>🔧 {tx.tool.name}</Text>
      <Text style={styles.sharedText}>👤 Borrowed by: {tx.member.first_name} {tx.member.last_name}</Text>
      <Text style={styles.sharedText}>📅 Due Date: {new Date(tx.due_date).toLocaleDateString()}</Text>
    </View>
  ))
)}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  imageButton: {
    backgroundColor: '#1e90ff',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 15,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    color: '#222',
  },
  sharedCard: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    marginBottom: 10,
  },
  sharedText: {
    fontSize: 14,
    color: '#333',
  },
  noDataText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },

});
