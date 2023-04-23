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
      d="m29.17 6.17.12.33H38c1.924 0 3.5 1.576 3.5 3.5v28c0 1.924-1.576 3.5-3.5 3.5H10A3.512 3.512 0 0 1 6.5 38V10c0-1.924 1.576-3.5 3.5-3.5h8.71l.12-.33C19.603 4.036 21.623 2.5 24 2.5s4.397 1.536 5.17 3.67ZM14 15.5h-.5v3h2v6h3v-9H14ZM20.5 34v-.5h-3.082l2.519-2.61c.354-.356.563-.863.563-1.39 0-1.096-.904-2-2-2h-5v3h3.326l-3.186 3.313-.14.146V36.5h7V34Zm13.5.5h.5v-5h-11v5H34Zm0-12h.5v-5h-11v5H34Zm-10-17A2.506 2.506 0 0 0 21.5 8c0 1.376 1.124 2.5 2.5 2.5s2.5-1.124 2.5-2.5-1.124-2.5-2.5-2.5Z"
    />
  </Svg>
);
export { SvgComponent as NavListIcon };
