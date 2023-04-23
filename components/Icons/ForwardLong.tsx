import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
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
      d="M0 10.5h105m0 0L95.5 1m9.5 9.5L95.5 20"
    />
  </Svg>
);
export { SvgComponent as IconForwardLong };
