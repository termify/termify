import { createClient } from "@supabase/supabase-js";

const db = createClient(process.env.SUPABASE_URL as string , process.env.PUBLIC_KEY as string );

export { db };