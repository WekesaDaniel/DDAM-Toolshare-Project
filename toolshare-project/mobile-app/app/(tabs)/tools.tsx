import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import api from '@/lib/axios';

const dummyTools = [
  {
    id: '1',
    name: 'Drill',
    uri: require('@/assets/images/tools/drill.jpg'),
    description: 'Cordless power drill',
    brand: 'Bosch',
    model: 'X200',
    purchase_cost: '150.00',
    status: 'Available',
  },
  {
    id: '2',
    name: 'Hammer',
    uri: require('@/assets/images/tools/hammer.jpg'),
    description: 'Steel claw hammer',
    brand: 'Stanley',
    model: 'SteelMax',
    purchase_cost: '40.00',
    status: 'In Use',
  },
];

export default function Tools() {
  const [tools, setTools] = useState(dummyTools);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await api.get('/tools/');
        const fetched = response.data.map((tool: any) => ({
          id: `db-${tool.id}`,
          name: tool.name,
          description: tool.description || '',
          uri: tool.image ? { uri: `http://localhost:8000${tool.image}` } : null,
          brand: tool.brand,
          model: tool.model,
          purchase_cost: tool.purchase_cost,
          status: tool.status,
        }));
        setTools([...dummyTools, ...fetched]);
      } catch (error) {
        console.error('Failed to fetch tools:', error);
      }
    };

    fetchTools();
  }, []);

  const filteredTools = tools.filter((tool) => {
    const q = searchQuery.toLowerCase();
    return (
      tool.name?.toLowerCase().includes(q) ||
      tool.model?.toLowerCase().includes(q) ||
      tool.brand?.toLowerCase().includes(q) ||
      tool.purchase_cost?.toString().includes(q) ||
      tool.status?.toLowerCase().includes(q)
    );
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Available Tools</Text>
      <TextInput
        placeholder="Search by name, model, brand, cost, or status"
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredTools.map((tool) => (
        <TouchableOpacity key={tool.id} style={styles.toolCard}>
          {tool.uri && <Image source={tool.uri} style={styles.toolImage} />}
          <View style={styles.toolInfo}>
            <Text style={styles.toolName}>{tool.name}</Text>
            <Text style={styles.toolDesc}>{tool.description}</Text>
            <Text style={styles.toolMeta}>Brand: {tool.brand || 'N/A'}</Text>
            <Text style={styles.toolMeta}>Model: {tool.model || 'N/A'}</Text>
            <Text style={styles.toolMeta}>Cost: ${tool.purchase_cost || 'N/A'}</Text>
            <Text style={styles.toolMeta}>Status: {tool.status}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 16 },
  searchInput: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
  },
  toolCard: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
  },
  toolImage: { width: 100, height: 100, borderRadius: 10 },
  toolInfo: { paddingLeft: 10, flex: 1 },
  toolName: { fontSize: 18, fontWeight: '600' },
  toolDesc: { fontSize: 14, color: '#555' },
  toolMeta: { fontSize: 12, color: '#777', marginTop: 2 },
});
