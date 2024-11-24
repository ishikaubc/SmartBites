import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import styles from "../styles/styledcomponents";

export default function UploadScanFileScreen() {
  const [file, setFile] = useState<DocumentPicker.DocumentPickerSuccessResult | null>(null); 
  const [loading, setLoading] = useState(false); 

  // Function to pick a file
  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/jpeg", "image/png", "image/jpg"], 
        copyToCacheDirectory: true,
      });

      // Check if the user canceled the file picker
      if (result.type === "success") {
        // Handle success result
        setFile(result);
        Alert.alert("File Selected", `File: ${result.name}`);
      } else {
        Alert.alert("Cancelled", "No file was selected.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to pick a file. Please try again.");
    }
  };

  // Function to upload the file
  const handleUploadFile = async () => {
    if (!file) {
      Alert.alert("No File Selected", "Please select a file to upload.");
      return;
    }

    setLoading(true); 
    try {
      // Simulate an API call to upload the file
      setTimeout(() => {
        setLoading(false);
        Alert.alert("Success", "File uploaded successfully!");
        setFile(null); 
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert("Error", "Failed to upload the file. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Scan File</Text>

      {/* File Info */}
      {file ? (
        <Text style={styles.subtitle}>
          Selected File: <Text style={{ fontWeight: "bold" }}>{file.name}</Text>
        </Text>
      ) : (
        <Text style={styles.subtitle}>No file selected.</Text>
      )}

      {/* Pick File Button */}
      <TouchableOpacity
        style={[styles.button, styles.uploadButton]}
        onPress={handlePickFile}
      >
        <Text style={styles.buttonText}>Pick a File</Text>
      </TouchableOpacity>

      {/* Upload File Button */}
      <TouchableOpacity
        style={[styles.button, styles.qrButton]}
        onPress={handleUploadFile}
        disabled={loading} // Disable button while uploading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Upload File</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
