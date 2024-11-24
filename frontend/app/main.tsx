import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import styles from "../styles/styledcomponents";

export default function MainPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("user");

  const handleSignOut = async () => {
    await AsyncStorage.clear();
    router.push("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken"); // Retrieve the auth token
        const storedUserId = await AsyncStorage.getItem("id"); // Retrieve the user ID
        const storedRole = await AsyncStorage.getItem("role"); // Retrieve the role

        if (!token || !storedUserId || !storedRole) {
          router.replace("/login"); // Redirect to Login if not authenticated
        } else {
          setUserId(storedUserId);
          setRole(storedRole);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userId}!</Text>
      <Text style={styles.subtitle}>
        Role: {role.charAt(0).toUpperCase() + role.slice(1)}
      </Text>

      {/* students will have option to view their wallet, view their profile and generate QR */}
      {role === "student" && (
        <>
          <TouchableOpacity
            style={[styles.button, styles.button]}
            onPress={() => router.push("/wallet")} // Navigate to Wallet page
          >
            <Text style={styles.buttonText}>View Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.button]}
            onPress={() => router.push("/profile")} // Navigate to Profile page
          >
            <Text style={styles.buttonText}>View Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.button]}
            onPress={() => router.push("/qr")} // Navigate to QR page
          >
            <Text style={styles.buttonText}>Generate QR Code</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Options for Cashiers */}
      {role === "cashier" && (
        <>
          <TouchableOpacity
            style={[styles.button, styles.button]}
            onPress={() => router.push("/upload")} // Navigate to File Upload page
          >
            <Text style={styles.buttonText}>Upload Scan File</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.button]}
            onPress={() => router.push("/profile")} // Navigate to Profile page
          >
            <Text style={styles.buttonText}>View Profile</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
