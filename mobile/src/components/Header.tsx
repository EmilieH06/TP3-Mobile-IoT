import { useAuth } from "@/hooks/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AvatarOptions from "./AvatarOptions";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  const { isAuthenticated } = useAuth();

  function onLogin() {
    router.push({
      pathname: "/login",
    });
  }

  function onVault() {
    if (isAuthenticated) {
      router.push({
        pathname: "/(auth)/(tabs)/vaults",
      });
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onVault}>
        <MaterialCommunityIcons
          //https://dev.to/ajmal_hasan/using-react-native-vector-icons-in-react-native-1bem
          //https://pictogrammers.com/library/mdi/
          name="home"
          color={"#000000"}
          size={24}
        />
      </TouchableOpacity>

      <Text style={styles.titleText}>{title}</Text>

      {isAuthenticated && <AvatarOptions />}
      {!isAuthenticated && (
        <TouchableOpacity onPress={onLogin}>
          <Text style={styles.loginButtonText}>Se connecter</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#e3e3e3",
  },
  loginButton: {
    backgroundColor: "#23769f",
    padding: 14,
    marginTop: 4,
    marginBottom: 10,
    borderRadius: 10,
  },
  loginButtonText: {
    color: "#3a97d5",
    fontWeight: "bold",
  },
  titleText: {
    fontWeight: "bold",
  },
  avatar: {
    borderColor: "#9b9a9a",
    borderWidth: 1,
    backgroundColor: "#cecdcd",
    borderRadius: 1000000000,
  },
});
