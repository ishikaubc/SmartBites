import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera"; // Optional if you plan to use camera permissions later
import styles from "../styles/styledcomponents";

const API_URL = "http://your-api-url/receipt_calc";

export default function ScanReceiptPage() {
  const [hasPermission, setHasPermission] = useState(null); // Camera and gallery permissions
  const [uploading, setUploading] = useState(false); // Upload state
  const [scannedImage, setScannedImage] = useState(null); // Stores selected image

  // Request permissions for camera and gallery on component mount
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: galleryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(cameraStatus === "granted" && galleryStatus === "granted");
    })();
  }, []);

  // Handle uploading the receipt image
  const handleUploadReceipt = async (imageUri) => {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: "receipt.jpg",
      type: "image/jpeg",
    });

    try {
      setUploading(true); // Start uploading indicator
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      Alert.alert(
        "Success",
        `Receipt validated. You earned ${data.Points} points!`
      );
    } catch (error) {
      Alert.alert("Error", "Failed to process receipt. Please try again.");
    } finally {
      setUploading(false); // Stop uploading indicator
    }
  };

  // Capture receipt using the camera
  const handleCaptureReceipt = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setScannedImage(result.assets[0].uri); // Store image URI
        handleUploadReceipt(result.assets[0].uri); // Upload the image
      }
    } catch (error) {
      Alert.alert("Error", "Failed to capture receipt. Please try again.");
    }
  };

  // Pick receipt from the gallery
  const handlePickReceipt = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setScannedImage(result.assets[0].uri); // Store image URI
        handleUploadReceipt(result.assets[0].uri); // Upload the image
      }
    } catch (error) {
      Alert.alert("Error", "Failed to select receipt. Please try again.");
    }
  };

  // Handle permissions not granted
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera and gallery permissions...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>
          Permission denied. Please allow camera and gallery access in settings.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Receipt</Text>

      {uploading && <ActivityIndicator size="large" color="#0000ff" />}

      <TouchableOpacity style={styles.button} onPress={handleCaptureReceipt}>
        <Text style={styles.buttonText}>Capture Receipt</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePickReceipt}>
        <Text style={styles.buttonText}>Pick Receipt from Gallery</Text>
      </TouchableOpacity>

      {scannedImage && (
        <Text style={styles.text}>Receipt image processed successfully.</Text>
      )}
    </View>
  );
}