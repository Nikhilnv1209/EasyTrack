import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Post } from '../app/(tabs)/home'

interface TrendingProps {
    posts: Array<Post>
}

const Trending = ({ posts }: TrendingProps) => {
    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <Text className='text-xl text-white'>{item.id}</Text>
            )}
            horizontal
        />
    )
}

export default Trending