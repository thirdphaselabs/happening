import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { environment } from "~/utils/env";
import { isString } from "~/utils/helpers";

export async function POST(request: NextRequest, response: NextApiResponse) {
  try {
    const requestBody = await request.json();

    console.log("requestBody", requestBody);

    const email = requestBody.email;
    const password = requestBody.password;

    if (!email || !password || !isString(email) || !isString(password)) {
      return response.status(400).json({
        error: "Invalid request body",
      });
    }

    const result = await fetch(`${environment.apiUrl}/api/trpc/auth.signIn`, {
      method: "POST",
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
      return response.status(401).json({
        error: "Invalid credentials",
      });
    }

    return new Response(JSON.stringify({ error: null, token }), {
      status: 200,
      headers: {
        "Set-Cookie": `wos-session=${token}; Path=/`,
      },
    });
  } catch (error) {
    console.error("Error authenticating", error);
    return response.status(500).json({
      error: "Error authenticating",
    });
  }
}
