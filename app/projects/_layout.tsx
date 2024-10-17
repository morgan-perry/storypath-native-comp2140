import { Stack } from "expo-router";

export default function ProjectsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Projects" }} />
      <Stack.Screen 
        name="[id]" 
        options={({ route }) => ({ 
          title: `Project ${route.params?.id}`,
        })} 
      />
    </Stack>
  );
}

