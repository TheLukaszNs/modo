import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 28 28"
    {...props}
  >
    <Path
      fill="currentColor"
      stroke="#000"
      d="m15 8.029.149.334.363-.041 7.364-.828-4.369 6.038-.214.296.218.294 4.41 5.958-7.412-.78-.365-.038-.146.336-2.963 6.812L9 19.62l-.149-.333-.363.041-7.365.828 4.37-6.038.214-.296-.218-.295L1.08 7.57l7.412.78.365.038.146-.336 2.963-6.813L15 8.03Z"
    />
  </Svg>
);
export { SvgComponent as StarIcon };
