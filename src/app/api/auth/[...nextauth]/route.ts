import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Import the options from a separate file

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };