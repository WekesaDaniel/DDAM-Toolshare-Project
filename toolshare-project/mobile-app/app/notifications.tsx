import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import axios from 'axios';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('TOOL');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await axios.get('http://192.168.91.143/api/notifications/');
    setNotifications(res.data);
  };

  const markAllAsRead = async () => {
    await axios.post('http://192.168.91.143/api/notifications/mark-all-read/');
    fetchNotifications();
  };

  const handleNotificationPress = async (notification) => {
    if (!notification.read) {
      await axios.patch(`http://192.168.91.143/api/notifications/${notification.id}/`, { read: true });
    }
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markAll}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {['TOOL', 'MAINTENANCE'].map(type => (
          <TouchableOpacity
            key={type}
            style={activeTab === type ? styles.tabActive : styles.tab}
            onPress={() => setActiveTab(type)}>
            <Text style={activeTab === type ? styles.tabTextActive : styles.tabText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView>
        {notifications.filter(n => n.type === activeTab).map((notification, index, arr) => (
          <View key={notification.id}>
            {(index === 0 || arr[index - 1].date !== notification.date) && (
              <Text style={styles.dateHeader}>{notification.date}</Text>
            )}
            <TouchableOpacity
              style={[styles.notification, notification.read ? styles.read : styles.unread]}
              onPress={() => handleNotificationPress(notification)}>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationMessage}>
                  <Text style={styles.systemName}>ToolShare</Text>: {notification.message}
                </Text>
                <View style={styles.notificationMeta}>
                  <Text style={styles.notificationType}>{notification.type}</Text>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, padding: 20 }}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={{ color: '#007AFF', marginBottom: 20 }}>Back</Text>
          </TouchableOpacity>
          {selectedNotification && (
            <>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Notification Detail</Text>
              <Text style={{ marginVertical: 10 }}><Text style={{ fontWeight: 'bold' }}>Type:</Text> {selectedNotification.type}</Text>
              <Text><Text style={{ fontWeight: 'bold' }}>Message:</Text> {selectedNotification.message}</Text>
              <Text style={{ marginTop: 10 }}><Text style={{ fontWeight: 'bold' }}>Time:</Text> {selectedNotification.time}</Text>
              <Text><Text style={{ fontWeight: 'bold' }}>Date:</Text> {selectedNotification.date}</Text>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  markAll: {
    color: '#007AFF',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  tabActive: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    color: '#666',
  },
  tabTextActive: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  dateHeader: {
    padding: 15,
    paddingBottom: 5,
    color: '#666',
    backgroundColor: '#f9f9f9',
  },
  notification: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  read: {
    backgroundColor: '#fff',
  },
  unread: {
    backgroundColor: '#f0f8ff',
  },
  notificationContent: {
    flexDirection: 'column',
  },
  systemName: {
    fontWeight: 'bold',
  },
  notificationMessage: {
    marginBottom: 5,
  },
  notificationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationType: {
    backgroundColor: '#e1f5fe',
    color: '#0288d1',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 10,
    fontSize: 12,
  },
  notificationTime: {
    color: '#666',
    fontSize: 12,
  },
});
