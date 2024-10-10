import { Image, Pressable, StyleSheet, View, type ViewStyle } from "react-native";
import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";

type Team = {
    id: number;
    pokedex_number: number;
    name: string;
    type1: string;
    type2: string | null;
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
    image_url: string;
    level: number;
    description: string;
};

type Props = {
    style?: ViewStyle;
    pokeTeam: Team;
};

export function PokemonCardTeam({ style, pokeTeam }: Props) {
    const colors = useThemeColors();

    return (
        <Link
            href={`/team/${pokeTeam.id}`}
            asChild
        >
            <Pressable android_ripple={{ color: colors.tint, foreground: true }} style={style}>
                <Card style={[style, styles.card]}>
                    <ThemedText style={styles.id} variant="caption" color="grayMedium">
                        #{pokeTeam.pokedex_number.toString().padStart(3, '0')}
                    </ThemedText>
                    <View style={[styles.shadow, { backgroundColor: colors.grayBackground }]} />
                    <Image source={{ uri: pokeTeam.image_url }} style={styles.image} />
                    <ThemedText>{pokeTeam.name}</ThemedText>
                    <ThemedText variant="caption">{pokeTeam.level}</ThemedText>
                </Card>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        padding: 4,
        position: "relative",
    },
    id: {
        alignSelf: "flex-end",
    },
    image: {
        width: 80,
        height: 80,
    },
    shadow: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        borderRadius: 7,
    },
});
