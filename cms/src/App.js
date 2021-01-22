import React, { Component } from 'react'
import IndexRouter from './router'
import {Provider} from 'react-redux'
import store from './redux/store'
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <IndexRouter/>
      </Provider>

    )
  }
}
