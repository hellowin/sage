import { AsyncStorage } from 'react-native'
import _ from 'lodash'

export const getAllFetched = async () => {
    try {
        const allFetchedString = await AsyncStorage.getItem('fetched')
        return JSON.parse(allFetchedString)
    } catch (err) {
        console.error(err)
        return {}
    }
}

export const getAllFetchedItems = async () => {
    try {
        const allFetched = await getAllFetched()
        const items = []
        const fetcheds = _.map(allFetched, fetchedItems => {
            if (_.isArray(fetchedItems)) items.push(...fetchedItems)
        })
        return items
    } catch (err) {
        console.error(err)
        return []
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
