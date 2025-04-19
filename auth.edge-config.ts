import { NextResponse } from "next/server";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

export const edgeAuthConfig: NextAuthConfig = {
  providers: [],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    authorized({ request }) {
      //check for session car cookie
      if (!request.cookies.get("sessionCartId")) {
        // generate new session cart id cookie
        const sessionCartId = crypto.randomUUID();

        // clone request headers
        const newRequestHeaders = new Headers(request.headers);

        // create new response with new headers
        const response = NextResponse.next({
          request: { headers: newRequestHeaders },
        });

        // set new sessionCartId in the response cookies
        response.cookies.set("sessionCartId", sessionCartId);

        return response;
      } else {
        return true;
      }
    },
  },
};

export const { auth } = NextAuth(edgeAuthConfig);
