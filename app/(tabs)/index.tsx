import { STORIES } from "@/constants/mock-data";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.style";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Loader } from "../components/Loader";
import Posts from "../components/Posts";
import Story from "../components/Story";

export default function Index() {
  const { signOut } = useAuth();

  const posts = useQuery(api.posts.getFeedPosts);

  if (posts === undefined) return <Loader />;
  if (posts === null) return <NoPostsFound />;

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spotlight</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >

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

        {
          posts?.map((post) =>
            <Posts key={post._id} post={post} />
          )
        }

      </ScrollView>

    </View>
  );
}

const NoPostsFound = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "500", color: COLORS.primary }}>No posts found</Text>
    </View>
  )
}