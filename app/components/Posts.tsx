import { COLORS } from '@/constants/theme'
import { styles } from '@/styles/feed.style'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function Posts({ post }: { post: any }) {
    return (
        <View style={styles.post}>
            <View style={styles.postHeader}>
                <Link href={'/(tabs)'}>
                    <TouchableOpacity style={styles.postHeaderLeft}>
                        <Image
                            source={{ uri: post.author.image }}
                            style={styles.postAvatar}
                            contentFit='cover'
                            transition={200}
                            cachePolicy='memory-disk'
                        />
                        <Text style={styles.postUsername}>{post.author.username}</Text>
                    </TouchableOpacity>
                </Link>

                {post.isOwn ?
                    <TouchableOpacity>
                        <Ionicons name='ellipsis-horizontal' size={20} color={COLORS.white} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity>
                        <Ionicons name='trash-outline' size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                }
            </View>

            <Image
                source={post.imageUrl}
                style={styles.postImage}
                contentFit='cover'
                transition={200}
                cachePolicy='memory-disk'
            />

            <View style={styles.postActions}>
                <View style={styles.postActionsLeft}>
                    <TouchableOpacity>
                        <Ionicons name='heart-outline' size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='chatbubble-outline' size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Ionicons name='bookmark-outline' size={24} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            <View style={styles.postInfo}>
                <Text style={styles.likesText}>{post.likes === 0 ? "Be the first to like" : `${post.like} likes`}</Text>
                {post.caption && (
                    <View style={styles.captionContainer}>
                        <Text style={styles.captionUsername}>{post.author.username}:</Text>
                        <Text style={styles.captionText}>{post.caption}</Text>
                    </View>
                )}

                <TouchableOpacity>
                    <Text style={styles.commentsText}>View all {post.comments} comments</Text>
                </TouchableOpacity>
                <Text style={styles.timeAgo}>{post.createdAt}</Text>

            </View>


        </View>
    )
}