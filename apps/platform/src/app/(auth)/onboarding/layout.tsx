"use client";

import { useUser } from "@clerk/nextjs";
import { CheckIcon } from "@radix-ui/react-icons";
import { Box, Flex, Separator } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export enum OnboardingStep {
  Profile = "Profile",
  Company = "CreateCompany",
  Invite = "InviteTeam",
}

const stepPaths: Record<OnboardingStep, string> = {
  [OnboardingStep.Profile]: "/onboarding/profile",
  [OnboardingStep.Company]: "/onboarding/company",
  [OnboardingStep.Invite]: "/onboarding/invite",
};

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();
  const pathName = usePathname();

  const currentStep = Object.values(OnboardingStep).find((step) => stepPaths[step] === pathName);

  return (
    <Flex gap="6" direction="column">
      {children}
      <Flex width="100%" justify="center" align="center">
        {Object.values(OnboardingStep).map((step, index) => {
          const isLast = index === Object.values(OnboardingStep).length - 1;
          return (
            <>
              <Switch
                key={step}
                currentIndex={currentStep ? Object.values(OnboardingStep).indexOf(currentStep) : 0}
                index={index}
              />
              {!isLast && <Separator orientation="horizontal" className="w-[32px]" />}
            </>
          );
        })}
        {/* <Completed />
        <Separator orientation="horizontal" className="w-[32px]" />
        <Active />
        <Separator orientation="horizontal" className="w-[32px]" />
        <Upcoming /> */}
      </Flex>
    </Flex>
  );
}

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
