"use client";

import { Flex, Button as RButton, Text } from "@radix-ui/themes";
import type { ButtonProps as RButtonProps } from "@radix-ui/themes/dist/cjs/components/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "./utils/helpers";
import { CheckCircledIcon } from "@radix-ui/react-icons";

type LoadingProps = {
  isLoading: boolean;
  loadingText?: string;
  hideIcon?: boolean;
};

type SuccessProps = {
  isSuccess: boolean;
  successText?: string;
};

type ErrorProps = {
  isError: boolean;
  errorText?: string;
};

type ButtonProps = {
  loading?: LoadingProps;
  success?: SuccessProps;
  error?: ErrorProps;
} & Omit<RButtonProps, "loading">;

export function Button({
  children,
  loading,
  success,
  error,
  disabled,
  className,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <RButton
      className={cn("relative flex", className)}
      disabled={disabled || loading?.isLoading || success?.isSuccess || error?.isError}
      {...rest}>
      <Content loading={loading} success={success} error={error}>
        {children}
      </Content>

      <Icon loading={loading} success={success} />
    </RButton>
  );
}

function Content({
  children,
  loading,
  success,
  error,
}: {
  children: React.ReactNode;
  loading: ButtonProps["loading"];
  success: ButtonProps["success"];
  error: ButtonProps["error"];
}) {
  if (loading?.isLoading) {
    return <>{loading.loadingText ?? children}</>;
  }

  if (error?.isError) {
    return <>{error.errorText}</>;
  }

  if (success?.isSuccess) {
    return <>{success.successText}</>;
  }

  return <>{children}</>;
}

function Icon({ loading, success }: { loading: ButtonProps["loading"]; success: ButtonProps["success"] }) {
  const opacity = success?.isSuccess || (loading?.isLoading && !loading.hideIcon) ? "" : "opacity-0";
  const animate = loading?.isLoading && !success?.isSuccess ? "animate-spin" : "";
  return (
    <Flex className={`absolute right-[12px] ${opacity} ${animate}`}>
      {success?.isSuccess ? <CheckCircledIcon /> : <AiOutlineLoading3Quarters />}
    </Flex>
  );
}
