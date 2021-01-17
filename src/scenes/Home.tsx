import * as React from 'react'
import {View, StyleSheet, Image} from "react-native"
import {Button} from "@components/Button"

interface Props {
    navigation: Navigation
}

const Home = ({navigation}: Props) => {

    const onPressHome = () => {
        navigation.navigate("List")
    }

    return (
        <View style={styles.appContainer}>
            <Image
                style={styles.logo}
                resizeMode={"contain"}
                source={require('../images/MaiiaLogo.png')}/>
            <Button onPress={onPressHome}/>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 200,
        height: 80,
        marginBottom: 25
    }
})