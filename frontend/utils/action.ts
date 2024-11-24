import { supabase } from "../utils/supabase";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

const salt = genSaltSync(10);

export async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  const { error } = await supabase.from("users").insert({
    first_name: firstName,
    last_name: lastName,
    email: email,
    wallet_id: hashSync(password, salt).substring(0, 10),
    qr_code: uuidv4(),
    order_history_id: hashSync(password, salt).substring(0, 15),
    password: hashSync(password, salt),
    role: "student",
  });

  const { data, error: selectError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  if (data) {
    createWallet(data[0].wallet_id, data[0].id);
  } else {
    console.log("Error creating wallet");
  }

  if (selectError) {
    console.log(selectError);
  }

  if (error) {
    console.log(error);
  }
}

export async function login(email: string, password: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email.trim());

    if (error) {
      console.error("Supabase Error:", error.message);
      throw new Error("Failed to fetch user data.");
    }

    if (data && data.length > 0) {
      const user = data[0];
      const isPasswordValid = compareSync(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid credentials or no user found!");
      }

      
      try {
        // Store user information in AsyncStorage
        AsyncStorage.multiSet([
          ["id", user.id], // Convert numeric ID to string
          ["authToken", uuidv4()], // Use uuidv4() for authToken
          ["email", user.email],
          ["firstName", user.first_name],
          ["lastName", user.last_name],
          ["walletId", user.wallet_id],
          ["orderHistoryId", user.order_history_id],
          ["qrCode", user.qr_code],
          ["role", user.role],
        ]);

        // Return user data
        return user;
      } catch (storageError) {
        console.error("AsyncStorage Error:", storageError);
        throw new Error("Failed to save user data locally.");
      }
    } else {
      throw new Error("Invalid credentials or no user found!");
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
}
export async function createWallet(walletId, userId) {
  const { error } = await supabase.from("wallet").insert({
    id: walletId,
    user_id: userId,
    total_points: 0,
  });

  if (error) {
    console.log(error);
  }
}

export async function fetchWalletData(id) {
  const { data, error } = await supabase
    .from("wallet")
    .select("*")
    .eq("user_id", id);

  if (error) {
    console.log(error);
  }

  return data;
}

export async function fetchUserInfo(id) {
  const { data, error } = await supabase
    .from("wallet")
    .select("*")
    .eq("user_id", id);

  if (error) {
    console.log(data);
  }

  return data;
}

export async function fetchUserFromQR(qrCode) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("qr_code", qrCode);

  if (error) {
    console.log(data);
  }

  return data;
}
