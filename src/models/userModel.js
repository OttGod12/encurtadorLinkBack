import { supabase } from "../utils/supabaseClient.js";

export const userModel = {
  async create(email, password) {
    const { data, error } = await supabase.from("users").insert([{ email, password }]);
    return { data, error };
  },

  async findAll() {
    const { data, error } = await supabase.from("users").select("*");
    return { data, error };
  },
};