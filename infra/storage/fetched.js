import { AsyncStorage } from 'react-native'

export const getAllFetched = async () => {
    try {
        const allFetchedString = await AsyncStorage.getItem('fetched')
        return JSON.parse(allFetchedString)
    } catch (err) {
        console.error(err)
        return {}
    }
}

export const getItems = async (isbn) => {
    try {
        const allFetched = await getAllFetched()
        return allFetched[isbn] || []
    } catch (err) {
        console.error(err)
        return []
    }
}

export const setItems = async (isbn, items) => {
    try {
        const allFetched = await getAllFetched()
        allFetched[isbn] = items
        const allFetchedString = JSON.stringify(allFetched)
        await AsyncStorage.setItem('fetched', allFetchedString)
    } catch (err) {
        console.error(err)
    }
}
