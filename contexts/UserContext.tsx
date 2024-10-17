import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserContextProps {
  username: string;
  setUsername: (name: string) => void;
  avatarUri: string | null;
  setAvatarUri: (uri: string | null) => void;
}

export const UserContext = createContext<UserContextProps>({
  username: '',
  setUsername: () => {},
  avatarUri: null,
  setAvatarUri: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('participantUsername');
        if (storedUsername) {
          setUsername(storedUsername);
        }

        const storedAvatarUri = await AsyncStorage.getItem('avatarUri');
        if (storedAvatarUri) {
          setAvatarUri(storedAvatarUri);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, avatarUri, setAvatarUri }}>
      {children}
    </UserContext.Provider>
  );
};
