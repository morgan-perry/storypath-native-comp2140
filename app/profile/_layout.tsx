import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Slot } from 'expo-router';

const ProfileLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>StoryPath</Text>
        <Text style={styles.pageTitle}>Profile</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Slot />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProfileLayout;

