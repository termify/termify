import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";


const supabase = createClient(process.env.SUPABASE_URL as string , process.env.PUBLIC_KEY as string );
const db = new PrismaClient();



export { supabase, db };