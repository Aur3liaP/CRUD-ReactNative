import { Alert, Pressable, StyleSheet, View, type ViewProps, type ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";
import axios from "axios";
import { useCallback } from "react";

type Props = ViewProps & {
    index: number,
    name: string,
};


export function PokemonRelease({style, index, name, ...rest}: Props) {
    
    const handleDelete = useCallback(async () => {
        try {
          await axios.delete(
            `http://192.168.1.139:3310/api/team/${index}`
          );
          Alert.alert("Pokemon relaché", `Au revoir ${name} !`);
        } catch (error) {
          console.error("Erreur", "Il préfère rester !");
        }
      }, [index]);


    return (
        <View style={styles.release}>
            <Pressable onPress={handleDelete}>
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