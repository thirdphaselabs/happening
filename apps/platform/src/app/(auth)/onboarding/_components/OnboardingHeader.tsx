"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Flex, Button, Heading, Separator } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { OnboardingStep } from "~/trpc/types";
import { computeOnboardingStepFromPath } from "~/utils/helpers";

export function OnboardingHeader() {
  const pathName = usePathname();
  const onboardingStep = computeOnboardingStepFromPath(pathName);

  return (
    <Flex className="relative h-[80px] w-full items-center justify-between px-6">
      <Flex gap="4" className="w-[80px]">
        <Button size="2" color="gray" variant="ghost">
          <ArrowLeftIcon />
          Previous
        </Button>
      </Flex>
      <Heading size="4" className="ml-4">
        {getTitleFromOnboardingStep(onboardingStep)}
      </Heading>
      <Flex gap="4" className="w-[80px] justify-end">
        <Button variant="ghost" disabled>
          Skip
        </Button>
      </Flex>
      <Separator orientation="horizontal" className="absolute bottom-0 left-0 w-full" />
    </Flex>
  );
}

function getTitleFromOnboardingStep(onboardingStep: OnboardingStep) {
  switch (onboardingStep) {
    case "Welcome":
      return "Welcome";
    case "Profile":
      return "Personal details";
    case "CreateCompany":
      return "Create your company";
    case "InviteTeam":
      return "Invite your team";
    case "Complete":
      return "Complete";
  }
}
