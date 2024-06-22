import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import Button from '../components/Button';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvide';

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) { return <Redirect href={"/home"} /> }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full items-center justify-center h-[90vh] px-4'>
          <Image source={images.logo}
            className='w-[160px] h-[60px]'
            resizeMode='contain'
          />
          <Image source={images.cards}
            className='max-w-[380px] h-[270px]'
            resizeMode='contain'
          />
          <View className='relative mt-5'>
            <Text className='text-3xl text-center text-white font-bold'>
              Discover Endless Possibilities with <Text className='text-secondary-200'>ShareAI</Text>
            </Text>
            <Image source={images.path}
              className='w-[105px] h-[18px] absolute -bottom-3 -right-1 transform rotate-3'
              resizeMode='contain'
            />
          </View>

          <Text className='text-sm w-full font-pregular mt-10 text-gray-100 text-center'>
            Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with ShareAI.
          </Text>

          <Button
            title='Continue with Email'
            handlePress={() => router.push("/sign-in")}
            containerStyles='mt-6 w-[90%]'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

