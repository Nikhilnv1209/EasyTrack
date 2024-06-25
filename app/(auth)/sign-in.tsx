import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import Button from '../../components/Button'
import { Link, router } from 'expo-router'
import { Signin, User, getCurrentUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvide'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isLoggedIn, setIsLoggedIn, setUser } = useGlobalContext();

  const submitForm = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields');
    }
    setIsSubmitting(true);
    try {
      if (!isLoggedIn) {
        await Signin(form.email, form.password);
        const user:User | null = await getCurrentUser();
        setIsLoggedIn(true);
        setUser(user);
      }
      Alert.alert('Success', 'Logged in successfully');
      router.replace('/home');
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An Unknown error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='min-h-[88vh] w-full items-start justify-center px-4 my-6'>
          <Image source={images.logo}
            className='w-[150px] h-[50px]'
            resizeMode='contain'
          />
          <Text className='text-2xl text-center text-white font-psemibold mt-3 mb-6'>
            Log in to ShareAI
          </Text>

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType='email-address'
            styles='mt-6'
            placeholder='Enter your email'
          />
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            styles='mt-6'
            placeholder='Enter your password'
          />

          <Button
            title='Sign In'
            containerStyles='mt-6 w-full'
            textStyles='text-lg'
            handlePress={submitForm}
            isLoading={isSubmitting}
          />

          <View className='flex-row items-center justify-center w-full gap-2 mt-6'>
            <Text className='text-gray-100 font-pmedium text-sm'>
              Don't have an account?
            </Text>
            <Link href={'/sign-up'} className='text-secondary-200 font-pmedium ml-1 text-sm'>
              SignUp
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn