import { COLORS } from '@/constants/theme'
import { api } from '@/convex/_generated/api'
import { styles } from '@/styles/feed.style'
import { useQuery } from 'convex/react'
import { Image } from 'expo-image'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Loader } from '../components/Loader'

export default function Bookmarks() {

    const bookmarkPosts = useQuery(api.bookmarks.getBookmarkedPosts)

    if (bookmarkPosts === undefined) return <Loader />;

    if (bookmarkPosts.length === 0) return <NoBookmarksFound />;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Bookmarks</Text>
            </View>

            <ScrollView
                contentContainerStyle={{
                    padding: 8,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}
            >
                {bookmarkPosts.map((post) => {
                    if (!post) return null;
                    return (
                        <View key={post._id}>
                            <Image
                                source={post.imageUrl}
                                style={{ width: '100%', aspectRatio: 1 }}
                                contentFit='cover'
                                transition={200}
                                cachePolicy='memory-disk'
                            />
                        </View>
                    )
                })}

            </ScrollView>
        </View>
    )
}

function NoBookmarksFound() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.background,
            }}
        >
            <Text style={{ color: COLORS.primary, fontSize: 22 }}>No bookmarked posts yet</Text>
        </View>
    )
}