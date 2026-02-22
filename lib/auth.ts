import { NextResponse } from "next/server";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                const { email, password } = credentials;
                const client = await sql.connect();

                try {
                    const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);
                    const user = result.rows[0];

                    if (user && (await bcrypt.compare(password, user.password))) {
                        return { id: String(user.id), name: user.name, email: user.email };
                    }

                    return null;
                } catch (error) {
                    console.error("Error fetching user:", error);
                    return null;
                } finally {
                    client.release();
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        newUser: "/admin",
    },
};

export async function requireAdminSession() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return null;
}
