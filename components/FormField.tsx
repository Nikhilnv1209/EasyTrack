import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'

interface FormFieldProps {
  title: string,
  value: string,
  handleChangeText: (e: string) => void
  styles?: string
  keyboardType?: string
  placeholder?: string,
}

const FormField = ({ title, value, handleChangeText, keyboardType, styles, placeholder }: FormFieldProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <View className={`space-y-2 w-full ${styles}`}>
      <Text className='text-gray-100 text-lg font-pmedium'>{title}</Text>
      <View className='h-16 bg-black-100 px-4 rounded-2xl focus:border-secondary items-center flex-row'>
        <TextInput
          className='relative flex-1 text-white font-psemibold text-base w-full'
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          placeholderTextColor={"#7b7b8b"}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {
          title === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image source={!showPassword ? icons.eye : icons.eyeHide}
                className='w-6 h-6'
                resizeMode='contain'
              />
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  )
}

export default FormField