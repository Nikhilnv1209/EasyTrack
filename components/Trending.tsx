import { Text, FlatList, TouchableOpacity, ImageBackground, Image, ViewToken } from 'react-native'
import React, { useState } from 'react'
import { Post } from '../lib/useAppwrite'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'

interface TrendingProps {
    posts: Array<Post>
}

const zoomIn = {
    0: {
        scale: 0.9,
    },
    1: {
        scale: 1,
    },
};

const zoomOut = {
    0: {
        scale: 1,
    },
    1: {
        scale: 0.9,
    },
};

const TrendingItem = ({ activeItem, item }: { activeItem: string, item: Post }) => {
    const [play, setPlay] = useState(false);
    return (
        <Animatable.View
            className='mr-2'
            // @ts-ignore
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (
                <Text className='text-white'>
                    playing
                </Text>
            ) : (
                <TouchableOpacity className='relative justify-center items-center' 
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    >
                    <ImageBackground
                        source={{ uri: item.thumbnail }}
                        className='w-40 h-60 rounded-[30px] my-5 overflow-hidden shadow-lg shadow-black/40'
                        resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className='w-10 h-10 absolute opacity-90'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    )
}

const Trending = ({ posts }: TrendingProps) => {
    const [activeItem, setActiveItem] = useState<string>("");

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken<Post>[] }) => {
        setActiveItem(viewableItems[0].key);
    }
    
    return (
        <FlatList<Post>
            data={posts}
            keyExtractor={(item) => item.$id.toString()}
            renderItem={({ item }) => (
                <TrendingItem
                    activeItem={activeItem}
                    item={item}
                />
            )}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70
            }}
            contentOffset={{ x: 80, y: 0}}
            horizontal
        />
    )
}

export default Trending