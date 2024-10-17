import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function ProjectLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Project Info",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="info" size={24} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="map" size={24} color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
