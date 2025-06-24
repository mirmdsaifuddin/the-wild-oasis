import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jyunrinnclxhblkfkcuu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5dW5yaW5uY2x4aGJsa2ZrY3V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NjM2MjgsImV4cCI6MjA2NTEzOTYyOH0.62obtOqjiyxwhIJeJl-jNDR29uwb5IcbK1fE9e-6PQU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
