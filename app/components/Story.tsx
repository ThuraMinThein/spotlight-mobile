import { styles } from "@/styles/feed.style"
import { Image } from "expo-image"
import { Text, TouchableOpacity, View } from "react-native"

type StoryType = {
    id: string,
    username: string,
    avatar: string,
    hasStory: boolean
}

export default function Story({ story }: { story: StoryType }) {
    return (
        <TouchableOpacity style={styles.storyWrapper}>
            <View style={[styles.storyRing, !story.hasStory && styles.noStory]}>
                <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
            </View>
            <Text style={styles.storyUsername}>{story.username}</Text>
        </TouchableOpacity>
    )
}