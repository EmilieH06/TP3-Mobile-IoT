import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="vaults/[id]"
        options={{
          title: "Détails du coffre",
          //https://stackoverflow.com/questions/75961091/react-native-headerbacktitlevisible-false-not-working-in-expo-sdk-48
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
