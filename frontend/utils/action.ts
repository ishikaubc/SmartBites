import { supabase } from "../utils/supabase";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
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
  });

  if (error) {
    console.log(error);
  }
}

export async function login(email: string, password: string) {
  const hashedPassword = hashSync(password, salt);
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email.trim());

  if (data) {
    AsyncStorage.setItem("id", data[0].id);
    AsyncStorage.setItem("authToken", uuidv4());
    AsyncStorage.setItem("email", data[0].email);
    AsyncStorage.setItem("firstName", data[0].first_name);
    AsyncStorage.setItem("lastName", data[0].last_name);
    AsyncStorage.setItem("walletId", data[0].wallet_id);
    AsyncStorage.setItem("orderHistoryId", data[0].order_history_id);
    AsyncStorage.setItem("qrCode", data[0].qr_code);
  } else {
    console.log("No user found !");
  }

  if (error) {
    console.log(error);
  }

  return data;
}
