import { Box } from "@radix-ui/themes";

export function TopGradient() {
  return (
    <Box
      className="pointer-events-none fixed top-0 z-[999] h-[180px] w-full"
      style={{
        background:
          "linear-gradient(rgb(33, 188, 226, 0.125) 0%, rgb(255, 204, 1, 0.06) 52.58%, rgb(255, 204, 1, 0) 100%)",
      }}
    />
  );
}
