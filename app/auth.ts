import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import Google from "next-auth/providers/google"
import client from "./lib/db"
import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client, {
    databaseName: "NewData",
    collections: {
      Users: "userslist",
      Accounts: "Accounts", 
      Sessions: "sessions",
      VerificationTokens: "verificationTokens"
    }
  }),
  providers: [Google, GitHub],
  session: {
    maxAge: 7*24*60*60,
  }
})