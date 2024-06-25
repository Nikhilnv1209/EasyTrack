import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts } from "../../lib/appwrite";
import { Models } from "react-native-appwrite";

export interface Post extends Models.Document {
  title: string;
  thumbnail: string;
  prompt: string;
  videourl: string;
  creator: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const allposts = await getAllPosts() as Post[];
        setPosts(allposts);
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert("Error", error.message);
        } else {
          Alert.alert("Error", "An error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [])

  console.log(posts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    // refresh data

    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList<Post>
        data={posts}
        keyExtractor={(item) => item.$id.toString()}
        className="px-4"
        renderItem={({ item }) => (
          <Text className="text-xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => {
          return (
            <View className="my-4 space-y-6">
              <View className="flex-row items-start justify-between">
                <View className="space-y-1">
                  <Text className="text-base font-pmedium text-gray-100">
                    Welcome Back
                  </Text>
                  <Text className="text-3xl font-psemibold text-white">
                    Nikhilnv
                  </Text>
                </View>
                <View className="mt-1.5">
                  <Image
                    source={images.logoSmall}
                    className="w-10 h-7"
                    resizeMode="contain"
                  />
                </View>
              </View>

              {/* Search Box to search for a video */}
              <SearchInput />

              {/* Trending videos component */}
              <View>
                <Text className="text-lg font-pregular text-gray-100">
                  Trending videos
                </Text>
                <Trending posts={posts ?? []} />
              </View>

            </View>
          );
        }}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first to upload a video!"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
