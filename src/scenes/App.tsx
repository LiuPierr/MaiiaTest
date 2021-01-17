import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './Home'
import List from './List'


const Stack = createStackNavigator()

export default class App extends React.PureComponent {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                    />
                    <Stack.Screen
                        name="List"
                        component={List}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
