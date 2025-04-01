import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as Device from "expo-device";
import * as Crypto from "expo-crypto";
import { AntDesign } from "@expo/vector-icons";
import axiosClient from "../API/axiosClient";
import { useRouter } from "expo-router";

export default function SecureLock() {
  const [pin, setPin] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [keyAvailable, setKeyAvailable] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const hashData = async (data: string): Promise<string> => {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      data
    );
  };

  const getDeviceID = async (): Promise<string> => {
    return `${Device.osName}${Device.manufacturer}${Device.brand}${Device.modelName}`;
  };

  const handlePinPress = (num: string) => {
    if (pin.length < 6) {
      setPin(pin + num);
    }
  };

  const clearPin = () => {
    setPin("");
  };

  useEffect(() => {
    const checkKeyStored = async () => {
      try {
        const userId = await SecureStore.getItemAsync("user-id");
        if (!userId) {
          setMessage("User ID not found. Try logging in again.");
          setLoading(false);
          return;
        }

        const userType = await SecureStore.getItemAsync("user-type");
        const apiEndpoint =
          userType === "teacher"
            ? "/teacher-passcode-check"
            : "/check-passcode";

        const response = await axiosClient.get(apiEndpoint, {
          headers: {
            "Content-Type": "application/json",
            userid: userId,
          },
        });

        if (response.data.success) {
          setKeyAvailable(true);
          setMessage("PIN found. Enter your 6-digit PIN to unlock.");
        } else {
          setKeyAvailable(false);
          setMessage(response.data.message || "No passcode stored.");
        }
      } catch (error) {
        setMessage("Error Checking PIN. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    checkKeyStored();
  }, []);

  const registerPIN = async (): Promise<void> => {
    if (pin.length !== 6) {
      setMessage("PIN must be 6 digits.");
      return;
    }

    try {
      const userId = await SecureStore.getItemAsync("user-id");
      if (!userId) {
        setMessage("User ID not found. Try logging in again.");
        return;
      }

      const deviceID = await getDeviceID();
      const hashedPin = await hashData(`${pin}${deviceID}`);

      const userType = await SecureStore.getItemAsync("user-type");
      const apiEndpoint =
        userType === "teacher" ? "/teacher-passcode-store" : "/store-passcode";

      const response = await axiosClient.post(
        apiEndpoint,
        { passcode: hashedPin },
        {
          headers: {
            "Content-Type": "application/json",
            userid: userId,
          },
        }
      );

      if (response.data.success) {
        setKeyAvailable(true);
        setMessage("PIN successfully registered.");
        setPin("");
      }
    } catch (error) {
      setMessage("Error saving PIN.");
    } finally {
      setLoading(false);
    }
  };

  const verifyPIN = async (): Promise<void> => {
    const userId = await SecureStore.getItemAsync("user-id");
    if (!userId) {
      setMessage("User ID not found. Try logging in again.");
      return;
    }

    const deviceID = await getDeviceID();
    const hashedInput = await hashData(`${pin}${deviceID}`);

    const userType = await SecureStore.getItemAsync("user-type");
    const apiEndpoint =
      userType === "teacher" ? "/teacher-passcode-verify" : "/verify-passcode";

    const response = await axiosClient.post(
      apiEndpoint,
      { passcode: hashedInput },
      {
        headers: {
          "Content-Type": "application/json",
          userid: userId,
        },
      }
    );

    if (response.data.success) {
      setIsAuthenticated(true);
      router.push("/Home");
    } else {
      setMessage(response.data.message);
    }
    setPin("");
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="blue" />
        <Text className="text-gray-600 mt-4">Checking security setup...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center gap-10 bg-gray-100 p-6">
      <View className="flex-col items-center justify-center gap-2">
        <Text className="text-2xl font-bold text-blue-600">
          {keyAvailable ? "Enter Passcode" : "Set Up Passcode"}
        </Text>
        {!keyAvailable && (
          <Text className="text-lg font-semibold text-gray-700 text-center">
            Secure your access with a personalized PIN. Keep it safe and easy to
            remember!
          </Text>
        )}
      </View>

      {message && <Text className="text-red-500">{message}</Text>}

      <View className="flex-row justify-center gap-4">
        {[...Array(6)].map((_, i) => (
          <View
            key={i}
            className={`w-4 h-4 rounded-full ${
              i < pin.length ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </View>

      <View className="flex-col gap-6">
        <View className="flex-row gap-6">
          <TouchableOpacity
            className="w-24 h-24 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md"
            onPress={() => handlePinPress("1")}
          >
            <Text className="text-2xl font-semibold">1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-24 h-24 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md"
            onPress={() => handlePinPress("2")}
          >
            <Text className="text-2xl font-semibold">2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-24 h-24 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md"
            onPress={() => handlePinPress("3")}
          >
            <Text className="text-2xl font-semibold">3</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row gap-6">
          <TouchableOpacity
            className="w-24 h-24 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md"
            onPress={() => handlePinPress("4")}
          >
            <Text className="text-2xl font-semibold">4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-24 h-24 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md"
            onPress={() => handlePinPress("5")}
          >
            <Text className="text-2xl font-semibold">5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-24 h-24 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md"
            onPress={() => handlePinPress("6")}
          >
            <Text className="text-2xl font-semibold">6</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row gap-6">
          <TouchableOpacity
            className="w-24 h-24 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md"
            onPress={() => handlePinPress("7")}
          >
            <Text className="text-2xl font-semibold">7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-24 h-24 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md"
            onPress={() => handlePinPress("8")}
          >
            <Text className="text-2xl font-semibold">8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-24 h-24 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md"
            onPress={() => handlePinPress("9")}
          >
            <Text className="text-2xl font-semibold">9</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row gap-6">
          <TouchableOpacity
            className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-md"
            onPress={clearPin}
          >
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-24 h-24 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md"
            onPress={() => handlePinPress("0")}
          >
            <Text className="text-2xl font-semibold">0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-md"
            onPress={keyAvailable ? verifyPIN : registerPIN}
          >
            <AntDesign name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
