import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants'

const TabIcon = ({ icon, name, focused, color }: {
  icon: ImageSourcePropType,
  name: string,
  focused: boolean,
  color: string
}) => {
  return (
    <View className='justify-center items-center gap-2'>
      <Image source={icon} resizeMode='contain' tintColor={color} className='w-5 h-5' />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color}}
      >{name}</Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 70,
          }
        }}
      >
        <Tabs.Screen name='home' options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.home} name='Home' focused={focused} color={color} />
          )
        }} />
        <Tabs.Screen name='bookmarks' options={{
          title: 'Bookmarks',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.bookmark} name='Bookmarks' focused={focused} color={color} />
          )
        }} />
        <Tabs.Screen name='create' options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.plus} name='Create' focused={focused} color={color} />
          )
        }} />
        <Tabs.Screen name='profile' options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.profile} name='Profile' focused={focused} color={color} />
          )
        }} />
      </Tabs>
    </>
  )
}

export default TabsLayout