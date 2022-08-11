declare global{
    namespace NodeJS {
        interface ProcessEnv{
            SUPABASE_URL: string;
            SUPABASE_JWT_TOKEN: string;
            PUBLIC_KEY: string;
            ANON_KEY: string;
        }
    }
}