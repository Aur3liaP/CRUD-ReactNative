import { Alert, Pressable, StyleSheet, View, type ViewProps, type ViewStyle } from "react-native";
import { Audio } from "expo-av"; 
import { ThemedText } from "../ThemedText";
import axios from "axios";
import { useCallback } from "react";
import { API_URL } from "@env" 

type Props = ViewProps & {
    index: number,
    name: string,
};


export function PokemonRelease({style, index, name, ...rest}: Props) {
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
        require("@/assets/PokemonEscapeSound.mp3"), {shouldPlay: true}
    );
    sound.playAsync();
};

    const handleDelete = useCallback(async () => {
        try {
          await axios.delete(
            `${API_URL}/team/${index}`
          );
          Alert.alert("Pokemon relaché", `Au revoir ${name} !`);
        } catch (error) {
          console.error("Erreur", "Il préfère rester !");
        }
      }, [index]);

      const releasePokemon= () => {
        playSound();
        handleDelete();
      }


    return (
        <View style={styles.release}>
            <Pressable onPress={releasePokemon}>
                <ThemedText color="grayWhite" variant="subtitle">Relacher le Pokemon !</ThemedText>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    release: {
        alignItems:"center",
        paddingTop: 54,
    },
});