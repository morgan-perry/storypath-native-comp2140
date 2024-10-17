import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { FontAwesome } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StyleSheet, View, Text, Image } from 'react-native';
import { UserProvider, UserContext } from '../contexts/UserContext';

function CustomDrawerContent(props) {
  const { username, avatarUri } = React.useContext(UserContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoSection}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar}>
            <FontAwesome name="user" size={40} color="#fff" />
          </View>
        )}
        <Text style={styles.username}>Current User: {username}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function RootLayout() {
  return (
    <UserProvider>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name="projects"
          options={{
            drawerLabel: 'Projects',
            title: 'Projects',
            drawerIcon: ({ color }) => <FontAwesome name="list" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
            drawerIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
          }}
        />
      </Drawer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  userInfoSection: {
    paddingLeft: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  placeholderAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
