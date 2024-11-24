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

  logo: {
    width: 400, // Adjusted size to make it fit better
    height: 250, // Reduced height for balanced spacing
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    color: "#333",
  },
  homeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  homeSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "green", // Green button color
    borderRadius: 8,
    alignItems: "center",
    margin: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
  top: 20, // Adjust to move vertically
  right: 20, // Align to the right
  padding: 10,
  backgroundColor: "#f0f0f0",
  borderRadius: 5,
  elevation: 3, 
  shadowColor: "#000", 
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  },
  backButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Specific styles for Login/Signup buttons
  loginButton: {
    backgroundColor: "green",
  },
  signupButton: {
    backgroundColor: "green",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  activityIndicator: {
    marginTop: 20,
  },
  qrContainer: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  roleContainer: {
    marginVertical: 20,
    width: "100%",
    alignItems: "center",
  },
  roleOption: {
    width: "90%",
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
  },
  selectedRole: {
    backgroundColor: "green",
    borderColor: "green",
  },
  unselectedRole: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
  },
  roleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedText: {
    color: "#fff",
  },
  unselectedText: {
    color: "#333",
  },
  featureButton: {
    width: "90%",
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff", // White background
    borderColor: "#11960c", // Green border
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Adds shadow on Android
  },
  
  featureButtonText: {
    color: "#11960c",
    fontSize: 18, // Slightly larger text for emphasis
    fontWeight: "bold",
  },
  voucher: {
    width: "100%",
    marginBottom: 15,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8f5e9", // Light green background
    borderWidth: 2,
    borderColor: "#4CAF50", // Dark green border
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  voucherSmall: {
    borderLeftWidth: 5,
    borderColor: "#81C784", // Slightly lighter green for 50 points
  },
  voucherMedium: {
    borderLeftWidth: 5,
    borderColor: "#66BB6A", // Medium green for 100 points
  },
  voucherLarge: {
    borderLeftWidth: 5,
    borderColor: "#4CAF50", // Dark green for 200 points
  },
  voucherExtraLarge: {
    borderLeftWidth: 5,
    borderColor: "#388E3C", // Darkest green for 500 points
  },
  voucherText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#388E3C", // Dark green for main text
  },
  voucherSubText: {
    fontSize: 14,
    color: "#4CAF50", // Secondary text color
    textAlign: "center",
    marginTop: 5,
  },
  
});

export default styles;
