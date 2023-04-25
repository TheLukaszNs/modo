import { Theme } from "../../common/theme";
import { Text } from "../Typography";
import { Box } from "../UI/Box";

type Props = {
  backgroundColor?: keyof Theme["colors"];
  children: React.ReactNode;
};

export const PastelCard = ({ backgroundColor = "white", children }: Props) => {
  return (
    <Box
      backgroundColor={backgroundColor}
      borderWidth={1}
      borderColor="black"
      borderRadius={4}
      p="m"
    >
      {children}
    </Box>
  );
};
