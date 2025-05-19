import { styles } from "@/styles/auth.style";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {

  return (
    <View style={styles.container}>
      <Link href={'/notification'}>TO notification</Link>
    </View>
  );
}
