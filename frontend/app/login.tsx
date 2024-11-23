import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; 
import styles from "../styles/styledcomponents";

export default function LoginScreen() {
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      // we will replace the actual backend logic here to validate the user credentials and get the user token
      const response = await new Promise((resolve, reject) =>
        setTimeout(() => {
          if (email === "test@example.com" && password === "password") {
            resolve({ token: "12345", userId: "user123" }); // Mock token and user ID
          } else {
            reject("Invalid credentials");
          }
        }, 1000)
      );

      // Simulated response
      const { token, userId } = response as { token: string; userId: string };

      // store token and user id during login
      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("userId", userId);

      Alert.alert("Login Successful!", `Welcome back, ${email}!`);

      // user will be directed to the main page on successful login
      router.push("/main");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}
