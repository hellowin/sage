import React from 'react'
import { createStackNavigator } from 'react-navigation'
import Home from './components/screens/Home'
import Scanner from './components/screens/Scanner'
import Scanned from './components/screens/Scanned'

const Root = createStackNavigator(
  {
    Home,
    Scanner,
    Scanned,
  },
  {
    initialRouteName: 'Home',
  }
)

export default class App extends React.Component {
  render() {
    return <Root />;
  }
}