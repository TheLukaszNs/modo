import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill="currentColor"
      stroke="#000"
      d="m29.2 27.487.3-.351c1.866-2.194 3-5.04 3-8.136A12.5 12.5 0 1 0 20 31.5l9.2-4.013Zm0 0 .326.327m-.326-.327.326.327m0 0 .54.54.147.146m-.687-.686.687.686m0 0h.207m-.207 0h.207m0 0h1.373l9.5 9.5L39 40.293l-9.5-9.5v-1.58m.92-.713-.92.713m0 0-.146-.147m.146.147-.146-.147m0 0-.54-.54-.327-.326m.867.866-.867-.866m0 0-.352.3m.352-.3-.352.3m0 0a12.532 12.532 0 0 1-8.135 3l8.135-3ZM20 9.5a9.463 9.463 0 0 0-9.5 9.5c0 5.276 4.224 9.5 9.5 9.5s9.5-4.224 9.5-9.5-4.224-9.5-9.5-9.5Z"
    />
  </Svg>
);
export { SvgComponent as SearchIcon };
