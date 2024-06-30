import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import useAppwrite, { Post } from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { posts, isloading, refetch } = useAppwrite(getAllPosts);
  const { posts: latestPosts} = useAppwrite(getLatestPosts);
  const onRefresh = async () => {
    setRefreshing(true);
    // refresh data
    await refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList<Post>
        data={posts}
        keyExtractor={(item) => item.$id.toString()}
        className="px-4"
        renderItem={({ item }) => (
          <VideoCard post={item} />
        )}
        ListHeaderComponent={() => {
          return (
            <View className="my-6 space-y-6">
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
                <Text className="text-lg font-pregular text-gray-200 mb-3">
                  Trending videos
                </Text>
                <Trending posts={latestPosts ?? []} />
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
