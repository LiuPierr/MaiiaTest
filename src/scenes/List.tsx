import React from 'react'
import { Text, View} from 'react-native'
import api from "@api/api"

const List = () => {

    React.useEffect(() => {
        api.fetchList().then(res => {
            console.log("Fetch List result success ",res)
        }).catch(err => {
            console.log("Fetch List err ",err)
        })
    }, [])


    return (
        <View>
            <Text>Ceci est la page de la Liste</Text>
        </View>
    )
}

export default List