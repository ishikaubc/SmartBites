import { supabase } from "../utils/supabase";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import { v4 as uuidv4 } from "uuid";

const salt = genSaltSync(10);

export async function GET(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .match({ email: body.email, password: hashSync(body.password, salt) });

  if (error) {
    console.log(error);
  }

  return Response.json({ res: "User logged in!" });
}
