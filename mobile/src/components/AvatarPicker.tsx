import { useAuth } from "@/hooks/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function AvatarPicker() {
  const { appUserAvatar,  changeAvatar } = useAuth();

  function onAvatarChange() {
    changeAvatar();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onAvatarChange}>
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
            size={200}
            style={styles.avatar}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 1000000000,
  },
  avatar: {
    borderRadius: 1000000000,
  },
});
