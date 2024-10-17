import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { getProject, getLocationByProjectId, Project, ProjectLocation } from '../../../lib/api';

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [project, setProject] = useState<Project | null>(null);
  const [locations, setLocations] = useState<ProjectLocation[]>([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [visitedLocations, setVisitedLocations] = useState<number>(0);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectData = await getProject(Number(id));
        setProject(projectData[0]);

        const locationsData = await getLocationByProjectId(Number(id));
        setLocations(locationsData);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, [id]);

  if (!project) {
    return <Text>Loading...</Text>;
  }

  const totalScore = locations.reduce((sum, location) => sum + location.score_points, 0);

  const containerStyle = [
    styles.container,
    { maxWidth: width > 768 ? 480 : '100%' },
  ];

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={containerStyle}>
        <Text style={styles.title}>{project.title} - Preview</Text>
        <Text style={styles.description}>{project.description}</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{project.title}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text>{project.instructions}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Initial Clue</Text>
            <Text>{project.initial_clue}</Text>
          </View>

          {project.homescreen_display === "Display all locations" && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Locations</Text>
              {locations.map((location) => (
                <Text key={location.id}>{location.location_name}</Text>
              ))}
            </View>
          )}

          <View style={styles.scoreContainer}>
            <View style={styles.scoreCard}>
              <Text style={styles.scoreTitle}>Total Score</Text>
              <Text style={styles.scoreValue}>{currentScore}/{totalScore}</Text>
            </View>
            <View style={styles.scoreCard}>
              <Text style={styles.scoreTitle}>Locations Visited</Text>
              <Text style={styles.scoreValue}>{visitedLocations}/{locations.length}</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreCard: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  scoreTitle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  scoreValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  tab: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 5,
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
