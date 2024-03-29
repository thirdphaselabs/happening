"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { CheckIcon } from "@radix-ui/react-icons";
import { Box, Flex, Separator, Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

enum OnboardingStep {
  Welcome = "welcome",
  Profile = "profile",
  Company = "company",
  Invite = "invite",
  Complete = "complete",
}

const stepPaths: Record<OnboardingStep, string> = {
  [OnboardingStep.Welcome]: "/onboarding/welcome",
  [OnboardingStep.Profile]: "/onboarding/profile",
  [OnboardingStep.Company]: "/onboarding/company",
  [OnboardingStep.Invite]: "/onboarding/invite",
  [OnboardingStep.Complete]: "/onboarding/complete",
};

const stepTitles: Record<OnboardingStep, string> = {
  [OnboardingStep.Welcome]: "Welcome",
  [OnboardingStep.Profile]: "Personal details",
  [OnboardingStep.Company]: "Create your company",
  [OnboardingStep.Invite]: "Invite your team",
  [OnboardingStep.Complete]: "Complete",
};

export function Stepper() {
  const { user, isLoaded } = useUser();
  const pathName = usePathname();

  if (!isLoaded) return null;

  const organisationMemberships =
    user?.organizationMemberships.filter((mem) => mem.role === "org:manager") ?? [];

  const { paths, titles } = buildPathsAndTitles({
    isAlreadyInAnOrganisation: organisationMemberships.length > 0,
  });

  const pathIndex = paths.findIndex((path) => path === pathName);

  return (
    <Flex direction="column" gap="4" position="relative">
      <Separator
        orientation="vertical"
        className="absolute left-[17.5px] top-[12px]"
        style={{
          height: `${paths.length * 40}px`,
        }}
      />
      {titles.map((title, index) => (
        <Switch key={title} currentIndex={pathIndex} index={index}>
          {title}
        </Switch>
      ))}
    </Flex>
  );
}

function buildPathsAndTitles({ isAlreadyInAnOrganisation }: { isAlreadyInAnOrganisation: boolean }) {
  if (!isAlreadyInAnOrganisation) {
    return {
      paths: [
        stepPaths[OnboardingStep.Welcome],
        stepPaths[OnboardingStep.Profile],
        stepPaths[OnboardingStep.Company],
        stepPaths[OnboardingStep.Invite],
        stepPaths[OnboardingStep.Complete],
      ],
      titles: [
        stepTitles[OnboardingStep.Welcome],
        stepTitles[OnboardingStep.Profile],
        stepTitles[OnboardingStep.Company],
        stepTitles[OnboardingStep.Invite],
        stepTitles[OnboardingStep.Complete],
      ],
    };
  }
  return {
    paths: [
      stepPaths[OnboardingStep.Welcome],
      stepPaths[OnboardingStep.Profile],
      stepPaths[OnboardingStep.Complete],
    ],
    titles: [
      stepTitles[OnboardingStep.Welcome],
      stepTitles[OnboardingStep.Profile],
      stepTitles[OnboardingStep.Complete],
    ],
  };
}

function Switch({
  children,
  currentIndex,
  index,
}: {
  children: React.ReactNode;
  currentIndex: number;
  index: number;
}) {
  if (currentIndex > index) return <Completed>{children}</Completed>;

  return currentIndex === index ? <Active>{children}</Active> : <Upcoming>{children}</Upcoming>;
}

function Active({ children }: { children: React.ReactNode }) {
  return (
    <Flex className="bg-sageA2 items-center gap-3 rounded-[4px] px-2 py-2">
      <Box className="bg-sky9 z-10 flex h-5 w-5 items-center justify-center rounded-full" />
      <Text size="2" weight="medium">
        {children}
      </Text>
    </Flex>
  );
}

function Upcoming({ children }: { children: React.ReactNode }) {
  return (
    <Flex className=" items-center gap-3 px-2 py-2">
      <Box className="border-1 border-sageA8 z-10 flex h-5 w-5 items-center justify-center rounded-full border bg-white" />
      <Text size="2" weight="medium">
        {children}
      </Text>
    </Flex>
  );
}

function Completed({ children }: { children: React.ReactNode }) {
  return (
    <Flex className=" items-center gap-3 px-2 py-2">
      <Flex className="border-1 bg-sky12 z-10 flex h-5 w-5 items-center justify-center rounded-full border ">
        <CheckIcon color="white" height="14" width="14" />
      </Flex>
      <Text size="2" weight="medium">
        {children}
      </Text>
    </Flex>
  );
}
