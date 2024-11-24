import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/styledcomponents";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; 

export default function VoucherScreen() {
  const [balance, setBalance] = useState(0);
  const router = useRouter();

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
         <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()} // Go back to the previous page
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Vouchers</Text>
      <Text style={{ marginBottom: 20 }}>Your Balance: {balance} Points</Text>

      <TouchableOpacity
  style={[styles.voucher, styles.voucherSmall]}
  onPress={() => handleRedeem(50, "25% off plant-based meal")}
>
  <Text style={styles.voucherText}>50 Points</Text>
  <Text style={styles.voucherSubText}>25% off plant-based meal</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.voucher, styles.voucherMedium]}
  onPress={() => handleRedeem(100, "50% off plant-based meal")}
>
  <Text style={styles.voucherText}>100 Points</Text>
  <Text style={styles.voucherSubText}>50% off plant-based meal</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.voucher, styles.voucherLarge]}
  onPress={() => handleRedeem(200, "Free dessert with meal")}
>
  <Text style={styles.voucherText}>200 Points</Text>
  <Text style={styles.voucherSubText}>Free dessert with meal</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.voucher, styles.voucherExtraLarge]}
  onPress={() => handleRedeem(500, "2 Free Smart Meals")}
>
  <Text style={styles.voucherText}>500 Points</Text>
  <Text style={styles.voucherSubText}>$5 off any meal</Text>
</TouchableOpacity>
</View>
  );
}
