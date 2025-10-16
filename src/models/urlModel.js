import { supabase } from "../utils/supabaseClient.js";
import shortid from "shortid";

export const urlModel = {
  async create(originalUrl, userId = null) {
    const shortUrl = shortid.generate();
    const { data, error } = await supabase
      .from("urls")
      .insert([{ original_url: originalUrl, short_url: shortUrl, user_id: userId }])
      .select();

    if (error) throw error;
    return { data: data[0] }; // Retorna um objeto com a chave 'data'
  },

  async findByShortUrl(shortUrl) { // Nome do método corrigido
    const { data, error } = await supabase
      .from("urls")
      .select("*")
      .eq("short_url", shortUrl)
      .single();

    if (error) return { data: null, error };
    return { data };
  },

  async findAll() {
    const { data, error } = await supabase.from("urls").select("*");
    if (error) return { data: null, error };
    return { data };
  }
};