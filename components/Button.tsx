import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

interface ButtonProps {
    title: string,
    handlePress: () => void
    containerStyles?: string
    textStyles?: string
    isLoading?: boolean
}

const Button = ({title, handlePress, containerStyles, textStyles, isLoading}:ButtonProps) => {
  return (
    <TouchableOpacity 
        className={`bg-secondary-200 rounded-xl min-h-[58px] justify-center items-center ${containerStyles} 
        ${isLoading ? 'opacity-50' : ''}`}
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={isLoading}
    >    
        <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button