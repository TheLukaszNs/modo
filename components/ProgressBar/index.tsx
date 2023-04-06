import {
  Canvas,
  Circle,
  Path,
  Skia,
  point,
  useValue,
  runSpring,
  runTiming,
  Shadow,
} from "@shopify/react-native-skia";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../common/theme";
import { useEffect } from "react";

const CANVAS_PADDING = 48;

type Props = {
  size?: number;
  color: keyof Theme["colors"];
  progress: number;
  width?: number;
};

export const ProgressBar = ({
  size = 20,
  color,
  progress,
  width = 4,
}: Props) => {
  const animatedProgress = useValue(0);
  const { colors } = useTheme<Theme>();

  const radius = size / 2;
  const center = point(
    radius + width / 2 + CANVAS_PADDING / 2,
    radius + width / 2 + CANVAS_PADDING / 2,
  );

  useEffect(() => {
    runTiming(animatedProgress, progress, {
      duration: 1000,
      easing: (t) => Math.sin((t * Math.PI) / 2),
    });
  }, [progress]);

  const path = Skia.Path.Make();
  path.addCircle(center.x, center.y, radius);

  const trackPath = Skia.Path.Make();
  trackPath.addCircle(center.x, center.y, radius);

  return (
    <Canvas
      style={{
        width: size + width + CANVAS_PADDING,
        height: size + width + CANVAS_PADDING,
      }}
    >
      <Path
        path={trackPath}
        style="stroke"
        color="#FBC823"
        strokeWidth={width}
        origin={center}
      >
        <Shadow dx={0} dy={0} blur={10} color="#daa805" />
      </Path>
      <Path
        path={path}
        start={0}
        end={animatedProgress}
        style="stroke"
        color={colors[color]}
        strokeWidth={width}
        strokeCap="round"
        strokeJoin="round"
        origin={center}
        transform={[{ rotate: -Math.PI / 2 }]}
      />
      <Circle c={center} r={radius - width / 2} color={colors.accent} />
    </Canvas>
  );
};
