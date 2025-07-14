import { tokenCache } from '@/cache';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import React from 'react';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
});

const publishedKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishedKey) {
    throw new Error('Missing Expo Public Key')
}


const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryKeyHashFn: convexQueryClient.hashFn(),
            queryFn: convexQueryClient.queryFn(),
        },
    },
});
convexQueryClient.connect(queryClient);

export default function ClerkAndConvexProviders({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider publishableKey={publishedKey} tokenCache={tokenCache}>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <ClerkLoaded>
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>
                </ClerkLoaded>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}