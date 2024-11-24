import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import styles from "../styles/styledcomponents";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const [user, setUser] = useState({firstName: "", lastName:"", email: "", profileImage: ""});
  const [edit, setEdit] = useState(false); 
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  //hook the fetch profile endpoint whenever ready
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // add the fetch user id logic here from the backemd
        const storedFirstName = await AsyncStorage.getItem("firstName");
        const storedLastName = await AsyncStorage.getItem("lastName");
        const storedEmail = await AsyncStorage.getItem("email")

        setUser({
          firstName: storedFirstName,
          lastName: storedLastName,
          email: storedEmail,
          profileImage: "https://via.placeholder.com/150"
        })
        // Simulate an API call
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              profileImage: "https://via.placeholder.com/150", // sample image
            });
          }, 1000)
        );
      } catch (error) {
        Alert.alert("Error", "Failed to fetch user data.");
      } finally {
        setLoading(false); 
      }
    };

    fetchUserData();
  }, []);
 //use edit profile endpoint here if available
  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Edit profile functionality coming soon!");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No user data found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
       {/* Back Button */}
       <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()} // Go back to the previous page
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <Image
        source={{ uri: user.profileImage }}
        style={dynamicStyles.profileImage}
      />
      <Text style={styles.title}>{`${user.firstName} ${user.lastName}`}</Text>
      <Text style={{ marginBottom: 20, color: "#555" }}>{user.email}</Text>

      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const dynamicStyles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});
