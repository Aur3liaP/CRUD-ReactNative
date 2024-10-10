import { Alert, Pressable, StyleSheet, View, type ViewProps, type ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";
import axios from "axios";
import { useCallback } from "react";

type Props = ViewProps & {
    pokemonData : {
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
        description: string;
    }
};


export function PokemonCatch({style, pokemonData, ...rest}: Props) {
    
    const handleCatch = useCallback(async () => {
        try {
            await axios.post("http://192.168.1.139:3310/api/team/", {
                id: pokemonData.id,
                pokedex_number: pokemonData.pokedex_number,
                name: pokemonData.name,
                type1: pokemonData.type1,
                type2: pokemonData.type2,
                hp: pokemonData.hp,
                attack: pokemonData.attack,
                defense: pokemonData.defense,
                special_attack: pokemonData.special_attack,
                special_defense: pokemonData.special_defense,
                speed: pokemonData.speed,
                image_url: pokemonData.image_url,
                description: pokemonData.description
            });
          Alert.alert("Pokemon attrapé", `${pokemonData.name} a été capturé !`);
        } catch (error) {
          console.error("Erreur","Oh mince il s'est enfui...");
        }
      }, [pokemonData]);


    return (
        <View style={styles.release}>
            <Pressable onPress={handleCatch}>
                <ThemedText color="grayWhite" variant="subtitle">Capturer le Pokemon !</ThemedText>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    release: {
        alignItems:"center",
        paddingTop: 108,
    },
});