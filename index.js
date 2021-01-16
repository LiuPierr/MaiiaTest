import { AppRegistry } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import Home  from './src/scenes/Home'
import configureStore from './src/store/store'
import { name as appName } from './app.json'

const store = configureStore()

const App = () => (
    <Provider store={store}>
        <Home />
    </Provider>
)

AppRegistry.registerComponent(appName, () => App);

