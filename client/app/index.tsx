import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { ThemedText } from "@/components/ThemedText";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colors = useThemeColors()
  const {data} = useFetchQuery('/pokemons')
  const pokemons = data ?? []

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
      <View style={styles.header}>
    <Image source={require("@/assets/images/Pokeball.png")} width={24} height={24}/>
     <ThemedText variant="headline" color="grayDark">Pokedeksu</ThemedText>
      </View>

      <Card style={styles.body}>
          <FlatList 
              data={pokemons} 
              numColumns={3} 
              columnWrapperStyle={styles.gridGap}
              contentContainerStyle={[styles.gridGap, styles.list]}
              renderItem={({item}) => <PokemonCard id={item.id} name={item.name} image_url={item.image_url} style={{flex: 1/3}}/> } keyExtractor={(item) => item.id.toString()}/>
      
      </Card>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:4,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12,
  },
  body: {
    flex: 1,
  },
  gridGap: {
    gap : 8,
  },
  list: {
    padding : 12,
  },
})
