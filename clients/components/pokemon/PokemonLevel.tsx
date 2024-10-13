import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  View,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { Audio } from "expo-av"; 
import { useThemeColors } from "@/hooks/useThemeColors";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { useState } from "react";
import { API_URL } from "@env" 

type Props = ViewProps & {
  index: number;
  color: string;
  level: number;
};

export function PokemonLevel({ style, level, color, index, ...rest }: Props) {
  const colors = useThemeColors();
  const [updateLevel, setUpdateLevel] = useState(level);

  const decreaseLevel = () => {
    setUpdateLevel((prevLevel) => Math.max(prevLevel - 1, 1));
  };

  const increaseLevel = () => {
    setUpdateLevel((prevLevel) => prevLevel + 1);
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
        require("@/assets/LevelUp.mp3"), {shouldPlay: true}
    );
    sound.playAsync();
};

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${API_URL}/team/${index}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ level: updateLevel }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du niveau");
      }
      Alert.alert("Succès", "Le niveau a été mis à jour avec succès.");
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Erreur lors de l'envoie des données");
    }
  };

  const levelUpPokemon = () => {
    playSound();
    handleUpdate();
  }

  return (
    <Row gap={64} style={styles.rows}>
      <Row gap={50}>
        <Pressable onPress={decreaseLevel}>
          <View style={[styles.levelModify, { backgroundColor: color }]}>
            <ThemedText style={{ color: "white" }} variant="subtitle1">
              -
            </ThemedText>
          </View>
        </Pressable>
        <ThemedText>{updateLevel}</ThemedText>
        <Pressable onPress={increaseLevel}>
          <View style={[styles.levelModify, { backgroundColor: color }]}>
            <ThemedText style={{ color: "white" }} variant="subtitle1">
              +
            </ThemedText>
          </View>
        </Pressable>
      </Row>
      <Pressable onPress={levelUpPokemon}>
        <View style={styles.validate}>
          <Image
            style={{ width: 15, height: 15 }}
            source={require("@/assets/images/check.png")}
          />
        </View>
      </Pressable>
    </Row>
  );
}

const styles = StyleSheet.create({
  levelModify: {
    width: 25,
    height: 25,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  validate: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
  rows: {
    alignSelf: "flex-end",
  },
});
