import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024; // Adjust this breakpoint as needed

  const buttonStyle = {
    backgroundColor: '#FF6B6B',
    color: 'white',
    padding: 15,
    borderRadius: 5,
    width: isDesktop ? '25%' : '100%',
    textAlign: 'center' as const,
    marginBottom: 10,
    fontWeight: 'bold' as const,
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.headerText}>Welcome</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to StoryPath</Text>
        <Text style={styles.subtitle}>
          Explore Unlimited Location-based Experiences
        </Text>
        <Text style={styles.description}>
          With StoryPath, you can discover and create amazing location-based adventures. From city tours to treasure hunts, the possibilities are endless!
        </Text>
        <View style={styles.buttonContainer}>
          <Link href="/create-profile" asChild>
            <Text style={buttonStyle}>CREATE PROFILE</Text>
          </Link>
          <Link href="/projects" asChild>
            <Text style={buttonStyle}>EXPLORE PROJECTS</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
