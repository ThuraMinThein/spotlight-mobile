import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.style";
import { formatDistanceToNow } from "date-fns";
import { Image, Text, View } from "react-native";

interface CommentProps {
    user: {
        fullname: string | undefined;
        image: string | undefined;
    };
    _id: Id<"comments">;
    _creationTime: number;
    postId: Id<"posts">;
    userId: Id<"users">;
    comment: string;
}

export default function Comment({ comment }: { comment: CommentProps }) {
    return (
        <View>
            <Image source={{ uri: comment.user.image }} style={styles.commentAvatar} />
            <View>
                <Text style={styles.commentUsername}>{comment.user.fullname}</Text>
                <Text style={styles.commentText}>{comment.comment}</Text>
                <Text style={styles.commentTime}>
                    {formatDistanceToNow(comment._creationTime, { addSuffix: true })}
                </Text>
            </View>
        </View>
    )
}