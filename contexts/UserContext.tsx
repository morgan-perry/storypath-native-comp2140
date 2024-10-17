import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserContextProps {
  username: string;
  setUsername: (name: string) => void;
}

export const UserContext = createContext<UserContextProps>({
  username: '',
  setUsername: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState('');

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
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

