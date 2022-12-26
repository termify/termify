/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	env: {
		APP_NAME: "Termify",
		SUPABASE_URL: "https://ppnrkwqypmrhtxlxgxla.supabase.co",
		SUPABASE_JWT_TOKEN: "aQYiJ1nlbdt+ALwQvQMSADHrKeCL0SthlKPYFyEn4yVsFojMC5HQDi6g+tge+dyKDOgRLhAug5529K8GS1e1Ew==",
		PUBLIC_KEY:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbnJrd3F5cG1yaHR4bHhneGxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc4MjA5MjcsImV4cCI6MTk4MzM5NjkyN30.UVNjRlgEklDfRcnQuIR9yyCzkwx74IPhYHyBLwX0Few",
		ANON_KEY:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbnJrd3F5cG1yaHR4bHhneGxhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NzgyMDkyNywiZXhwIjoxOTgzMzk2OTI3fQ.UwIKsyxvSLqRfoxwObB-TPBCzwsbXt6POm4UxA68XoQ",
		},
	async headers() {
		return [
			{
				source: "/api/fetchpartner",
				headers: [
					{
						key: "access-control-allow-origin",
						value: "*",
					},
				],
			},
			{
				source: "/booking",
				headers: [
					{
						key: "access-control-allow-origin",
						value: "*",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
