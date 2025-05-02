import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import api from '../../lib/axios';

export default function HomeScreen() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    api.get('/tools/')
      .then((res) => setTools(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Available Tools</Text>
      <FlatList
        data={tools}
        keyExtractor={(item) => item.tool_id?.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
