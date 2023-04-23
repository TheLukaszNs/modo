import { Pressable } from "react-native";
import { Text } from "../Typography";
import { Box } from "../UI/Box";
import Animated, {
  Easing,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props<T> = {
  items: ReadonlyArray<T> | Array<T>;
  getSelected: (item: T) => boolean;
  keyExtractor: (item: T, index: number) => string;
  labelExtractor: (item: T) => string;
  onChange?: (item: T) => void;
};

export const BadgeFilter = <T,>({
  items,
  getSelected,
  keyExtractor,
  labelExtractor,
  onChange,
}: Props<T>) => {
  return (
    <Box flexDirection="row" gap="s">
      {items.map((item, index) => {
        const isSelected = getSelected(item);

        return (
          <BadgeFilterItem
            key={keyExtractor(item, index)}
            selected={isSelected}
            label={labelExtractor(item)}
            onPress={() => {
              onChange?.(item);
            }}
          />
        );
      })}
    </Box>
  );
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BadgeFilterItem = ({
  selected,
  label,
  onPress,
}: {
  selected: boolean;
  label: string;
  onPress: () => void;
}) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      flex: withTiming(selected ? 2 : 1, {
        duration: 150,
      }),
    };
  }, [selected]);

  return (
    <AnimatedPressable onPress={onPress} style={rStyle}>
      <Box
        backgroundColor={selected ? "black" : "white"}
        borderColor="black"
        borderWidth={1}
        borderRadius={4}
        px="s"
        py="s"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        flexWrap="nowrap"
      >
        <Text
          color={selected ? "white" : "black"}
          fontWeight="700"
          fontSize={12}
          numberOfLines={1}
        >
          {label}
        </Text>
      </Box>
    </AnimatedPressable>
  );
};
