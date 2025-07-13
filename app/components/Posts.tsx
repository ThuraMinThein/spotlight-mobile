import { COLORS } from '@/constants/theme'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { styles } from '@/styles/feed.style'
import { Ionicons } from '@expo/vector-icons'
import { useMutation } from 'convex/react'
import { formatDistanceToNow } from 'date-fns'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import CommentsModal from './CommentsModal'

type PostProps = {
    post: {
        _id: Id<"posts">;
        imageUrl: string;
        caption?: string;
        likes: number;
        comments: number;
        _creationTime: number;
        isLiked: boolean;
        isBookMarked: boolean;
        isOwner: boolean;
        author: {
            _id: Id<"users">;
            username: string;
            image: string;
        }
    }

}

export default function Posts({ post }: PostProps) {

    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [commentCount, setCommentCount] = useState(post.comments);
    const [showComment, setShowComment] = useState(false);
    const [isBookMarked, setIsBookMarked] = useState(post.isBookMarked);

    const toggleLike = useMutation(api.posts.toggleLike);
    const toggleBookmark = useMutation(api.bookmarks.toggleBookmark);
    const deletePost = useMutation(api.posts.deletePost);

    // const { user } = useUser();

    // const currentUser = useQuery(api.users.getUserByClerkId, user ? { clerkId: user?.id } : 'skip');

    const handleLike = async () => {
        try {
            const liked = await toggleLike({ postId: post._id })
            setIsLiked(liked);
            setLikeCount((prev) => prev + (liked ? 1 : -1));
        } catch (error) {
            console.log("like post error: ", error);
        }
    }

    const handleBookmarks = async () => {
        const newIsBookmark = await toggleBookmark({ postId: post._id });

        setIsBookMarked(newIsBookmark);
    }

    const handleDelete = async () => {
        try {
            await deletePost({ postId: post._id });
        } catch (error) {
            console.log("delete post error: ", error);
        }
    }

    return (
        <View style={styles.post}>
            <View style={styles.postHeader}>
                <Link href={
                    post.isOwner ? '/(tabs)/profile' : `/user/${post.author._id}`
                } asChild>
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

                {post.isOwner ?
                    <TouchableOpacity onPress={handleDelete}>
                        <Ionicons name='trash-outline' size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity>
                        <Ionicons name='ellipsis-horizontal' size={20} color={COLORS.white} />
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
                    <TouchableOpacity onPress={handleLike}>
                        <Ionicons
                            name={isLiked ? 'heart' : 'heart-outline'}
                            size={24}
                            color={isLiked ? COLORS.primary : COLORS.white} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowComment(true)}>
                        <Ionicons name='chatbubble-outline' size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleBookmarks}>
                    <Ionicons name={isBookMarked ? 'bookmark' : 'bookmark-outline'} size={24} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            <View style={styles.postInfo}>
                <Text style={styles.likesText}>{likeCount === 0 ? "Be the first to like" : `${likeCount} likes`}</Text>
                {post.caption && (
                    <View style={styles.captionContainer}>
                        <Text style={styles.captionUsername}>{post.author.username}:</Text>
                        <Text style={styles.captionText}>{post.caption}</Text>
                    </View>
                )}

                {commentCount > 0 &&
                    <TouchableOpacity onPress={() => setShowComment(true)}>
                        <Text style={styles.commentsText}>View {commentCount} comments</Text>
                    </TouchableOpacity>
                }

                <Text style={styles.timeAgo}>
                    {formatDistanceToNow(post._creationTime, { addSuffix: true })}
                </Text>
            </View>

            <CommentsModal
                postId={post._id}
                visible={showComment}
                onClose={() => setShowComment(false)}
                onCommentAdded={() => setCommentCount(prev => prev + 1)}
            />


        </View>
    )
}