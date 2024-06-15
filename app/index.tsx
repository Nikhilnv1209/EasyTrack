import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className='h-full flex items-center justify-center'>
      <Text>This is the index page using expo router!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

