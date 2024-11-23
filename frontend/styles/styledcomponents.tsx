import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    color: "#333", // Visible text color
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "green", // Green button color
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  // Specific styles for Login/Signup buttons
  loginButton: {
    backgroundColor: "green",
  },
  signupButton: {
    backgroundColor: "green",
  },
  // Specific styles for Main Page buttons
  walletButton: {
    backgroundColor: "#4CAF50", // Green button for Wallet
  },
  profileButton: {
    backgroundColor: "#2196F3", // Blue button for Profile
  },
  qrButton: {
    backgroundColor: "#FF9800", // Orange button for QR Code
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  activityIndicator: {
    marginTop: 20,
  },
});

export default styles;
