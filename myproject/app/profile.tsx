import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import styles from "../styles/styledcomponents";

export default function ProfileScreen() {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  //hook the fetch profile endpoint whenever ready
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simulate an API call
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              firstName: "Jane",
              lastName: "Doe",
              email: "janedoe@example.com",
              profileImage: "https://via.placeholder.com/150", // sample image
            });
          }, 1000)
        );

        setUser(response);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch user data.");
      } finally {
        setLoading(false); 
      }
    };

    fetchUserData();
  }, []);

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
