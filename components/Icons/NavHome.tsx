import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      stroke="#000"
      d="M20 27.5h-.5v12h-9v-16H5.303L24 6.673 42.697 23.5H37.5v16h-9v-12H20Z"
    />
  </Svg>
);
export { SvgComponent as NavHomeIcon };
