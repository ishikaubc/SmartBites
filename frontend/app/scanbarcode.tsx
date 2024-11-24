import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Camera, CameraView, CameraType } from "expo-camera"; // Barcode Scanner
import * as ImagePicker from "expo-image-picker"; // For receipt upload
import styles from "../styles/styledcomponents";
import { fetchUserInfo } from "../utils/action";

export default function ScanBarcodePage() {
  const [hasPermission, setHasPermission] = useState(null); // to store the camera permission state
  const [hasImagePickerPermission, setHasImagePickerPermission] =
    useState(null); // Image Picker permission state
  const [scanned, setScanned] = useState(false); // Barcode scanned state
  const [userId, setUserId] = useState(""); // to fetch user information state
  const [uploading, setUploading] = useState(false);
  const [type, setType] = useState<CameraType>("back");

  // Request camera and image picker permission
  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true); 
  
    try {
      //barcode contains userId
      const fetchedUserId = data;
  
      // Fetch user info from Supabase
      const userInfo = await fetchUserInfo(fetchedUserId);
  
      if (userInfo && userInfo.length > 0) {
        const user = userInfo[0]; 
        setUserId(fetchedUserId);
  
        // Display user details
        Alert.alert(
          "Barcode Scanned!",
          `User ID: ${fetchedUserId}\nWallet Points: ${user.points || 0}`
        );
      } else {
        Alert.alert(
          "User Not Found",
          `No user found in the wallet with ID: ${fetchedUserId}`
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch user details.");
    }
  };

  const toggleCameraFacing = () => {
    setType((current) => (current === "back" ? "front" : "back"));
  };

  
{/*to send the image to backend to calculate points */}
  const API_URL = "http://your-api-url/receipt_calc";

  const handleUploadReceipt = async () => {
    try {
      // Open image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setUploading(true); 
  
        const imageUri = result.assets[0].uri; // Get the selected image URI
  
        
        const formData = new FormData();
        formData.append("file", {
          uri: imageUri,
          name: "receipt.jpg", 
          type: "image/jpeg",  
        });
  
        try {
          // Send image to backend
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
  
          const data = await response.json(); // Get the points from the response
          const pointsEarned = data.Points;
  
          // Display success alert
          Alert.alert(
            "Success",
            `Receipt validated. ${pointsEarned} points added to user ${userId}'s wallet!`
          );
        } catch (error) {
          Alert.alert("Error", "Failed to process receipt. Please try again.");
        } finally {
          setUploading(false); // Reset uploading state
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to upload receipt. Please try again.");
    }
  };
 

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Requesting for camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Camera permission denied. Please enable it in your settings.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Barcode</Text>

      {!scanned && (
        <>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ width: "100%", height: 300 }}
          />
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </>
      )}

      {scanned && (
        <>
          <Text style={{ marginTop: 20, fontSize: 16 }}>
            User ID: {userId || "No User Scanned"}
          </Text>
          <TouchableOpacity
            style={styles.featureButton}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.featureButtonText}>Scan Again</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.featureButton}
        onPress={handleUploadReceipt}
        disabled={uploading || !userId}
      >
        <Text style={styles.featureButtonText}>
          {uploading ? "Uploading Receipt..." : "Upload Receipt"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}