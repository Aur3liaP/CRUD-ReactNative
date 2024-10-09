import { Colors } from "@/constants/colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { View, type ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";

type Props = {
  name: string;
};

export function PokemonType({ name }: Props) {
  const colors = useThemeColors();
  return (
    <View
      style={[
        rootStyles,
        {
          backgroundColor:
            name in Colors.type
              ? Colors.type[name as keyof typeof Colors.type]
              : colors.tint,
        },
      ]}
    >
      <ThemedText color="grayWhite" variant="subtitle3">
        {name}
      </ThemedText>
    </View>
  );
}

const rootStyles = {
  flex: 0,
  height: 20,
  paddingHorizontal: 8,
  borderRadius: 8,
} satisfies ViewStyle;
