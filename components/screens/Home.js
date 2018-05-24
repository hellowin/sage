import React from 'react'
import { Text, View, Button } from 'react-native'

export default Home = props => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome to Sage</Text>
        <Button
            title="Scan Barcode"
            onPress={() => props.navigation.navigate('Scanner')}
        />
        </View>
    );
}