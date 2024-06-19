import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { environment } from "~/utils/env";
import { isString } from "~/utils/helpers";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextApiResponse) {
  try {
    const requestBody = await request.json();

    console.log("requestBody", requestBody);

    const email = requestBody.email;
    const password = requestBody.password;

    if (!email || !password || !isString(email) || !isString(password)) {
      return NextResponse.json(
        {
          error: "Missing email or password",
        },
        {
          status: 400,
        },
      );
    }

    const result = await fetch(`${environment.apiUrl}/api/trpc/auth.signIn`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        json: {
          email,
          password,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("result", result);

    const body = await result.json();

    const token = body.result?.data?.json?.token;

    if (!token) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json(
      {
        token,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `wos-session=${token}; Path=/; SameSite=Lax; Domain=.plaventi.local; Secure;`,
        },
      },
    );
  } catch (error) {
    console.error("Error authenticating", error);
    return NextResponse.json(
      {
        error: "Error authenticating",
      },
      {
        status: 500,
      },
    );
  }
}
