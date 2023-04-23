import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeWidth={2}
      d="M2 12.5h42m-42 0L13.5 24M2 12.5 13.5 1"
    />
  </Svg>
);
export { SvgComponent as BackIcon };
