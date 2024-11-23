import { supabase } from "../utils/supabase";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import { v4 as uuidv4 } from "uuid";
import { pathArg } from "./../node_modules/supabase/node_modules/mkdirp/dist/mjs/path-arg";

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
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .match({ email: email, password: hashSync(password, salt) });

  if (error) {
    console.log(error);
  }

  return data;
}
