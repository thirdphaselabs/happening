import { environment } from "~/utils/env";
import { isString } from "~/utils/helpers";

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();

    console.log("requestBody", requestBody);

    const email = requestBody.email;
    const password = requestBody.password;

    if (!email || !password || !isString(email) || !isString(password)) {
      return Response.json({ token: null });
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
      return Response.json({
        token: null,
      });
    }

    const res = Response.json({ token }, { status: 200 });

    res.headers.set("Set-Cookie", `wos-session=${token}; Path=/`);

    return res;
  } catch (error) {
    console.error("Error authenticating", error);
    return Response.json({ token: null });
  }
}
