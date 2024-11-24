import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import styles from "../styles/styledcomponents";

export default function MainPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  const handleSignOut = async () => {
    await AsyncStorage.clear();
    router.push("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem("authToken"); //store the auth token in the local storage
      const storedUserId = await AsyncStorage.getItem("id"); //store the user id

      if (!token || !storedUserId) {
        router.replace("/login"); // Redirect to Login if not authenticated
      } else {
        setUserId(storedUserId);
      }

      setLoading(false);
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

      <TouchableOpacity
        style={[styles.button, styles.walletButton]}
        onPress={() => router.push("/wallet")} //takes to wallet page
      >
        <Text style={styles.buttonText}>View Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.profileButton]}
        onPress={() => router.push("/profile")} //takes to profile page
      >
        <Text style={styles.buttonText}>View Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.qrButton]}
        onPress={() => router.push("/qr")} //takes to QR page
      >
        <Text style={styles.buttonText}>Generate QR Code</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.signoutButton]}
        onPress={handleSignOut} //Signs out user
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
