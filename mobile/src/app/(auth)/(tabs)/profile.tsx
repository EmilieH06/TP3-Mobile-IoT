import Header from "@/components/Header";
import AvatarPicker from "@/components/AvatarPicker";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const { appUser, logout, changeAvatar, updateUserPassword } = useAuth();

  const [isChangingPassword, setChangePassword] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  function onPasswordChange() {
    const trimmedOldPassword = oldPassword.trim();
    const trimmedNewPassword = newPassword.trim();
    const trimmedConfirmNewPassword = confirmNewPassword.trim();

    if (
      trimmedOldPassword !== "" ||
      trimmedNewPassword !== "" ||
      trimmedConfirmNewPassword !== ""
    ) {
      if (
        trimmedOldPassword !== "" &&
        trimmedNewPassword !== "" &&
        trimmedConfirmNewPassword !== ""
      ) {
        updateUserPassword(
          trimmedOldPassword,
          trimmedNewPassword,
          trimmedConfirmNewPassword,
        );

        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        Alert.alert("Votre mot de passe est requis.");
        return;
      }
    }
    setChangePassword(!isChangingPassword);
  }

  return (
    <View style={styles.container}>
      <Header title={"Mon Profil"} />

      <ScrollView
      //https://reactnative.dev/docs/scrollview
      >
        <View style={styles.profileContainer}>
          <AvatarPicker/>

          <Text style={styles.title}>
            {appUser?.firstName} {appUser?.lastName}
          </Text>

          {isChangingPassword && (
            <View style={styles.formContainer}>
              <TextInput
                value={oldPassword}
                style={styles.textinput}
                placeholderTextColor="grey"
                placeholder="Ancien mot de passe"
                onChangeText={setOldPassword}
                secureTextEntry={true}
              />
              <TextInput
                value={newPassword}
                style={styles.textinput}
                placeholderTextColor="grey"
                placeholder="Nouveau mot de passe"
                onChangeText={setNewPassword}
                secureTextEntry={true}
              />
              <TextInput
                value={confirmNewPassword}
                style={styles.textinput}
                placeholderTextColor="grey"
                placeholder="Confirmation du mot de passe"
                onChangeText={setConfirmNewPassword}
                secureTextEntry={true}
              />
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={onPasswordChange}>
            <Text style={styles.buttonText}>
              Changer son mot de passe
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.buttonText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    paddingTop: 16,
    backgroundColor: "#e3e3e3",
  },
  profileContainer: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "600",
  },
  description: {
    marginTop: 20,
    fontSize: 16,
  },
  item: {
    padding: 12,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#23769f",
    padding: 14,
    marginTop: 10,
    borderRadius: 10,
    width: "90%",
  },
  logoutButton: {
    backgroundColor: "#cc4c21",
    padding: 14,
    marginTop: 10,
    borderRadius: 10,
    width: "90%",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  textinput: {
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#cdcdcd",
    width: "85%",
  },
});
