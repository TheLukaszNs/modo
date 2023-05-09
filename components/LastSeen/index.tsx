import { useTheme } from "@shopify/restyle";
import Animated, {
  Easing,
  useAnimatedReaction,
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
import { useUserMovies } from "../../hooks/useUserMovies";
import { Rating } from "../Rating";

const ITEM_HEIGHT = 220;
const ITEM_MARGIN = 14;

const CARD_COLORS: (keyof Theme["colors"])[] = [
  "white",
  "pastelGreen",
  "pastelRed",
  "pastelYellow",
];

type Props = {
  onSeeAllPress: () => void;
};

export const LastSeen = ({ onSeeAllPress }: Props) => {
  const indexOffset = useSharedValue(0);
  const theme = useTheme<Theme>();

  const movies = useUserMovies()?.list ?? [];

  if (movies.length === 0) {
    return (
      <Box justifyContent="center" alignItems="center" py="l" my="m">
        <Text fontWeight="900" fontSize={20}>
          Brak filmów i seriali 😱
        </Text>
        <Box alignSelf="center" width={220} mt="m">
          <Button>dodaj</Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      position="relative"
      height={ITEM_HEIGHT + 1 * ITEM_MARGIN}
      margin="l"
      justifyContent="center"
    >
      <Box
        zIndex={-100}
        alignSelf="center"
        alignItems="center"
        gap="l"
        width={220}
      >
        <Button onPress={onSeeAllPress}>zobacz wszystkie</Button>
        <Text
          fontSize={16}
          fontWeight="900"
          color="pastelBlue"
          textDecorationLine="underline"
          onPress={() => {
            indexOffset.value = withSpring(0);
          }}
        >
          odśwież listę
        </Text>
      </Box>

      {[...movies]
        .reverse()
        .slice(0, 4)
        .map((movie, index) => (
          <LastSeenItem
            key={movie.id ?? index}
            index={index}
            title={movie.title}
            rating={movie.rating ?? 0}
            backgroundColor={CARD_COLORS[index % CARD_COLORS.length]}
            indexOffset={indexOffset}
          />
        ))}
    </Box>
  );
};

type ItemProps = {
  index: number;
  title: string;
  rating: number;
  backgroundColor?: keyof Theme["colors"];
  indexOffset: Animated.SharedValue<number>;
};

const LastSeenItem = ({
  index,
  title,
  rating,
  backgroundColor,
  indexOffset,
}: ItemProps) => {
  const theme = useTheme<Theme>();
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const theta = Math.random() * (1 / 8) - 1 / 16;
  const rotationZ = useSharedValue(theta);
  const ctx = useSharedValue({ x: 0, y: 0 });

  useAnimatedReaction(
    () => indexOffset,
    () => {
      if (indexOffset.value < index) {
        offsetX.value = withSpring(0);
        offsetY.value = withSpring(0);
      }
    },
  );

  const gesture = Gesture.Pan()
    .onBegin((e) => {
      ctx.value = { x: offsetX.value, y: offsetY.value };
      rotationZ.value = withTiming(0, {
        easing: Easing.inOut(Easing.ease),
      });
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
    })
    .onFinalize(() => {
      rotationZ.value = withTiming(theta, {
        easing: Easing.inOut(Easing.ease),
      });
    });

  const rStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          perspective: 1500,
        },
        {
          translateX: offsetX.value,
        },
        {
          translateY:
            (index - (indexOffset?.value ?? 0)) * ITEM_MARGIN + offsetY.value,
        },
        {
          rotateX: "20deg",
        },
        {
          rotateZ: `${rotationZ.value}rad`,
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

        <Box my="s">
          <Rating rating={rating} />
        </Box>

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
