import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { environment } from "~/utils/env";

export async function POST() {
  try {
    cookies().delete({
      name: "wos-session",
      path: "/",
      sameSite: "lax",
      domain: `.${environment.domain}`,
      secure: true,
    });

    await fetch(`${environment.apiUrl}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    return NextResponse.json(
      {
        message: "Logged out",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error logging out", error);
    return NextResponse.json(
      {
        error: "An error occurred",
      },
      {
        status: 500,
      },
    );
  }
}
