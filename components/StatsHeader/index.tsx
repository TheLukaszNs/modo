import { ProgressBar } from "../ProgressBar";
import { Text } from "../Typography";
import { Box } from "../UI/Box";

export const StatsHeader = ({}) => {
  return (
    <Box
      px="l"
      py="xl"
      mt="l"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      borderRadius={16}
    >
      <Box>
        <Text variant="cardHeader">Twoje filmy 🎬</Text>
        <Text variant="cardSubheader" mt="l">
          Obejrzałeś 7 tytułów...
        </Text>
      </Box>

      <Box
        justifyContent="center"
        alignItems="center"
        style={{
          marginRight: -24,
          marginVertical: -24,
        }}
      >
        <ProgressBar
          color="mainBackground"
          progress={0.7}
          size={64}
          width={5}
        />
        <Text
          style={{
            position: "absolute",
          }}
          fontSize={12}
          fontWeight="700"
        >
          ...z 10
        </Text>
      </Box>
    </Box>
  );
};
