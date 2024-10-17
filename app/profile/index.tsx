import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';

const ProfilePage: React.FC = () => {
  const [participantUsername, setParticipantUsername] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    loadUsername();
  }, []);

  const loadUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('participantUsername');
      if (storedUsername) {
        setParticipantUsername(storedUsername);
      }
    } catch (error) {
      console.error('Error loading username:', error);
    }
  };

  const handleSaveUsername = async () => {
    if (participantUsername.trim() === '') {
      Alert.alert('Error', 'Please enter a valid username');
      return;
    }

    try {
      await AsyncStorage.setItem('participantUsername', participantUsername);
      Alert.alert('Success', 'Username saved successfully');
      
      // Update the drawer by forcing a re-render
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Profile' }],
        })
      );
    } catch (error) {
      console.error('Error saving username:', error);
      Alert.alert('Error', 'Failed to save username');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>StoryPath</Text>
      <Text style={styles.subHeader}>Profile</Text>
      
      <View style={styles.profileImageContainer}>
        <TouchableOpacity style={styles.profileImage}>
          <Text style={styles.profileImageText}>Tap to add photo</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.label}>Your Profile</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter participant username"
        value={participantUsername}
        onChangeText={setParticipantUsername}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveUsername}>
        <Text style={styles.saveButtonText}>Save Username</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    color: '#888',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProfilePage;
