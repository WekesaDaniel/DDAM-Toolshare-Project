import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

const dummyData = {
  farming: [
    { id: '1', name: 'Hoe', image: require('@/assets/images/tools/hoe.jpg') },
    { id: '2', name: 'Plow', image: require('@/assets/images/tools/plow.jpg') },
  ],
  gardening: [
    { id: '3', name: 'Pruner', image: require('@/assets/images/tools/pruner.jpg') },
    { id: '4', name: 'Shovel', image: require('@/assets/images/tools/shovel.jpg') },
  ],
  cleaning: [
    { id: '5', name: 'Broom', image: require('@/assets/images/tools/broom.jpg') },
  ],
  construction: [
    { id: '6', name: 'Drill', image: require('@/assets/images/tools/drill2.jpg') },
  ],
};

// Map category slugs to IDs (you should align this with your actual DB values)
const categoryMap: Record<string, number> = {
  farming: 1,
  gardening: 2,
  cleaning: 3,
  construction: 4,
};

export default function Category() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [tools, setTools] = useState<any[]>([]);

  useEffect(() => {
    const fetchTools = async () => {
      const categoryId = categoryMap[id ?? ''] || null;

      try {
        if (!categoryId) return;

        const response = await api.get('/tools/'); // adjust path if needed
        const dbTools = response.data.filter((tool: any) => tool.category_id === categoryId);

        const formatted = dbTools.map((tool: any) => ({
          id: `db-${tool.id}`,
          name: tool.name,
          image: { uri: `http://localhost:8000${tool.image}` }, // adjust host/IP as needed
        }));

        const combined = [...(dummyData[id as keyof typeof dummyData] || []), ...formatted];
        setTools(combined);
      } catch (err) {
        console.error('Error fetching tools:', err);
        setTools(dummyData[id as keyof typeof dummyData] || []);
      }
    };

    fetchTools();
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{id?.toUpperCase()} Tools</Text>
      <FlatList
        data={tools}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  card: { marginBottom: 16, alignItems: 'center' },
  image: { width: 100, height: 100, borderRadius: 8 },
  name: { marginTop: 8, fontSize: 16 },
});
