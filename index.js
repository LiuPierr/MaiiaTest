import { AppRegistry } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import App from './src/scenes/App'
import configureStore from './src/store/store'
import { name as appName } from './app.json'

const store = configureStore()

const Application = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Application);

