import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { randomBytes, randomUUID } from "crypto";
import { db } from "../../../lib/database";
import crypto from "crypto";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
	// Here comes all Providers
	providers: [
		GithubProvider({
			clientId: "",
			clientSecret: "",
		}),
		CredentialsProvider({
			name: "Credentials Provider",
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials as { email: string; password: string };
				const cryptedPW = await bcrypt.hash(password, 5);

				const userExist = await db.user.findFirst({
					where: {
						email: email,
					},
				});

				if (!userExist) {
					const newUser = await db.user.create({
						data: {
							uuid: crypto.randomUUID(),
							email,
							password: cryptedPW,
						},
					});
					return { id: newUser?.uuid!, email: newUser?.email };
				}

				if (!(await bcrypt.compare(password, userExist.password!))) {
					throw new Error("Email oder Passwort falsch");
				}

				return { id: userExist?.uuid!, email: userExist?.email };
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
		generateSessionToken: () => {
			return randomUUID?.() ?? randomBytes(32).toString("hex");
		},
	},
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.sub = user.id;
			}

			return token;
		},
		session: async ({ session, token }) => {
			if (session?.user) {
				// @ts-ignore
				session.user.id = token.sub;
			}

			return session;
		},
	},
	pages: {
		signIn: "/login",
		signOut: "/auth/signout",
		newUser: "/auth/new-user",
	},
};

export default NextAuth(authOptions);
