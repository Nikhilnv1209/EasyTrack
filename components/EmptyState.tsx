import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import Button from './Button'
import { router } from 'expo-router'

interface EmptyStateProps {
    title: string
    subtitle: string
}

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
    return (
        <View className='justify-center items-center px-3'>
            <View className='w-full mb-2 pr-2 h-52 items-center justify-center'>
                <Image source={images.empty}
                    className='w-full h-full'
                    resizeMode='center'
                />
            </View>
            <View>
                <Text className='text-xl font-pmedium text-center text-gray-100'>
                    {title}
                </Text>
                <Text className='text-sm text-center font-psemibold text-white mt-1'>
                    {subtitle}
                </Text>
            </View>

            <Button
                title='Create Video'
                handlePress={() => router.push("/create")}
                containerStyles='w-full my-5'
            />
        </View>
    )
}

export default EmptyState