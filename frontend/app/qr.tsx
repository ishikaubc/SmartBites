import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/styledcomponents";

export default function QRScreen() {
  const [userId, setUserId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // add the fetch user id logic here from the backemd
        const storedUserId = await AsyncStorage.getItem("userId");
        const storedBalance = await AsyncStorage.getItem("balance");

        // Simulated fallback for example purposes
        setUserId(storedUserId || "exampleUserId");
        setBalance(storedBalance || 1000); // Fallback to 1000 points for testing
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

  if (!userId || balance === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Unable to generate QR code.</Text>
        <Text style={{ color: "red" }}>
          Make sure you are logged in and try again.
        </Text>
      </View>
    );
  }

  const qrData = {
    userId,
    balance,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your QR Code</Text>

      <View style={customStyles.qrContainer}>
        <QRCode value={JSON.stringify(qrData)} size={200} />
      </View>

      <Text style={{ marginTop: 20, fontSize: 16, color: "#555" }}>
        Show this QR code to the cashier to earn points for your smart meal
        purchase.
      </Text>
    </View>
  );
}

const customStyles = StyleSheet.create({
  qrContainer: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});