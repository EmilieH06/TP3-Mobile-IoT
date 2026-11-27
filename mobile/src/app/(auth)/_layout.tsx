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

      <Stack.Screen
        name="vaults/modify/[id]"
        options={{
          title: "Modifier le coffre",
          //https://stackoverflow.com/questions/75961091/react-native-headerbacktitlevisible-false-not-working-in-expo-sdk-48
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <Stack.Screen
        name="vaults/create"
        options={{
          title: "Ajouter un coffre",
          //https://stackoverflow.com/questions/75961091/react-native-headerbacktitlevisible-false-not-working-in-expo-sdk-48
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
