import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.style";
import { useAuth } from "@clerk/clerk-expo";
import { convexQuery } from "@convex-dev/react-query";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { Loader } from "../components/Loader";
import Posts from "../components/Posts";
import StoriesSession from "../components/Stories";

// youtube => 5:24:30

export default function Index() {
  const { signOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery(
    convexQuery(api.posts.getFeedPosts, {})
  );

  if (isLoading) return <Loader />;
  if (!posts) return <NoPostsFound />;

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spotlight</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => <Posts post={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListHeaderComponent={<StoriesSession />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      />

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