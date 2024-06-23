import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'


const SearchInput = () => {
  return (
    <View className='mt-6 mb-3 h-16 bg-black-100 px-3 rounded-2xl focus:border-secondary items-center flex-row'>
      <TextInput
        className='text-white mt-0.5 flex-1 font-pregular text-base'
        value={""}
        placeholder="Search for a video topic"
        onChangeText={() => { }}
        placeholderTextColor={"#7b7b8b"}
      />

      <TouchableOpacity>
        <Image
          source={icons.search}
          className='w-[18px] h-[18px]'
          resizeMode='contain' 
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput