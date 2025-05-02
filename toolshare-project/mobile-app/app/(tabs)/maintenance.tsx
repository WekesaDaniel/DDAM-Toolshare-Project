import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';

const maintenanceTasks = [
  { id: '1', title: 'Oil Chainsaw', description: 'Regular maintenance to avoid rusting', image: require('@/assets/images/maintenance/chainsaw.jpg') },
  { id: '2', title: 'Clean Drill Bits', description: 'Ensure sharpness and efficiency', image: require('@/assets/images/maintenance/drill-bits.jpg') },
];

export default function Maintenance() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.91.143/maintenance/')
      .then(response => setRecords(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tool Maintenance Tips</Text>

      {/* Hardcoded Items */}
      {maintenanceTasks.map((task) => (
        <View key={task.id} style={styles.card}>
          <Image source={task.image} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.desc}>{task.description}</Text>
          </View>
        </View>
      ))}

      {/* Dynamic Items */}
      {records.map((record) => (
        <View key={record.id} style={styles.card}>
          {record.tool.image ? (
            <Image source={{ uri: `http://192.168.91.143>/media/${record.tool.image}` }} style={styles.image} />
          ) : (
            <View style={[styles.image, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={{ fontSize: 12 }}>No Image</Text>
            </View>
          )}
          <View style={styles.info}>
            <Text style={styles.title}>{record.tool.name} - {record.maintenance_type}</Text>
            <Text style={styles.desc}>{record.description}</Text>
            <Text style={styles.desc}>Performed By: {record.performed_by}</Text>
            <Text style={styles.desc}>Status: {record.status}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 12 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
  },
  image: { width: 100, height: 100 },
  info: { padding: 10, flex: 1 },
  title: { fontSize: 18, fontWeight: '600' },
  desc: { fontSize: 14, color: '#666' },
});
