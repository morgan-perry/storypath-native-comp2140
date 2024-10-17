import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getProject, getLocationByProjectId, Project, ProjectLocation } from '../../../lib/api';

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [project, setProject] = useState<Project | null>(null);
  const [locations, setLocations] = useState<ProjectLocation[]>([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectData = await getProject(Number(id));
        setProject(projectData[0]); // Assuming getProject returns an array

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.description}>{project.description}</Text>

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

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Published: {project.is_published ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.infoText}>
          Scoring: {project.participant_scoring}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoBox: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  infoText: {
    fontSize: 14,
  },
});

