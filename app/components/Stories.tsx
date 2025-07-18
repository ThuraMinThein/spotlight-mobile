import { STORIES } from "@/constants/mock-data";
import { styles } from "@/styles/feed.style";
import { ScrollView } from "react-native";
import Story from "./Story";

const StoriesSession = () => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            horizontal
            style={styles.storiesContainer}
        >
            {
                STORIES.map((story) =>
                    <Story key={story.id} story={story} />
                )
            }
        </ScrollView>
    )
}

export default StoriesSession;