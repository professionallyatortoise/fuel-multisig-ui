import * as React from "react";
import {
  chakra,
  keyframes,
  ImageProps,
  forwardRef,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import logo from "./logo.svg";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Logo = forwardRef<ImageProps, "img">((props, ref) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <chakra.img
      src={
        "https://assets-global.website-files.com/62e273f312d561347ce33306/62e273f312d561394de33456_Logo.svg"
      }
      ref={ref}
      {...props}
    />
  );
});
