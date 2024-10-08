import { Image, StyleSheet, View, type ViewStyle } from "react-native"
import { Card } from "../Card"
import { ThemedText } from "../ThemedText"
import { useThemeColors } from "@/hooks/useThemeColors"

type Props = {
    style?: ViewStyle,
    id : number,
    name : string,
    image_url: string,
}

export function PokemonCard ({style, id, name, image_url}: Props) {
    const colors = useThemeColors()
    return <Card style={[style, styles.card]}>
        <ThemedText style={styles.id} variant="caption" color="grayMedium">#{id.toString().padStart(3,'0')}</ThemedText>
        <View style={[styles.shadow, {backgroundColor: colors.grayBackground}]}/>
        <Image source={{ uri: image_url }} style={styles.image} />
        <ThemedText>{name}</ThemedText>
    </Card>

}

const styles = StyleSheet.create({
    card: {
      alignItems: 'center',
      padding: 4,
      position: 'relative',

    },
    id: {
        alignSelf:'flex-end'
    },
    image: {
        width: 100, 
        height: 120,
    },
    shadow: {
        position: 'absolute',
        bottom: 0,
        left : 0,
        right : 0,
        height: 50,
        borderRadius: 7,
    },
})