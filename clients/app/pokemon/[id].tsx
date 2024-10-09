import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import { Card } from "@/components/Card";
import { PokemonType } from "@/components/pokemon/PokemonType";

export default function Pokemon() {
  const colors = useThemeColors();
  const params = useLocalSearchParams() as { id: string };
  const { data } = useFetchQuery("/pokemons");
  const pokemons = data ?? [];
  const pokemon = pokemons.find((p) => p.id.toString() === params.id);
  const colorType =
    pokemon?.type1 && pokemon?.type1 in Colors.type
      ? Colors.type[pokemon.type1 as keyof typeof Colors.type]
      : colors.tint;

  if (!pokemon) {
    return (
      <RootView>
        <Text>Pokémon non trouvé</Text>
      </RootView>
    );
  }

  return (
    <RootView style={{ backgroundColor: colorType }}>
      <View>
        <Image
          style={styles.pokeball}
          source={require("@/assets/images/pokeball_big.png")}
          width={208}
          height={208}
        />
        <Row style={styles.header}>
          <Pressable onPress={router.back}>
            <Row gap={8}>
              <Image
                source={require("@/assets/images/back.png")}
                width={32}
                height={32}
              />
              <ThemedText color="grayWhite" variant="headline">
                {pokemon?.name}
              </ThemedText>
            </Row>
          </Pressable>
          <ThemedText color="grayWhite" variant="subtitle2">
            #{pokemon.id.toString().padStart(3, "0")}
          </ThemedText>
        </Row>
        <View style={styles.body}>
          <Image
            style={styles.artwork}
            source={{ uri: pokemon.image_url }}
            width={200}
            height={200}
          />
          <Card style={styles.card}>
            <Row gap={16}>
              <PokemonType name={pokemon.type1} />
              {pokemon.type2 && <PokemonType name={pokemon.type2} />}
            </Row>
            <ThemedText style={{ color: colorType }} variant="subtitle2">
              About
            </ThemedText>
            <ThemedText style={{ color: colorType }} variant="subtitle2">
              Base stats
            </ThemedText>
          </Card>
        </View>
        <Text>Pokemon{pokemon.id}</Text>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  header: {
    margin: 20,
    justifyContent: "space-between",
  },
  pokeball: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  artwork: {
    position: "absolute",
    top: -140,
    alignSelf: "center",
    zIndex: 2,
  },
  body: {
    marginTop: 144,
  },
  card: {
    paddingHorizontal: 20,
    paddingTop: 60,
    gap: 16,
    alignItems: "center",
  },
});
