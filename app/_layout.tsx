import { COLORS } from "@/constants/theme";
import ClerkAndConvexProviders from "@/providers/ClerkAndConvexProviders";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { SplashScreen } from "expo-router";
import { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from "./components/initialLayout";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [fontLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded) await SplashScreen.hideAsync();
  }, [fontLoaded])

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync("#000000")
      NavigationBar.setButtonStyleAsync("light")
    }
  }, [])

  return (
    <ClerkAndConvexProviders>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }} onLayout={onLayoutRootView}>
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkAndConvexProviders>
  )
}
