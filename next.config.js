/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    "APP_NAME":"Termify",
    "SUPABASE_URL" : "https://snvyhwvjeriizdhzkgud.supabase.co",
    "SUPABASE_JWT_TOKEN":"cRWBL6R5n3Ol77H61USFpPmF7z//Lrz2/ndzNROANk17qPlvrt0kIB538ddr3wcI7U1wyRgAzPAfkuPwj9Kd7w==",
    "PUBLIC_KEY":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudnlod3ZqZXJpaXpkaHprZ3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk0NDc4MTAsImV4cCI6MTk3NTAyMzgxMH0.WarRgkmeIzPc6ZFqp5-Pv8IiKCsZ-EODWwSZwp24YVA",
    "ANON_KEY":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudnlod3ZqZXJpaXpkaHprZ3VkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1OTQ0NzgxMCwiZXhwIjoxOTc1MDIzODEwfQ.FW-ARW9_MAUgxo4Q1d7kIKNHhEFjNJS5X_ccw2wTWCo"
  }
}

module.exports = nextConfig
