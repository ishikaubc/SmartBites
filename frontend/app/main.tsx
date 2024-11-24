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
  const [firstName, setFirstName] = useState("")
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
        const storedFirstName= await AsyncStorage.getItem("firstName");
        const storedRole = await AsyncStorage.getItem("role"); // Retrieve the role

        if (!token || !storedUserId || !storedRole || !storedFirstName) {
          router.replace("/login"); // Redirect to Login if not authenticated
        } else {
          setUserId(storedUserId);
          setRole(storedRole);
          setFirstName(storedFirstName)
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
      <Text style={styles.title}>Welcome, {firstName}!</Text>
      <Text style={styles.subtitle}>
        Role: {role.charAt(0).toUpperCase() + role.slice(1)}
      </Text>
  
      {/* Options for Students */}
      {role === "student" && (
        <>
          <TouchableOpacity
            style={[styles.featureButton]}
            onPress={() => router.push("/wallet")} // Navigate to Wallet page
          >
            <Text style={styles.featureButtonText}>View Wallet</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[styles.featureButton]}
            onPress={() => router.push("/profile")} // Navigate to Profile page
          >
            <Text style={styles.featureButtonText}>View Profile</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[styles.featureButton]}
            onPress={() => router.push("/qr")} // Navigate to QR page
          >
            <Text style={styles.featureButtonText}>Generate QR Code</Text>
          </TouchableOpacity>
        </>
      )}
  
      {/* Options for Cashiers */}
      {role === "cashier" && (
        <>
        <TouchableOpacity
            style={[styles.featureButton]}
            onPress={() => router.push("/scan")} // Navigate to File Upload page
          >
            <Text style={styles.featureButtonText}>Scan Barcode</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.featureButton]}
            onPress={() => router.push("/upload")} // Navigate to File Upload page
          >
            <Text style={styles.featureButtonText}>Upload Scan File</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[styles.featureButton]}
            onPress={() => router.push("/profile")} // Navigate to Profile page
          >
            <Text style={styles.featureButtonText}>View Profile</Text>
          </TouchableOpacity>
        </>
      )}
  
      {/* Sign Out Button */}
      <TouchableOpacity
        style={[styles.button, styles.button]}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}  