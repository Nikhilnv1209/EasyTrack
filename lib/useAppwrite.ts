import { Models } from 'react-native-appwrite';
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export interface Post extends Models.Document {
    title: string;
    thumbnail: string;
    prompt: string;
    videourl: string;
    creator: {
        username: string;
        avatar: string;
    };
}

const useAppwrite = (fn: Function) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isloading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const allposts: Post[] = await fn();
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
    useEffect(() => {
        fetchData();
    }, [])

    const refetch = () => fetchData();

    return { posts, isloading, refetch };
}

export default useAppwrite;