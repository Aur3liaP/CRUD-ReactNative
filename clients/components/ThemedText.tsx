import { useThemeColors } from "@/hooks/useThemeColors";
import { Text, StyleSheet, type TextProps } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

// Define your styles
const styles = StyleSheet.create({
    body3: {
        fontSize: 10,
        lineHeight: 16,
    },
    headline: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: "bold",
    },
    caption: {
        fontSize: 8,
        lineHeight: 12,
    },
    subtitle: {
        fontSize: 18,
        lineHeight: 22,
    },
    subtitle1: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: "bold",
    },
    subtitle2: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "bold",
    },
    subtitle3: {
        fontSize: 10,
        lineHeight: 16,
        fontWeight: "bold",
    },
});

type ColorKeys = keyof ReturnType<typeof useThemeColors>;

type Props = TextProps & {
    variant?: keyof typeof styles,
    color?: ColorKeys
}

export function ThemedText({ variant = 'body3', color = 'grayDark', style, ...rest }: Props) {
    const colors = useThemeColors();
    
    const textColor = colors[color];

    return (
        <Text
            style={[
                styles[variant],
                { color: textColor },
                style
            ]}
            {...rest}
        />
    );
}
