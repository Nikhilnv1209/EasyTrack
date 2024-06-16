import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className='h-full flex items-center justify-center'>
      <Text className='text-xl font-pmedium px-3 py-3 border border-black rounded-lg mx-12'>This is the index page using expo router!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

