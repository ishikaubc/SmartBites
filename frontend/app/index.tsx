import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
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

      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
