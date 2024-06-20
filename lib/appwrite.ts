import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

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
export const createUser = async (email: string, password: string, username: string) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);

        if (!newAccount) {
            throw new Error('Failed to create user');
        }

        const avatarUrl = avatars.getInitials(username);
        await Signin(email, password);

        const newUser = await database.createDocument(
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

export const Signin = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
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