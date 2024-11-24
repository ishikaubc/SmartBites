import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/styledcomponents";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VoucherScreen() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const userBalance = await AsyncStorage.getItem("userBalance");
      setBalance(userBalance ? parseInt(userBalance) : 0);
    };

    fetchBalance();
  }, []);

  const handleRedeem = (points, reward) => {
    if (balance >= points) {
      Alert.alert(
        "Voucher Redeemed",
        `You redeemed ${reward}! Remaining Balance: ${balance - points} points`
      );
      // Update balance in AsyncStorage or backend
    } else {
      Alert.alert("Insufficient Points", "You don't have enough points for this reward.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vouchers</Text>
      <Text style={{ marginBottom: 20 }}>Your Balance: {balance} Points</Text>

      <TouchableOpacity
        style={[styles.button, styles.walletButton]}
        onPress={() => handleRedeem(50, "25% off plant-based meal")}
      >
        <Text style={styles.buttonText}>50 Points - 25% off plant-based meal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.walletButton]}
        onPress={() => handleRedeem(100, "50% off plant-based meal")}
      >
        <Text style={styles.buttonText}>100 Points - 50% off plant-based meal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.walletButton]}
        onPress={() => handleRedeem(200, "Free dessert with meal")}
      >
        <Text style={styles.buttonText}>200 Points - Free dessert</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.walletButton]}
        onPress={() => handleRedeem(500, "$5 off any meal")}
      >
        <Text style={styles.buttonText}>500 Points - $5 off any meal</Text>
      </TouchableOpacity>
    </View>
  );
}
