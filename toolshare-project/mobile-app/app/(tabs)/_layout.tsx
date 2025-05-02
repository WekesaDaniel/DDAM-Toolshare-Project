import { Tabs, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useEffect } from 'react';

export default function TabLayout() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('notifications')}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'ellipse';

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
