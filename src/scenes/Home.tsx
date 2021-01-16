import * as React from 'react'
import { View, StyleSheet, Image} from "react-native"
import { Button } from "../components/Button"

export default class Home extends React.PureComponent<void, void> {

    onPressHome = () => {
    }

    render() {
        return (
            <View style={styles.appContainer}>
                <Image
                    style={styles.logo}
                    resizeMode={"contain"}
                    source={require('../images/MaiiaLogo.png')}/>
                    <Button onPress={this.onPressHome}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: "50%",
        height:"50%"
    }
})