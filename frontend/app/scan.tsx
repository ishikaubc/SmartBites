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
      // Assume barcode contains userId
      const fetchedUserId = data; // fetchuserinfo
      setUserId(fetchedUserId);

      Alert.alert("Barcode Scanned!", `User ID: ${fetchedUserId}`);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch user details.");
    }
  };

  const toggleCameraFacing = () => {
    setType((current) => (current === "back" ? "front" : "back"));
  };
 {/* enable the user to send the image and hit the backend calculate points */}
  const handleUploadReceipt = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setUploading(true);

        setTimeout(async () => {
          // Example backend request
          const pointsEarned = 5; // user earns 5 points per $5 purchase

          // Send API request to calculating the points from the image
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
          Alert.alert(
            "Success",
            `Receipt validated. ${pointsEarned} points added to user ${userId}'s wallet!`
          );

          setUploading(false);
        }, 1000);
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
