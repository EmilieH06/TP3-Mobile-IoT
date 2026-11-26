import { useAuth } from "@/hooks/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AvatarOptions() {
  const { logout, appUserAvatar } = useAuth();

  const [isOpen, setOpen] = useState(false);

  function onProfile() {
    setOpen(false);

    router.push({
      pathname: "/(auth)/(tabs)/profile",
    });
  }

  function onLogout() {
    setOpen(false);
    logout();
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(!isOpen)}>
        {appUserAvatar?.avatar && (
          <Image
            //https://reactnative.dev/docs/image
            source={{ uri: appUserAvatar.avatar }}
            style={styles.image}
          />
        )}
        {!appUserAvatar?.avatar && (
          <MaterialCommunityIcons
            //https://dev.to/ajmal_hasan/using-react-native-vector-icons-in-react-native-1bem
            //https://pictogrammers.com/library/mdi/
            name="account-circle"
            color={"#000000"}
            size={24}
            style={styles.avatar}
          />
        )}
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.item} onPress={onProfile}>
            <Text>Mon profil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={onLogout}>
            <Text style={styles.logoutText}>
              Déconnexion
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  //https://stackoverflow.com/questions/31101445/in-react-native-how-do-i-put-a-view-on-top-of-another-view-with-part-of-it-lyi
  menu: {
    position: "absolute",
    marginTop: 36,
    width: 180,
    padding: 6,
    right: -8,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#919191",
    borderRadius: 8,

    zIndex: 100,
  },

  item: {
    padding: 12,
    justifyContent: "center",
  },

  logoutText: {
    color: "#ab0000",
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 1000000000,
  },
  avatar: {
    borderRadius: 1000000000,
  },
});
