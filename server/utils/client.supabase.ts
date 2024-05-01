import dotenv from 'dotenv';
import {createClient} from "@supabase/supabase-js";

// ONLY FOR LOCAL DEVELOPMENT
dotenv.config({
    path: ".env.local"
});

// PRODUCTION ENV
// dotenv.config({
//     path: ".env.local.production"
// });

const dbURL = process.env.SUPABASE_URL;
const annonKEY = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(dbURL!, annonKEY!);

export default supabase;