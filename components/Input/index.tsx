import { TextInput } from "react-native";
import { TextInputProps } from "react-native/types";
import { Box } from "../UI/Box";
import { Text } from "../Typography";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface InputProps extends TextInputProps {
  suffixIcon?: keyof (typeof Icon)["glyphMap"];
}

export const Input = ({ suffixIcon, ...props }: InputProps) => {
  return (
    <Box
      flexDirection="row"
      borderWidth={1}
      borderColor="black"
      borderRadius={4}
      backgroundColor="white"
      py="m"
      px="m"
      alignItems="center"
    >
      <TextInput
        style={{
          flex: 1,
          fontSize: 18,
        }}
        {...props}
      />
      {suffixIcon && (
        <Icon
          name={suffixIcon}
          size={24}
          color="black"
          style={{ marginLeft: 8 }}
        />
      )}
    </Box>
  );
};
