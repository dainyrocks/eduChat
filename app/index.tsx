import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, View } from "react-native";

export default function StartPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SecureStore.deleteItemAsync("secure-token");
    SecureStore.deleteItemAsync("user-id");
    SecureStore.getItemAsync("user-type");
    const checkLoginStatus = async () => {
      const token = await SecureStore.getItemAsync("secure-token");
      if (token) {
        router.replace("./AuthPages/SecureLock");
      } else {
        router.replace("./AuthPages/Login");
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null;
}
