import { useTheme } from "@shopify/restyle";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Theme } from "../../common/theme";
import { Text } from "../Typography";
import { IconForwardLong } from "../Icons";
import { Box } from "../UI/Box";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { clamp, snapPoint } from "react-native-redash";
import { Pressable } from "react-native";
import { Button } from "../Button";

const ITEM_WIDTH = 320;
const ITEM_HEIGHT = 220;
const ITEM_MARGIN = 14;

const cards = [
  {
    title: "The Shawshank Redemption",
    backgroundColor: "white",
  },
  {
    title: "The Godfather",
    backgroundColor: "pastelGreen",
  },
  {
    title: "Stranger Things",
    backgroundColor: "pastelRed",
  },
  {
    title: "Dark",
    backgroundColor: "pastelYellow",
  },
] as const;

export const LastSeen = () => {
  const indexOffset = useSharedValue(0);
  const theme = useTheme<Theme>();

  return (
    <Box
      position="relative"
      height={ITEM_HEIGHT + ITEM_MARGIN * 3}
      margin="l"
      justifyContent="center"
    >
      <Box zIndex={-100} alignSelf="center" width={220}>
        <Button>zobacz wszystkie</Button>
      </Box>

      {cards.map((card, index) => (
        <LastSeenItem
          key={index}
          index={index}
          title={card.title}
          backgroundColor={card.backgroundColor}
          indexOffset={indexOffset}
        />
      ))}
    </Box>
  );
};

type Props = {
  index: number;
  title: string;
  backgroundColor?: keyof Theme["colors"];
  indexOffset: Animated.SharedValue<number>;
};

const LastSeenItem = ({
  index,
  title,
  backgroundColor,
  indexOffset,
}: Props) => {
  const theme = useTheme<Theme>();
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const theta = useSharedValue(Math.random() * 1 - 1);
  const ctx = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onBegin((e) => {
      ctx.value = { x: offsetX.value, y: offsetY.value };
    })
    .onUpdate((e) => {
      offsetX.value = e.translationX;
      // offsetY.value = e.translationY;
    })
    .onEnd((e) => {
      const destination = snapPoint(offsetX.value, e.velocityX, [-400, 0, 400]);
      offsetX.value = withSpring(destination, { velocity: e.velocityX });
      offsetY.value = withSpring(0, { velocity: e.velocityY });

      if (destination !== 0) {
        indexOffset.value = withSpring(indexOffset.value + 1);
      }
    });

  const rStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offsetX.value,
        },
        {
          translateY:
            (index - (indexOffset?.value ?? 0)) * ITEM_MARGIN + offsetY.value,
        },
        {
          scale: clamp(1 - (index - (indexOffset?.value ?? 0)) * 0.05, 0, 1),
        },
      ],
      zIndex: -index,
    };
  }, [index]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: theme.colors[backgroundColor || "white"],
            width: "100%",
            height: ITEM_HEIGHT,
            borderWidth: 1,
            borderColor: theme.colors.black,
            borderRadius: 4,
            padding: theme.spacing.m,
          },
          rStyles,
        ]}
      >
        <Text fontSize={36} fontWeight="900" numberOfLines={2}>
          {title}
        </Text>

        <IconForwardLong
          width={106}
          style={{
            marginTop: "auto",
          }}
        />
      </Animated.View>
    </GestureDetector>
  );
};
