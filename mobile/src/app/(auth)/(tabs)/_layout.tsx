import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          //https://stackoverflow.com/questions/75961091/react-native-headerbacktitlevisible-false-not-working-in-expo-sdk-48
          headerBackButtonDisplayMode: "minimal",
          //https://github.com/react-navigation/react-navigation/issues/4069
          tabBarItemStyle: { display: "none" },
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          //https://www.geeksforgeeks.org/react-native/how-to-add-icons-at-the-bottom-of-tab-navigation-in-react-native/
          tabBarIcon: () => (
            <MaterialCommunityIcons
              //https://dev.to/ajmal_hasan/using-react-native-vector-icons-in-react-native-1bem
              //https://pictogrammers.com/library/mdi/
              name="account"
              color={"#000000"}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
