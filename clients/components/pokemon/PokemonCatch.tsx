import { Animated, Alert, Pressable, StyleSheet, View, Image, Easing, type ViewProps} from "react-native";
import { Audio } from "expo-av"; 
import { ThemedText } from "../ThemedText";
import axios from "axios";
import {  useState, useCallback, useRef } from "react";

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
    const [isCatching, setIsCatching] = useState(false); // Pour déclencher l'animation
    const pokeballPosition = useRef(new Animated.Value(0)).current; // Position de l'animation

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require("@/assets/PokeballSound3.mp3"), {shouldPlay: true}
        );
        sound.playAsync();
    };
    
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

      const startPokeballAnimation = () => {
        playSound(); 
        setIsCatching(true);
        Animated.timing(pokeballPosition, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.bezier(0.22, 1, 0.36, 1),
        }).start(() => {
            setIsCatching(false);
            handleCatch(); 
        });
    };

    const pokeballStyle = {
        transform: [
            {
                translateY: pokeballPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -300], 
                }),
            },
                    {
            translateX: pokeballPosition.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 50, 0], 
            }),
        },
            {
                scale: pokeballPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.2], 
                }),
            },
            {
                rotate: pokeballPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                }),
            },
        ],
    };


    return (
        <View style={styles.release}>
            <Pressable onPress={startPokeballAnimation}>
                <ThemedText color="grayWhite" variant="subtitle">Capturer le Pokemon !</ThemedText>
            </Pressable>

            {isCatching && (
                <Animated.View style={[styles.pokeball, pokeballStyle]}>
                    <Image
                        source={require("@/assets/images/PokeRocket.webp")} 
                        style={{ width: 150, height: 150 }}
                    />
                </Animated.View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    release: {
        alignItems:"center",
        paddingTop: 108,
    },
    pokeball: {
        position: "absolute", 
        bottom: 100, 
        left: "50%",
        marginLeft: -50,
    },
});