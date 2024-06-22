import { Account, AppwriteException, Avatars, Client, Databases, ID, Models, Query } from 'react-native-appwrite';

export interface User extends Models.Document {
    accountId: string;
    username: string;
    email: string;
    avatar: string;
}

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.android.shareai',
    projectID: '667071380036e913a040',
    databaseID: '66707b38000284cfcf2a',
    userCollectionID: '66707b53001b337bb3d8',
    videosCollectionID: '66707b7a001192295f88',
    storageID: '66707d0d000a53d9c21b',
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectID) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

// Register User
export const createUser = async (email: string, password: string, username: string): Promise<User> => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);

        if (!newAccount) {
            throw new Error('Failed to create user');
        }

        const avatarUrl = avatars.getInitials(username);
        await Signin(email, password);

        const newUser: User = await database.createDocument(
            config.databaseID,
            config.userCollectionID,
            ID.unique(),
            {
                accountId: newAccount.$id,
                username,
                email,
                avatar: avatarUrl
            },
        )

        return newUser;
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An Unknown error occurred');
        }
    }
}

export const Signin = async (email: string, password: string): Promise<Models.Session> => {
    try {
        const session: Models.Session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An Unknown error occurred');
        }
    }
}

export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await database.listDocuments(
            config.databaseID,
            config.userCollectionID,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw Error;
        return currentUser.documents[0] as User;

    } catch (error: unknown) {
        if (error instanceof AppwriteException) {
            if (error.code === 401) {
                return null;
            }
        }
        else {
            throw new Error('An Unknown error occurred');
        }
        return null;
    }
}