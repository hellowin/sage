import React from 'react'
import { Text, View, Button } from 'react-native'
import { getAllFetchedItems } from '../../infra/storage/fetched'

export default class Scanned extends React.Component {

    state = {
        fetchedItems: [],
    }

    async componentDidMount() {
        const fetchedItems = await getAllFetchedItems()
        this.setState({ fetchedItems })
    }

    render() {
        const { fetchedItems } = this.state
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {fetchedItems.map((item, i) => <Text key={i}>{item.volumeInfo.title}</Text>)}
            </View>
        )
    }

}