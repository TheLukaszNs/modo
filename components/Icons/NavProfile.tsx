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
      d="M24 8.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm0 20c4.36 0 8.28.884 11.091 2.29C37.933 32.21 39.5 34.08 39.5 36v3.5h-31V36c0-1.919 1.567-3.79 4.409-5.21C15.72 29.384 19.64 28.5 24 28.5Z"
    />
  </Svg>
);
export { SvgComponent as NavProfileIcon };
