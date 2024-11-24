import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/styledcomponents";
import QRCode from "react-qr-code";
import { useRouter } from "expo-router";

export default function QRScreen() {
  const [userId, setUserId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [userQRCode, setQRCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // add the fetch user id logic here from the backemd
        const storedUserId = await AsyncStorage.getItem("id");
        const storedBalance = await AsyncStorage.getItem("balance");
        const userQRCode = await AsyncStorage.getItem("qrCode");

        // Simulated fallback for example purposes
        setUserId(storedUserId || "default_userId");
        setBalance(storedBalance || 1000); // Fallback to 1000 points for testing
        setQRCode(userQRCode || "default_qr");
      } catch (error) {
        Alert.alert("Error", "Failed to fetch user data.");
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
    </View>
  );
}
