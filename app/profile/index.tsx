import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ProfilePage: React.FC = () => {
  const [participantUsername, setParticipantUsername] = useState('');

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
        placeholder="participant_username"
        value={participantUsername}
        onChangeText={setParticipantUsername}
      />
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
});

export default ProfilePage;
