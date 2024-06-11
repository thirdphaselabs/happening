"use client";

import { useEffect, useState } from "react";
import { Separator as RSeparator } from "@radix-ui/themes";
import { cn } from "~/lib/utils";

export function Separator() {
  const [showSeparator, setShowSeparator] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY > 20) {
        // Adjust the value '100' to your specific need
        setShowSeparator(true);
      } else {
        setShowSeparator(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <RSeparator
      orientation="horizontal"
      className={cn(`absolute bottom-0 z-50 w-full`, {
        "opacity-0": !showSeparator,
      })}
    />
  );
}
