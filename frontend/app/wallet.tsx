import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import styles from "../styles/styledcomponents";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; // For navigation

export default function WalletScreen() {
  const [points, setPoints] = useState(0); // Total points earned
  const [balance, setBalance] = useState(0); // Current redeemable balance
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Navigation hook

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        // need to add the API call here to store user's total points and balance
        const userPoints = await AsyncStorage.getItem("userPoints");
        const userBalance = await AsyncStorage.getItem("userBalance");

        setPoints(userPoints ? parseInt(userPoints) : 1500); // Total earned points
        setBalance(userBalance ? parseInt(userBalance) : 1000); // Redeemable points
      } catch (error) {
        Alert.alert("Error", "Failed to load wallet data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  const handleRedeemPoints = async () => {
    if (balance < 50) {
      Alert.alert("Insufficient Balance", "You need at least 50 points to redeem.");
      return;
    }

    try {
      Alert.alert(
        "Redemption Successful",
        "You will now be redirected to the Voucher Page to redeem your points."
      );
      // Navigate to the Voucher Page
      router.push("/voucher");
    } catch (error) {
      Alert.alert("Error", "Failed to redeem points. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.title}>Loading Wallet...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Total Points Earned: <Text style={{ fontWeight: "bold" }}>{points}</Text>
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Current Balance: <Text style={{ fontWeight: "bold" }}>{balance}</Text>
      </Text>

      <TouchableOpacity
        style={[styles.button, styles.walletButton]}
        onPress={handleRedeemPoints}
      >
        <Text style={styles.buttonText}>Redeem Points</Text>
      </TouchableOpacity>
    </View>
  );
}
