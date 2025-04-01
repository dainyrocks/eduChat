import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import axiosClient from "../API/axiosClient";
import * as SecureStore from "expo-secure-store";
import { RadioButton } from "react-native-paper";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("student");

  const handleLogin = async () => {
    setError("");
    if (!username || !password) {
      setError("Please enter login credentials.");
      return;
    }

    const apiEndpoint =
      userType === "teacher" ? "/teacher-login" : "/user-login";

    try {
      const response = await axiosClient.post(apiEndpoint, {
        username,
        password,
      });

      if (response.data.success) {
        const token = response.data.token;
        const userId = response.data.userId;
        const userType = response.data.userType;

        await SecureStore.setItemAsync("secure-token", token);
        await SecureStore.setItemAsync("user-id", userId.toString());
        await SecureStore.setItemAsync("user-type", userType);
        const storedUserId = await SecureStore.getItemAsync("user-id");
        const storedUserType = await SecureStore.getItemAsync("user-type");
        console.log(storedUserId, storedUserType);
        router.push("/AuthPages/SecureLock");
      }
    } catch (error) {
      setError("Invalid username or password.");
    }
  };
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 px-4">
      <View className="bg-white flex-col gap-4 rounded-2xl shadow-lg p-6 w-full max-w-sm">
        <Text className="text-3xl font-extrabold text-center">Login</Text>
        {error ? (
          <Text className="text-red-500 text-center">{error}</Text>
        ) : null}

        <View className="w-full flex-col gap-2">
          <Text className="text-gray-700 font-medium text-center">
            Select User Type
          </Text>
          <RadioButton.Group onValueChange={setUserType} value={userType}>
            <View className="flex-row justify-evenly">
              <TouchableOpacity
                className="bg-white w-36 flex-row items-center justify-center rounded-3xl border border-gray-300 shadow shadow-black"
                onPress={() => setUserType("student")}
              >
                <RadioButton value="student" color="#2664EB" />
                <Text className="mr-2 font-medium">Student</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-white w-36 flex-row items-center justify-center rounded-3xl border border-gray-300 shadow shadow-black"
                onPress={() => setUserType("teacher")}
              >
                <RadioButton value="teacher" color="#2664EB" />
                <Text className="mr-2 font-medium">Teacher</Text>
              </TouchableOpacity>
            </View>
          </RadioButton.Group>
        </View>

        <View className="w-full gap-2">
          <Text className="text-gray-700 font-medium ml-1">Username</Text>
          <TextInput
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 shadow shadow-black"
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View className="w-full gap-2">
          <Text className="text-gray-700 font-medium ml-1">Password</Text>
          <TextInput
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 shadow shadow-black"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Link
          href={"/(tabs)/Home"}
          className="text-blue-500 text-sm text-right"
        >
          Forgot password?
        </Link>

        <TouchableOpacity
          onPress={handleLogin}
          className="w-full bg-blue-600 py-3 rounded-lg shadow-md"
        >
          <Text className="text-white font-bold text-center">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
