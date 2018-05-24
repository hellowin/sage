import React from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    isbn: null,
    items: [],
    error: null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  fetchIsbn(isbn) {
    // expose API Key here for testing, subject to change
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=AIzaSyC7I-Seo5oaYA-mtSOhqEpmoqqryrUeaYc`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((result) => {
        if (!result.items || !result.items.length) throw new Error("Can't fetch ISBN")
        this.setState({ isbn, items: result.items, error: null })
      })
      .catch(err => {
        this.setState({ isbn, items: [], error: err });
      })
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
              this.fetchIsbn(data)
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
                  <Text>{this.state.isbn}</Text>
                  {!this.state.error ? <Text>{this.state.items.map(item => item.volumeInfo.title + ' ')}</Text> : <Text>{this.state.error.toString()}</Text>}
                </View>
            </View>
          </Camera>
        </View>
      );
    }
  }
}