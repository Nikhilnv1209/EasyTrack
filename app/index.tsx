import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className='h-full flex items-center justify-center'>
      <Text className='text-base font-pmedium'>This is the index page using expo router!</Text>
      <StatusBar style="auto" />
      <Link href={"/home"} className='text-blue-400 text-lg pt-4 underline'>Go to home</Link>
    </View>
  );
}

