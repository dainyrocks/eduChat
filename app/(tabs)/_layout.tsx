import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Setting"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
