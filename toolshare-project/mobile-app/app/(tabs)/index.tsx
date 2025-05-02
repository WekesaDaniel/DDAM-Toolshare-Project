import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Welcome to KarimuTech</Text>
      <Image source={require('@/assets/images/home/banner.png')} style={styles.banner} />
      <Text style={styles.sectionTitle}>Quick Access</Text>
      <View style={styles.cardRow}>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/tools')}>
          <Image source={require('@/assets/images/tools/tools-icon.png')} style={styles.icon} />
          <Text style={styles.label}>Tools</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/explore')}>
          <Image source={require('@/assets/images/explore/explore-icon.png')} style={styles.icon} />
          <Text style={styles.label}>Explore</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 28, fontWeight: 'bold', marginVertical: 12 },
  banner: { width: '100%', height: 180, borderRadius: 10 },
  sectionTitle: { fontSize: 22, marginTop: 24 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 },
  card: { alignItems: 'center' },
  icon: { width: 80, height: 80 },
  label: { marginTop: 8, fontSize: 16 },
});
