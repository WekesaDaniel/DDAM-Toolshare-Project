import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route, navigation }) => ({
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('notifications')}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        ),
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'ellipse';

          switch (route.name) {
            case 'index':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'explore':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'tools':
              iconName = focused ? 'hammer' : 'hammer-outline';
              break;
            case 'maintenance':
              iconName = focused ? 'construct' : 'construct-outline';
              break;
            case 'share':
              iconName = focused ? 'share-social' : 'share-social-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: true,
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="tools" options={{ title: 'Tools' }} />
      <Tabs.Screen name="maintenance" options={{ title: 'Maintenance' }} />
      <Tabs.Screen name="share" options={{ title: 'Share' }} />
    </Tabs>
  );
}
