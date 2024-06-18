import { NextApiRequest, NextApiResponse } from "next";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";
import { environment } from "~/utils/env";
import { isString } from "~/utils/helpers";
import { NextResponse } from "next/server";
import { getSession } from "../actions";

export async function POST(request: NextRequest, response: NextApiResponse) {
  try {
    const requestBody = await request.json();

    console.log("requestBody", requestBody);

    const shouldFetchUserInfo = requestBody.shouldFetchUserInfo;

    if (shouldFetchUserInfo === undefined || shouldFetchUserInfo === null) {
      return NextResponse.json(
        {
          error: "Missing email or password",
        },
        {
          status: 400,
        },
      );
    }
    const cookiesList = cookies();
    const tokenValue = cookiesList.get("wos-session")?.value;

    if (!tokenValue) {
      return NextResponse.json(
        {
          error: "No token provided",
        },
        {
          status: 401,
        },
      );
    }

    const result = await fetch(`${environment.apiUrl}/api/trpc/auth.refresh`, {
      method: "POST",
      body: JSON.stringify({
        json: {
          shouldFetchUserInfo: shouldFetchUserInfo === "true" || shouldFetchUserInfo === true ? true : false,
        },
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenValue,
      },
    });

    const body = await result.json();

    console.log("biody", body);

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
          "Set-Cookie": `wos-session=${token}; Path=/; SameSite=None; Secure`,
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
