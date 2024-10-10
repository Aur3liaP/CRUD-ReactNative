import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { ThemedText } from "@/components/ThemedText";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { SearchBar } from "@/components/Searchbar";
import { Row } from "@/components/Row";
import { SortButton } from "@/components/SortButton";
import { RootView } from "@/components/RootView";

type Pokemon = {
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
  isFavorite: number;
  description: string;
};

export default function Index() {
  const colors = useThemeColors()
  const {data, isFetching} = useFetchQuery('/pokemons')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<"id" | "name">('id');
  const pokemons = data ?? [];
  const filteredPokemons = [... (search ? pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toString() === search) : pokemons)].sort((a,b) =>(a[sort] < b[sort] ? -1 : 1))

  return (
    <RootView>
      <Row style={styles.header} gap={16}>
          <Image source={require("@/assets/images/Pokeball.png")} width={24} height={24}/>
          <ThemedText variant="headline" color="grayLight">Pokedeksu</ThemedText>
      </Row>
      <Row gap={16} style={styles.form}> 
          <SearchBar value={search} onChange={setSearch}/> 
          <SortButton value={sort} onChange={setSort}/>
      </Row>

      <Card style={styles.body}>
          <FlatList 
              data={filteredPokemons} 
              numColumns={3} 
              columnWrapperStyle={styles.gridGap}
              ListFooterComponent={
                isFetching ? <ActivityIndicator color={colors.tint} /> : null
              }
              contentContainerStyle={[styles.gridGap, styles.list]}
              renderItem={({ item }: { item: Pokemon }) => ( 
                <PokemonCard 
                  pokemon={item}
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
    paddingHorizontal: 12,
    paddingBottom: 8,
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
  form: {
    paddingHorizontal: 12,
  }
})
