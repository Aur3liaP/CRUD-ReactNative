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
import { PokemonStats } from "@/components/pokemon/PokemonStats";

export default function Pokemon() {
  const colors = useThemeColors();
  const params = useLocalSearchParams() as { id: string };
  const { data } = useFetchQuery("/pokemons");
  const pokemons = data ?? [];
  const pokemon = pokemons.find((p) => p.id.toString() === params.id);
  const id = parseInt(params.id, 10)
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

  const onPrevious = () => {
    router.replace({pathname: '/pokemon/[id]', params: {id: Math.max(id - 1)}})
  }
  const onNext = () => {
    router.replace({pathname: '/pokemon/[id]', params: {id: Math.min(id + 1, 151)}})
  }

  const isFirst = id === 1;
  const isLast = id === 151;

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


          {/* TYPES */}
        <Card style={[styles.card, {overflow: 'visible'}]}>
          <Row style={styles.imageRow}>
              {isFirst ? <View style={{width:24, height: 24}}></View> : <Pressable onPress={onPrevious}>
                <Image
                    source={require("@/assets/images/chevron_left.png")}
                    width={24}
                    height={24}
                  />
              </Pressable>}
              <Image
                style={styles.artwork}
                source={{ uri: pokemon.image_url }}
                width={200}
                height={200}
              />
                {isLast ? <View style={{width:24, height: 24}}></View> : <Pressable onPress={onNext}>
                  <Image
                      source={require("@/assets/images/chevron_right.png")}
                      width={24}
                      height={24}
                    />
              </Pressable>}
          </Row>
            <Row gap={16}>
              <PokemonType name={pokemon.type1} />
              {pokemon.type2 && <PokemonType name={pokemon.type2} />}
            </Row>

            {/* ABOUT */}
            <ThemedText style={{ color: colorType }} variant="subtitle2">
              About
            </ThemedText>
            <ThemedText>
              {pokemon.description}
            </ThemedText>

            {/* STATS */}
            <ThemedText style={{ color: colorType }} variant="subtitle2">
              Base stats
            </ThemedText>
            <View style={{ alignSelf: "stretch" }}>
              <PokemonStats name={"HP"} value={pokemon.hp} color={colorType}/>
              <PokemonStats name={"ATK"} value={pokemon.attack} color={colorType}/>
              <PokemonStats name={"DEF"} value={pokemon.defense} color={colorType}/>
              <PokemonStats name={"SATK"} value={pokemon.special_attack} color={colorType}/>
              <PokemonStats name={"SDEF"} value={pokemon.special_defense} color={colorType}/>
              <PokemonStats name={"SPD"} value={pokemon.speed} color={colorType}/>
            </View>
        </Card>
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
  imageRow: {
    position: "absolute",
    top: -140,
    zIndex: 2,   
    justifyContent: "space-between",
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  artwork: {
    alignSelf: "center",

  },
  card: {
    marginTop: 144,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    gap: 16,
    alignItems: "center",
  },
});
