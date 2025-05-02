import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';

const categories = [
  { id: 'farming', name: 'Farming Tools', image: require('@/assets/images/explore/farming.png') },
  { id: 'gardening', name: 'Gardening Tools', image: require('@/assets/images/explore/gardening.png') },
  { id: 'cleaning', name: 'Cleaning Tools', image: require('@/assets/images/explore/cleaning.jpg') },
  { id: 'construction', name: 'Construction Tools', image: require('@/assets/images/explore/construction.jpg') },
];

export default function Explore() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Explore Tool Categories</Text>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          onPress={() => navigation.navigate('category', { id: category.id })}
        >
          <ImageBackground source={category.image} style={styles.image} imageStyle={{ borderRadius: 10 }}>
            <View style={styles.overlay}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 16 },
  image: { height: 150, marginBottom: 16, justifyContent: 'flex-end' },
  overlay: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
  categoryText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
