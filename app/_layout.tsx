import { Stack, usePathname } from "expo-router";
import "../global.css";
import Header from "@/components/Header";
import React from "react";

export default function RootLayout() {
  const pathname = usePathname();
  const ShowHeader =
    pathname === "/Home" ||
    pathname === "/Setting";
  return (
    <>
      {ShowHeader && <Header />}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        {/* <Stack.Screen name="index" /> */}
      </Stack>
    </>
  );
}