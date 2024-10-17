import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Drawer } from "expo-router/drawer";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

function CustomDrawerContent(props) {
  const [username, setUsername] = useState('participant_username');

  useEffect(() => {
    const loadUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('participantUsername');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Error loading username:', error);
      }
    };

    loadUsername();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoSection}>
        <Text style={styles.title}>StoryPath</Text>
        <Text style={styles.userInfo}>Current User:</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function RootLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Welcome",
          title: "Welcome",
          drawerIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="projects"
        options={{
          drawerLabel: "Projects",
          title: "Projects",
          drawerIcon: ({ color }) => (
            <FontAwesome name="list" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Profile",
          title: "Profile",
          drawerIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: "About",
          title: "About",
          drawerIcon: ({ color }) => (
            <FontAwesome name="info-circle" size={24} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  userInfoSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 14,
    color: '#888',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
