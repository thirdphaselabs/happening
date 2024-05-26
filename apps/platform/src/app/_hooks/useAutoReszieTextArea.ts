import { useEffect } from "react";

export function useTextareaAutoHeight({ ref }: { ref: React.RefObject<HTMLTextAreaElement> }) {
  useEffect(() => {
    if (!ref.current) return;

    const listener = () => {
      if (!ref.current) return;
      ref.current.style.padding = "0px";
      ref.current.style.height = ref.current.scrollHeight + "px";
      ref.current.style.removeProperty("padding");
    };
    ref.current.addEventListener("input", listener);
  }, [ref]);
}
