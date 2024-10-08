import { StyleSheet, Text, View } from "react-native";

export default function MyPoke() {
  return (
    <View
      style={styles.container}
    >
      <Text>MyPoke.</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:24}
})
