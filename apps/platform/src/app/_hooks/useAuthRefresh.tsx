import { PlaventiSession } from "@plaventi/server/src/modules/auth/auth.controller";
import { useState } from "react";
import { environment } from "~/utils/env";

const auth = async (args: { shouldFetchUserInfo: boolean }) => {
  try {
    const url = environment.appUrl + "/auth-refresh";

    const data = JSON.stringify({
      shouldFetchUserInfo: args.shouldFetchUserInfo,
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

    const error = json.error as string | null;
    const token = json.token as string | null;
    const sessionData = json.sessionData as PlaventiSession | null;

    if (error) {
      throw new Error(error);
    }

    return { token, sessionData } as { token: string; sessionData: PlaventiSession };
  } catch (error) {
    console.error("Error authenticating", error);
    return {
      sessionData: null,
      token: null,
    };
  }
};

export function useAuthRefresh() {
  const [isLoading, setIsLoading] = useState(false);

  const authRefresh = async (args: { shouldFetchUserInfo: boolean }) => {
    setIsLoading(true);
    const res = await auth(args);
    setIsLoading(false);
    return res;
  };

  return { authRefresh, isLoading };
}
