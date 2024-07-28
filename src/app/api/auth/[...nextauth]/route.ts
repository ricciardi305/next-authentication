import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const handler = NextAuth({
    pages: {
        signIn: '/',
    },
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            if (!credentials) {
                return null
            }

            if (credentials.email === "admin@example.com" && credentials.password === "password") {
                return {
                    id: '1',
                    name: "Admin",
                    email: "admin@example.com"
                }
            }

            return null
          }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        })
      ]
})

export { handler as GET, handler as POST };

