import { supabase } from "../utils/supabase";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import { v4 as uuidv4 } from "uuid";

const salt = genSaltSync(10);
export async function POST(request: Request) {
  const body = await request.json();

  const { error } = await supabase.from("users").insert({
    first_name: body.firstName,
    last_name: body.lastName,
    email: body.email,
    wallet_id: hashSync(body.password, salt).substring(0, 10),
    qr_code: uuidv4(),
    order_history_id: hashSync(body.password, salt).substring(0, 15),
    password: hashSync(body.password, salt),
  });

  if (error) {
    console.log(error);
  }

  return Response.json({ res: "User registered !" });
}
