import {AppRegistry} from 'react-native'
import React from 'react'
import {Provider} from 'react-redux'
import App from './src/scenes/App'
import configureStore from './src/store/store'
import {name as appName} from './app.json'
import { PersistGate } from 'redux-persist/lib/integration/react'

const {store, persistor} = configureStore()

const Application = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
)

AppRegistry.registerComponent(appName, () => Application);

