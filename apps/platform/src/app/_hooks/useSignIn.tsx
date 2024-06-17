import { useState } from "react";
import { environment } from "~/utils/env";

const auth = async (args: { email: string; password: string }) => {
  try {
    const url = environment.appUrl + "/auth";

    console.log({ url });

    const data = JSON.stringify({
      email: args.email,
      password: args.password,
    });

    const result = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await result?.json();

    if (!json) {
      throw new Error("Error authenticating");
    }

    const token = json.token as string | null;

    return { token };
  } catch (error) {
    console.error("Error authenticating", error);
    return {
      token: null,
    };
  }
};

export function useSignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const authRefresh = async (args: { email: string; password: string }) => {
    setIsLoading(true);
    const { token } = await auth(args);
    setIsLoading(false);
    return { token };
  };

  return { authRefresh, isLoading };
}
