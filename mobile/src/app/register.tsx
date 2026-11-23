import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AvatarPicker from "@/components/AvatarPicker";

export default function Register() {
  const { register } = useAuth();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  function onRegister() {
    register(
      firstName.trim(),
      lastName.trim(),
      email.trim(),
      password.trim(),
      passwordConfirmation.trim(),
    );
  }
  return (
    <View style={styles.container}>
      <AvatarPicker/>

      <TextInput
        style={styles.textInput}
        placeholderTextColor="grey"
        placeholder="Prénom"
        onChangeText={setFirstName}
      >
        {firstName}
      </TextInput>
      <TextInput
        style={styles.textInput}
        placeholderTextColor="grey"
        placeholder="Nom de famille"
        onChangeText={setLastName}
      >
        {lastName}
      </TextInput>
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
        secureTextEntry={true}
      >
        {password}
      </TextInput>
      <TextInput
        style={styles.textInput}
        placeholderTextColor="grey"
        placeholder="Confirmation du mot de passe"
        onChangeText={setPasswordConfirmation}
        secureTextEntry={true}
      >
        {passwordConfirmation}
      </TextInput>

      <TouchableOpacity style={styles.loginButton} onPress={onRegister}>
        <Text style={styles.loginButtonText}>S'inscrire</Text>
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
