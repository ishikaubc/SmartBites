import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-qr-code";
import { useRouter } from "expo-router";
import styles from "../styles/styledcomponents";


export default function QRScreen() {
  const [userId, setUserId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [userQRCode, setQRCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from AsyncStorage
        const storedUserId = await AsyncStorage.getItem("id");
        const storedBalance = await AsyncStorage.getItem("balance");
        const storedQRCode = await AsyncStorage.getItem("qrCode");

        if (storedUserId && storedBalance && storedQRCode) {
          setUserId(storedUserId);
          setBalance(storedBalance);
          setQRCode(storedQRCode);
        } else {
          Alert.alert(
            "Error",
            "Failed to retrieve user data. Please login again."
          );
        }
      } catch (error) {
        Alert.alert("Error", "An unexpected error occurred while fetching data.");
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

  if (!userId) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Unable to generate QR code.</Text>
        <Text style={{ color: "red" }}>
          Make sure you are logged in and try again.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()} // Go back to the previous page
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Your QR Code</Text>

      <View style={styles.qrContainer}>
        <QRCode size={200} value={userQRCode} />
      </View>

      <Text style={{ marginTop: 20, fontSize: 16, color: "#555" }}>
        Show this QR code to the cashier to earn points for your smart meal
        purchase.
      </Text>

      <Text style={{ marginTop: 20, fontSize: 14, color: "#555" }}>
        Current Balance: {balance || "N/A"} points
      </Text>
    </View>
  );
}