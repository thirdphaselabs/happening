"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import { Flex, Box, Separator } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { OnboardingStatus } from "~/trpc/types";

const stepPaths: Record<OnboardingStatus, string> = {
  PROFILE: "/onboarding/profile",
  ORGANISATION: "/onboarding/company",
  INVITE: "/onboarding/invite",
  COMPLETE: "/onboarding/create",
  COMPLETED: "/onboarding/completed",
};

function Switch({ currentIndex, index }: { currentIndex: number; index: number }) {
  if (currentIndex > index) return <Completed />;

  return currentIndex === index ? <Active /> : <Upcoming />;
}

function Active() {
  return (
    <Flex
      className="z-10 flex h-4 w-4 items-center justify-center rounded-full"
      style={{
        backgroundColor: "var(--sky-9)",
      }}></Flex>
  );
}

function Upcoming() {
  return (
    <Box
      className="border-1  z-10 flex h-4 w-4 items-center justify-center rounded-full border"
      style={{
        borderColor: "var(--gray-a6)",
      }}
    />
  );
}

function Completed() {
  return (
    <Flex
      className="z-10 flex h-4 w-4 items-center justify-center rounded-full"
      style={{
        backgroundColor: "var(--accent-a12)",
      }}>
      <CheckIcon color="white" height="16" width="16" />
    </Flex>
  );
}

export function Stepper() {
  const pathName = usePathname();

  const currentStep = Object.keys(stepPaths).find((step) => stepPaths[step as OnboardingStatus] === pathName);

  return (
    <Flex width="100%" justify="center" align="center">
      {Object.entries(stepPaths).map(([step, path], index) => {
        const isLast = index === Object.keys(stepPaths).length - 1;
        return (
          <>
            <Switch
              key={step}
              currentIndex={currentStep ? Object.keys(stepPaths).indexOf(currentStep) : 0}
              index={index}
            />
            {!isLast && <Separator orientation="horizontal" className="w-[32px]" />}
          </>
        );
      })}
    </Flex>
  );
}
