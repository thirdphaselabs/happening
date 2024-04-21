import React, { forwardRef } from "react";
import { IconProps } from "./types";

export const TicketIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, forwardedRef) => {
    return (
      <svg
        width="14"
        height="19"
        viewBox="0 0 14 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}>
        <path
          d="M7.05204 6.58597L7.05833 6.59226M11.1927 17.3007L2.92295 17.3007C2.7086 17.3008 2.49632 17.2587 2.29826 17.1767C2.1002 17.0947 1.92024 16.9745 1.76867 16.8229C1.6171 16.6714 1.49689 16.4914 1.41491 16.2934C1.33294 16.0953 1.29081 15.883 1.29092 15.6687L1.28516 5.76692L4.93072 2.12135C6.10229 0.949782 8.00179 0.949783 9.17336 2.12136L12.8189 5.76692L12.8189 15.6744C12.8176 16.1053 12.6459 16.5182 12.3412 16.823C12.0365 17.1277 11.6236 17.2994 11.1927 17.3007Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  },
);

export default TicketIcon;
