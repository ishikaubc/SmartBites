import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, Alert, Button, TouchableOpacity } from "react-native";
import styles from "../styles/styledcomponents";
import { login } from "../utils/action";

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

    if (error.length == 0) {
      login(email, password);
      router.push("/main");
    }

    try {
      // Call Supabase login function
      const data = await login(email, password);
      console.log(data);
      if (data && data.length > 0) {
        console.log(data);
        router.push("/main");
      } else {
        throw new Error("Invalid email or password.");
      }
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

     <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}