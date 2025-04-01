import {
  Entypo,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function Home() {
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const getUserType = async () => {
      const usertype = await SecureStore.getItemAsync("user-type");
      setUserType(usertype);
    };
    getUserType();
  }, []);

  return (
    <View className="flex-1 p-4 gap-4 bg-gray-100">
      {/* Events Section */}
      <View className="bg-white border border-blue-500 rounded-2xl p-4 shadow-md shadow-blue-600">
        <Text className="ml-1 text-2xl font-extrabold text-gray-800 mb-2">
          Events
        </Text>
        <ScrollView
          horizontal
          alwaysBounceHorizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          <TouchableOpacity className="flex items-center gap-0.5 justify-center w-44 h-24 bg-blue-600 rounded-lg m-1 shadow-sm">
            <MaterialCommunityIcons name="calendar" size={30} color="white" />
            <Text className="text-lg font-semibold text-white">
              Today Events
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center gap-0.5 justify-center w-44 h-24 bg-blue-600 rounded-lg m-1 shadow-sm">
            <MaterialCommunityIcons
              name="calendar-range"
              size={30}
              color="white"
            />
            <Text className="text-lg font-semibold text-white">
              Ongoing Events
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex items-center gap-0.5 justify-center w-44 h-24 bg-blue-600 rounded-lg m-1 shadow-sm"
          >
            <MaterialIcons name="event-repeat" size={28} color="white" />
            <Text className="text-lg font-semibold text-white">
              Previous Events
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Attendance Section */}
      <View className="bg-blue-600 gap-4 items-center justify-center border border-blue-500 rounded-2xl p-4 shadow-md shadow-blue-600">
        <Text className="text-white text-2xl font-extrabold ">Attendance</Text>
        <View className="flex-row gap-4">
          {userType === "teacher" ? (
            <TouchableOpacity
              className="w-48 h-24 flex items-center justify-center bg-white border border-gray-300 shadow-lg shadow-blue-800 rounded-lg"
            >
              <FontAwesome6 name="user-check" size={24} color="black" />
              <Text className="text-lg font-semibold text-black">
                Take Attendance
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="w-48 h-24 flex items-center justify-center bg-white border border-gray-300 shadow-lg shadow-blue-800 rounded-lg"
            >
              <FontAwesome6 name="user-check" size={24} color="black" />
              <Text className="text-lg font-semibold text-black">
                Give Attendance
              </Text>
            </TouchableOpacity>
          )}
          {userType === "teacher" ? (
            <TouchableOpacity
              className="w-48 h-24 flex items-center justify-center bg-white border border-gray-300 shadow-lg shadow-blue-800 rounded-lg"
            >
              <FontAwesome6 name="user-clock" size={24} color="black" />
              <Text className="text-lg font-semibold text-black">
                Attendance History
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="w-48 h-24 flex items-center justify-center bg-white border border-gray-300 shadow-lg shadow-blue-800 rounded-lg"
            >
              <FontAwesome6 name="user-clock" size={24} color="black" />
              <Text className="text-lg font-semibold text-black">
                Attendance History
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Chat Section */}
      <View className="bg-white border border-blue-500 rounded-2xl p-4 shadow-md shadow-blue-600">
        <TouchableOpacity className="bg-blue-600 flex-row gap-2 items-center px-4 py-4 rounded-lg">
          <Entypo name="chat" size={28} color="white" />
          <Text className="text-2xl font-extrabold text-white">eduChat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
