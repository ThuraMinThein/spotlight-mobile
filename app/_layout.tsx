import { COLORS } from "@/constants/theme";
import ClerkAndConvexProviders from "@/providers/ClerkAndConvexProviders";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from "./components/initialLayout";

export default function RootLayout() {
  return (
    <ClerkAndConvexProviders>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkAndConvexProviders>
  )
}
