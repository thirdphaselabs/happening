"use client";

import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Box, Skeleton } from "@radix-ui/themes";
import { environment } from "~/utils/env";

export function MapProvider({ children }: { children: React.ReactNode }) {
  const render = (status: Status) => {
    if (status === Status.LOADING) {
      return (
        <Skeleton loading={true}>
          <Box height="175px" width="588px" />
        </Skeleton>
      );
    }
    return <></>;
  };
  return (
    <Wrapper apiKey={environment.googlePlacesApiKey} render={render}>
      {children}
    </Wrapper>
  );
}
