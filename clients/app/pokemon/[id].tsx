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
import PagerView from "react-native-pager-view";
import { useRef, useState } from "react";
import { PokemonCatch } from "@/components/pokemon/PokemonCatch";

export default function Pokemon() {
  const params = useLocalSearchParams() as {id : string}
  const [id, setId] = useState(parseInt(params.id, 10))
  const offset  = useRef(1)
  const pager  = useRef<PagerView>(null)

  const onPageSelected = (e : {nativeEvent: {position : number}}) => {
    offset.current = e.nativeEvent.position - 1
  }

  const onPageScrollStateChanged = (e: {nativeEvent: {pageScrollState : string}}) => {
    if (e.nativeEvent.pageScrollState !== 'idle') {
      return
    }
    if (offset.current === -1 && id === 2){
      return;
    }
    if (offset.current === -1 && id === 150){
      return;
    }
    if (offset.current !== 0) {
      setId(id + offset.current);
      offset.current = 0;
      pager.current?.setPageWithoutAnimation(1)
    }
  }

  const onPrevious = () => {
    pager.current?.setPage(0)
  }
  const onNext = () => {
    pager.current?.setPage(2 + offset.current)
  }

  return (
    <PagerView 
      ref={pager}
      onPageSelected={onPageSelected}
      onPageScrollStateChanged={onPageScrollStateChanged}
      initialPage={1} style={{flex:1}}>

      <PokemonView key={id - 1} id={id-1} onNext={onNext} onPrevious={onPrevious}/>
      <PokemonView key={id} id={id}  onNext={onNext} onPrevious={onPrevious}/>
      <PokemonView key={id + 1} id={id+1}  onNext={onNext} onPrevious={onPrevious}/>
    </PagerView>
  );
}

type Props = {
  id: number,
  onPrevious: () => void,
  onNext: () => void,
}

function PokemonView({id, onPrevious, onNext}: Props) {
  const colors = useThemeColors();
  const { data } = useFetchQuery("/pokemons");
  const pokemons = data ?? [];
  const pokemon = pokemons.find((p) => p.id === id);

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
            #{id.toString().padStart(3, "0")}
          </ThemedText>
        </Row>
        <Card style={[styles.card, {overflow: 'visible'}]}>
        {/* IMAGE */}
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

           {/* TYPES */}
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
        <PokemonCatch pokemonData={pokemon}/>
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
