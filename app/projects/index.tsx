import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { getProjects, Project } from '../../lib/api';

export default function ProjectsScreen() {
  const [projects, setProjects] = React.useState<Project[]>([]);

  React.useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const renderProjectItem = ({ item }: { item: Project }) => (
    <Link href={`/projects/${item.id}`} asChild>
      <Pressable style={styles.projectItem}>
        <Text style={styles.projectTitle}>{item.title}</Text>
      </Pressable>
    </Link>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        renderItem={renderProjectItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  projectItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  projectTitle: {
    fontSize: 18,
  },
});
