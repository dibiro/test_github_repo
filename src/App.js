// React

import React, { Component } from 'react'

// Style


// Navigation

import { NativeRouter, Route} from "react-router-native"

// Redux

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'

// Componest Containers

import Index from './container/Index'
import Home from './container/Home'
import Comments from './container/Comments'


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NativeRouter>
            <Route exact path="/" component={Index} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/comments" component={Comments} />
          </NativeRouter>
        </PersistGate>
      </Provider>
    )
  }
}