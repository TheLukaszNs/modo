import { createVariant, useRestyle } from "@shopify/restyle";
import { Theme } from "../../common/theme";
import { Pressable } from "react-native";
import { Text } from "../Typography";
import { Box } from "../UI/Box";
import { useState } from "react";

type Props = {
  children: string;
  variant?: "flat" | "elevated";
  onPress?: () => void;
};

export const Button = ({ children, variant = "flat", onPress }: Props) => {
  const [buttonSize, setButtonSize] = useState({ width: 0, height: 0 });

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        position: "relative",
      }}
    >
      {variant === "elevated" && (
        <Box
          position="absolute"
          borderRadius={4}
          backgroundColor="pastelRed"
          top={6}
          left={6}
          width={buttonSize.width - 12}
          height={buttonSize.height}
          borderWidth={1}
          borderColor="black"
        />
      )}

      <Box
        onLayout={(e) => {
          setButtonSize({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
          });
        }}
        borderRadius={4}
        py="m"
        backgroundColor="pastelBlue"
        alignItems="center"
        justifyContent="center"
        flex={1}
        borderWidth={1}
        borderColor="black"
      >
        <Text color="white" fontSize={24} fontWeight="700">
          {children}
        </Text>
      </Box>
    </Pressable>
  );
};
