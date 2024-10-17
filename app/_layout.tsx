import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { FontAwesome } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StyleSheet, View, Text } from 'react-native';
import { UserProvider, UserContext } from '../contexts/UserContext';

function CustomDrawerContent(props) {
  const { username } = React.useContext(UserContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoSection}>
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
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
