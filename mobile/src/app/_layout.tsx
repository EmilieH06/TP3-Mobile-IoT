import { AuthContextProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { Stack, router, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

function MainLayout() {
  const { isAuthenticated } = useAuth();
  const rootSegment = useSegments()[0];

  useEffect(() => {
    if (isAuthenticated === undefined) {
      return;
    } else if (isAuthenticated && rootSegment !== "(auth)") {
      //https://github.com/vercel/next.js/discussions/51527
      router.replace("/(auth)/(tabs)");
    } else if (!isAuthenticated && rootSegment === "(auth)") {
      router.replace("/vaults");
    }
  }, [isAuthenticated, rootSegment]);

  if (isAuthenticated === undefined) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <Stack>
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "Connexion",
          //https://stackoverflow.com/questions/75961091/react-native-headerbacktitlevisible-false-not-working-in-expo-sdk-48
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "S'inscrire",
          //https://stackoverflow.com/questions/75961091/react-native-headerbacktitlevisible-false-not-working-in-expo-sdk-48
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
