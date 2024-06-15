import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                const { email, password } = credentials;

                const client = await sql.connect();

                try {
                    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
                    const user = result.rows[0];

                    if (user && await bcrypt.compare(password, user.password)) {
                        return { id: user.id, name: user.name, email: user.email };
                    } else {
                        return null;
                    }
                } catch (err) {
                    console.error('Error fetching user:', err);
                    return null;
                } finally {
                    client.release();
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT, user?: User }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin',  // Asegúrate de que esto apunte a la nueva página de inicio de sesión personalizada
        signOut: '/auth/signout',
        newUser: '/admin' // Redirect here after registration
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
