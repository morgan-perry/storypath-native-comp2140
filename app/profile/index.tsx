import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';
import { Platform } from 'react-native';

const ProfilePage: React.FC = () => {
  const [participantUsername, setParticipantUsername] = useState('');
  const navigation = useNavigation();
  const { username, setUsername, avatarUri, setAvatarUri } = useContext(UserContext);

  useEffect(() => {
    loadUsername();
    // No need to load avatarUri here since it's handled by UserContext
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

      // Update the username in context
      setUsername(participantUsername);

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

  const pickImage = async () => {
    try {
      // Request permission to access media library
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
        return;
      }

      // Launch the image picker
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1], // Square aspect ratio
        quality: 0.5,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: false, // Set to true if you need base64 on Web
      });

      // Check if the user canceled the picker
      if (pickerResult.canceled) {
        // User canceled the picker, no action needed
        return;
      }

      // Access the first asset
      const asset = pickerResult.assets && pickerResult.assets.length > 0 ? pickerResult.assets[0] : null;

      if (!asset || !asset.uri) {
        throw new Error('Image picker returned no uri');
      }

      const uri = asset.uri;
      let newPath: string | null = null;

      if (Platform.OS !== 'web') {
        // For native platforms (iOS and Android)

        const filename = uri.split('/').pop();
        if (!filename) {
          throw new Error('Failed to get filename from uri');
        }

        newPath = `${FileSystem.documentDirectory}${filename}`;

        // Copy the selected image to the document directory
        await FileSystem.copyAsync({
          from: uri,
          to: newPath,
        });
      } else {
        // For Web platform
        // On Web, the URI is already a data URL, so no need to copy
        newPath = uri;
      }

      // Save the new URI to AsyncStorage and context
      await AsyncStorage.setItem('avatarUri', newPath);
      setAvatarUri(newPath);
    } catch (error) {
      console.error('Error saving avatar:', error);
      Alert.alert('Error', 'Failed to save avatar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>StoryPath</Text>
      <Text style={styles.subHeader}>Profile</Text>

      <View style={styles.profileImageContainer}>
        <TouchableOpacity style={styles.profileImage} onPress={pickImage}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.profileImageText}>Tap to add photo</Text>
          )}
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
    overflow: 'hidden',
  },
  profileImageText: {
    color: '#888',
    textAlign: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
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
