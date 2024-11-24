import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, Alert, Button } from "react-native";
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
  
      if (data && data.length > 0) {
        const user = data[0];
  
        // Save token, user ID, and role in AsyncStorage
        await AsyncStorage.setItem("authToken", "dummyAuthToken");
        await AsyncStorage.setItem("userId", user.id);
        await AsyncStorage.setItem("role", user.role); 
        Alert.alert("Login Successful!", `Welcome back, ${user.first_name}!`);
  
        // Redirect to the main page
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

      <Button
        onPress={handleLogin}
        title="Log In"
        color="#11960c"
        accessibilityLabel="Log in to access your account"
      />
    </View>
  );
}
