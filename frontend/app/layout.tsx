import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="main" options={{ title: "Main Page" }} />
      <Stack.Screen name="wallet" options={{ title: "Wallet" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="qr" options={{ title: "QR Code" }} />
    </Stack>
  );
}