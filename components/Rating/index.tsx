import { useTheme } from "@shopify/restyle";
import { StarIcon, HalfStarIcon } from "../Icons";
import { Box } from "../UI/Box";
import { Theme } from "../../common/theme";

type Props = {
  rating: number;
};

export const Rating = ({ rating }: Props) => {
  const theme = useTheme<Theme>();

  const stars = Math.min(Math.floor(rating), 5);
  const halfStar = rating - stars >= 0.5;

  return (
    <Box flexDirection="row" gap="s">
      {new Array(stars).fill(0).map((_, index) => (
        <StarIcon key={index} color={theme.colors.pastelYellow} />
      ))}
      {halfStar && <HalfStarIcon color={theme.colors.pastelYellow} />}
    </Box>
  );
};
