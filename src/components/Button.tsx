import * as React from 'react'
import {Pressable, StyleSheet, Text} from "react-native"

interface Props {
    onPress: () => {}
}

export const Button = ({ onPress }: Props) => {
    return (
        <Pressable onPress={onPress}
                   android_ripple={{
                   }}
                   style={({ pressed }) => [
                       {
                           backgroundColor: pressed
                               ? 'rgb(210, 230, 255)'
                               : '#fd6c9e'
                       },
                       styles.container
                   ]}>
            <Text style={styles.text}>I'm pressable!</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding : 15,
        borderRadius:25
    },
    text: {
        color:"white"
    },
})