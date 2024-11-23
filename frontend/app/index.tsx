import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Use routing for navigation
import styles from "../styles/styledcomponents";

export default function Page() {
  const router = useRouter(); 

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/smartbites-2-removebg-preview.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.homeTitle}>Welcome to SmartBites</Text>

      {/* Subtitle */}
      <Text style={styles.homeSubtitle}>
        Your smart companion for meal tracking and rewards.
      </Text>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => router.push("/signup")} // wiill take to the sign up page
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
