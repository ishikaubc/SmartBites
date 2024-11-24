import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const API_URL = "http://your-api-url/receipt_calc"; // Replace with your backend API

export default function ScanReceiptPage() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null); // Camera permission state
    const [cameraRef, setCameraRef] = useState(null); // Camera reference
    const [uploading, setUploading] = useState(false); // Upload state
    const [cameraOn, setCameraOn] = useState(false); // Camera toggle state
  
    // Request camera permissions when the component mounts
    useEffect(() => {
      (async () => {
        const { status: cameraStatus } =
          await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus === "granted");
      })();
    }, []);
  
    // Function to handle receipt capture and upload
    const handleCaptureReceipt = async () => {
      if (!cameraRef) {
        Alert.alert("Error", "Camera not available.");
        return;
      }
  
      try {
        const photo = await cameraRef.takePictureAsync({
          quality: 1, // High-quality image
          base64: false, // Avoid base64 for larger images
        });
  
        if (photo && photo.uri) {
          setCameraOn(false); // Turn off the camera view
          await handleUploadReceipt(photo.uri); // Upload the captured image
        }
      } catch (error) {
        console.error("Error capturing receipt:", error);
        Alert.alert("Error", "Failed to capture receipt. Please try again.");
      }
    };
  
    // Function to upload the receipt image
    const handleUploadReceipt = async (imageUri) => {
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri, // Image URI
        name: "receipt.jpg", // File name (can be dynamic)
        type: "image/jpeg", // MIME type
      });
  
      try {
        setUploading(true); // Start uploading indicator
  
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData, // FormData payload
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        const data = await response.json(); // Parse the backend response
  
        // Display success message with points
        if (data.Total_Points) {
          Alert.alert("Success", `You earned ${data.Total_Points} points!`);
        } else {
          Alert.alert(
            "Success",
            "Receipt processed successfully, but no points awarded."
          );
        }
      } catch (error) {
        console.error("Error uploading receipt:", error);
        Alert.alert("Error", "Failed to process receipt. Please try again.");
      } finally {
        setUploading(false); // Stop uploading indicator
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Receipt</Text>

      {uploading && <ActivityIndicator size="large" color="#0000ff" />}

      {cameraOn ? (
        <CameraView
          style={styles.camera}
          ref={(ref) => setCameraRef(ref)} // Set camera reference
        >
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleCaptureReceipt}
            >
              <Text style={styles.buttonText}>Capture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setCameraOn(false)} // Turn off the camera
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCameraOn(true)} // Turn on the camera
          >
            <Text style={styles.buttonText}>Turn On Camera</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  cameraControls: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  captureButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
