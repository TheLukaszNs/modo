import { Canvas, RoundedRect, Shadow } from "@shopify/react-native-skia";
import { useTheme } from "@shopify/restyle";
import { useEffect, useState } from "react";
import { ScrollView, View, useWindowDimensions } from "react-native";
import { Theme } from "../../common/theme";
import { Text } from "../Typography";
import { Box } from "../UI/Box";

type Props = {
  movie: {
    id: number;
    title: string;
    image: string;
  };
  tags: string[];
};

export const MovieListItem = ({ movie, tags }: Props) => {
  const { width } = useWindowDimensions();
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const { spacing } = useTheme<Theme>();

  const { image, title } = movie;

  return (
    <Box
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setSize({ width, height });
      }}
      style={{
        width: 0.75 * width,
      }}
      my="s"
      justifyContent="space-between"
    >
      <CardBackground size={size} />

      <Box justifyContent="space-between">
        <ScrollView
          horizontal
          style={{
            paddingTop: spacing.m,
          }}
          contentContainerStyle={{
            gap: spacing.s,
            paddingHorizontal: spacing.m,
          }}
          showsHorizontalScrollIndicator={false}
        >
          {tags.map((tag, index) => (
            <Box key={index} py="s" px="m" borderRadius={16}>
              <Text fontWeight="700" fontSize={12}>
                {tag}
              </Text>
            </Box>
          ))}
        </ScrollView>

        <Box p="m">
          <Text
            mt="m"
            variant="cardHeader"
            fontSize={32}
            fontWeight="700"
            numberOfLines={1}
          >
            {title}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

const CARD_PADDING = 64;

const CardBackground = ({
  size,
}: {
  size: { width: number; height: number };
}) => {
  const theme = useTheme<Theme>();

  return (
    <Canvas
      style={{
        position: "absolute",
        height: size.height + 2 * CARD_PADDING,
        width: size.width + 2 * CARD_PADDING,

        marginLeft: -CARD_PADDING,
        marginTop: -CARD_PADDING,
      }}
    >
      <RoundedRect
        x={CARD_PADDING}
        y={CARD_PADDING}
        width={size.width}
        height={size.height}
        r={16}
      >
        <Shadow color={"#00000020"} dx={0} dy={0} blur={2} />
        {/* <Shadow color={"#00000040"} dx={0} dy={0} blur={10} /> */}
      </RoundedRect>
    </Canvas>
  );
};
