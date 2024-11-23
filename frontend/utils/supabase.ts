import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xnfdhvtpulfyldqlyvel.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuZmRodnRwdWxmeWxkcWx5dmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzNjIwODAsImV4cCI6MjA0NzkzODA4MH0.sAIGWof7P58i2FZ-U9ORL1QHmPzr0O9BRknfHIEqBDU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
