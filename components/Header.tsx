import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, usePathname, useRouter } from "expo-router";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const eventHeaderPart = pathname === "/PostPages/EventHome";
  return (
    <View
      className={`bg-blue-600 h-20 flex-row items-center ${
        eventHeaderPart ? "justify-between" : "justify-center"
      } px-4 shadow-lg shadow-slate-900`}
    >
      {eventHeaderPart && (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>
      )}
      <Text className="text-white font-extrabold text-3xl md:text-4xl">
        eduTalk
      </Text>
      {eventHeaderPart && (
        <View className="flex-row items-center gap-4">
          <TouchableOpacity className="bg-white w-10 h-10 rounded-full flex-row items-center justify-center shadow-md">
              <Ionicons name="add-circle-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-white w-10 h-10 rounded-full flex-row items-center justify-center shadow-md">
              <Feather name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
