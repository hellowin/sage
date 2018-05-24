import React from 'react'
import { Text, View, TouchableOpacity, TouchableHighlight, Button } from 'react-native'
import { Camera, Permissions } from 'expo'
import { getItems, setItems } from '../../infra/storage/fetched'
import { createStackNavigator } from 'react-navigation'

export default class Scanner extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    isbn: null,
    fromFetched: false,
    items: [],
    error: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async fetchIsbn(isbn) {
    try {
      const fetchedItems = await getItems(isbn)
      const items = fetchedItems
      if (items.length < 1) {
        // expose API Key here for testing, subject to change
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=AIzaSyC7I-Seo5oaYA-mtSOhqEpmoqqryrUeaYc`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        const result = await response.json()
        items = result.items
        if (!items || !items.length) throw new Error("Can't fetch ISBN")
        setItems(isbn, items)
        this.setState({ isbn, items, fromFetched: false, error: null })
      } else {
        this.setState({ isbn, items, fromFetched: true, error: null })
      }
    } catch (err) {
      this.setState({ isbn, items: [], fromFetched: false, error: err })
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            onBarCodeRead={({ type, data }) => {
              if (data != this.state.isbn) this.fetchIsbn(data)
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
                <View
                  style={{
                    flex: 1,
                    height: 100,
                    backgroundColor: 'white',
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  {this.state.items.length < 1 ? <Text>Scan a book's ISBN barcode</Text> : null}
                  <Text>{this.state.isbn}</Text>
                  {!this.state.error ? this.state.items.map((item, i) => <Text key={i}>{item.volumeInfo.title} </Text>) : <Text>{this.state.error.toString()}</Text>}
                  {this.state.fromFetched ? <Text>From cache</Text> : null}
                </View>
            </View>
          </Camera>
        </View>
      )
    }
  }
}