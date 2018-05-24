import React from 'react'
import { createStackNavigator } from 'react-navigation'
import Scanner from './components/screens/Scanner'
import Home from './components/screens/Home'

const Root = createStackNavigator(
  {
    Home,
    Scanner,
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