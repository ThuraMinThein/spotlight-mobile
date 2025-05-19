import { TokenCache } from "@clerk/clerk-expo";
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const createTokenCache = (): TokenCache => {
    return {
        getToken: async (key: string) => {
            try {
                const item = await SecureStore.getItemAsync(key)
                if (item) {
                    console.log(key)
                } else {
                    console.log('No values found under key: ', key)
                }
                return item
            } catch (err) {
                console.error('secure store get item error', err)
                await SecureStore.deleteItemAsync(key)
                return null
            }
        },
        saveToken: async (key, token) => {
            return SecureStore.setItemAsync(key, token)
        },
    }
}

export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined