import { useThemeColors } from "@/hooks/useThemeColors";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { View, Pressable, Image, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Card } from "@/components/Card";
import { FlatList } from "react-native-gesture-handler";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { PokemonCardTeam } from "@/components/pokemon/PokemonCardTeam";

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

export default function TeamPage() {
    const colors = useThemeColors()
    const {data, isFetching} = useFetchQuery('/team');
    const pokemons = data ?? [];

  return (
    <RootView  style={{backgroundColor: colors.purple}}>
      
      <Row style={styles.header}>
          <Pressable onPress={router.back}>
            <Row gap={8}>
              <Image
                source={require("@/assets/images/back.png")}
                width={32}
                height={32}
              />
              <ThemedText color="grayWhite" variant="headline">
                TeamRocket Team
              </ThemedText>
            </Row>
          </Pressable>
        </Row>

        <Card style={[styles.body, {backgroundColor: "gray"}]}>
          <FlatList 
              data={pokemons} 
              numColumns={3} 
              columnWrapperStyle={styles.gridGap}
              ListFooterComponent={
                isFetching ? <ActivityIndicator color={colors.tint} /> : null
              }
              contentContainerStyle={[styles.gridGap, styles.list]}
              renderItem={({ item }: { item: Team }) => ( 
                <PokemonCardTeam
                    pokeTeam={item}
                    style={{ flex: 1 / 3 }} 
                />
            )} 
            keyExtractor={(item) => item.id.toString()} 
        />
      
      </Card>

    </RootView>
  );
}

const styles = StyleSheet.create({
    header: {
        margin: 20,
        justifyContent: "space-between",
      },
      body: {
        flex: 1,
        marginTop: 16,
      },
      gridGap: {
        gap : 8,
      },
      list: {
        padding : 12,
      },
});
