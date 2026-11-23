import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function onLogin() {
    login(email.trim(), password.trim());
  }

  function onRegister() {
    router.push({
      pathname: "/register",
    });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholderTextColor="grey"
        placeholder="Adresse courriel"
        onChangeText={setEmail}
      >
        {email}
      </TextInput>
      <TextInput
        style={styles.textInput}
        placeholderTextColor="grey"
        placeholder="Mot de passe"
        onChangeText={setPassword}
      >
        {password}
      </TextInput>

      <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
        <Text style={styles.loginButtonText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={onRegister}>
        <Text style={styles.loginButtonText}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#e3e3e3",
    marginTop: 70,
  },
  loginButton: {
    backgroundColor: "#23769f",
    padding: 14,
    marginTop: 4,
    marginBottom: 10,
    borderRadius: 10,
  },
  loginButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  textInput: {
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#cdcdcd",
  },
});
