import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { usePathname, useRouter } from "expo-router";

export default function ProfileHeader() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const eventHeaderPart1 = pathname === "/Attendance/Attendance_History";
  const eventHeaderPart2 = pathname === "/Attendance/Attendance_Teacher";
  const eventHeaderPart3 = pathname === "/Attendance/Attendance_Student";
  const eventHeaderPart4 = pathname === "/Attendance/Attendance_HistoryStd";
  return (
    <>
      <Modal transparent={true} visible={isVisible} animationType="none">
        <TouchableOpacity
          className="flex-1 items-end justify-start pt-16 pr-3"
          onPress={() => setIsVisible(false)}
        >
          <View className="bg-white shadow-lg shadow-black rounded-md">
            <TouchableOpacity className="flex-row px-8 py-2 items-start justify-center gap-1">
              <Ionicons name="information-circle" size={26} color="black" />
              <Text className="text-xl font-bold">Detail</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <View className="w-full h-16 flex-row justify-between items-center px-6 border-b-2 border-gray-200 bg-white">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={28} color="black" />
          </TouchableOpacity>
          {!eventHeaderPart1 && !eventHeaderPart2 && !eventHeaderPart3 && !eventHeaderPart4 ? (
            <Text className="text-2xl font-extrabold">Profile</Text>
          ):(<Text className="text-2xl font-extrabold">Attendance</Text>)}
        </View>

        {!eventHeaderPart1 && !eventHeaderPart2 && !eventHeaderPart3 && !eventHeaderPart4 &&(
          <View className="flex-row items-center gap-6">
            <Octicons name="bell" size={24} color="black" />
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color="black"
              onPress={() => setIsVisible(!isVisible)}
            />
          </View>
        )}
      </View>
    </>
  );
}
