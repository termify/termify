import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL as string , process.env.PUBLIC_KEY as string );

export default supabase;