import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="vaults"
        options={{
          title: "Coffres",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              //https://dev.to/ajmal_hasan/using-react-native-vector-icons-in-react-native-1bem
              //https://pictogrammers.com/library/mdi/
              name="key-variant"
              color={"#000000"}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="badges"
        options={{
          title: "Badges",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              //https://dev.to/ajmal_hasan/using-react-native-vector-icons-in-react-native-1bem
              //https://pictogrammers.com/library/mdi/
              name="badge-account"
              color={"#000000"}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              //https://dev.to/ajmal_hasan/using-react-native-vector-icons-in-react-native-1bem
              //https://pictogrammers.com/library/mdi/
              name="notebook"
              color={"#000000"}
              size={24}
            />
          ),
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
