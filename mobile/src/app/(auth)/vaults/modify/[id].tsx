
import { useVault } from "@/hooks/useVault";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ModifyVault() {
  const { modifyVault } = useVault();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [tempMin, setTempMin] = useState<string>("");
  const [tempMax, setTempMax] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  async function onModifyVault() {
    if (
      name === "" ||
      code === "" ||
      tempMin === "" ||
      tempMax === ""
    ) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }
    
    //https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
    if (!/^\d+(\.\d+)?$/.test(tempMin) || !/^\d+(\.\d+)?$/.test(tempMax)) {
      Alert.alert("Erreur", "Les températures doivent être des nombres.");
      return;
    }

    setIsLoading(true);
    try {
      await modifyVault(id, name, code, Number(tempMin), Number(tempMax));
      router.back();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.cardInfoContainer}>
          <Text style={styles.label}>Nom du coffre</Text>
          <TextInput
            value={name}
            style={styles.textinput}
            placeholder="Nom du coffre"
            placeholderTextColor="grey"
            onChangeText={setName}
          />

          <Text style={styles.label}>Code d'ouverture</Text>
          <TextInput
            value={code}
            style={styles.textinput}
            placeholder="4 chiffres"
            placeholderTextColor="grey"
            onChangeText={setCode}
            maxLength={4}
          />

          <Text style={styles.label}>Température minimale (°C)</Text>
          <TextInput
            value={tempMin}
            style={styles.textinput}
            placeholder="Température minimale"
            placeholderTextColor="grey"
            onChangeText={setTempMin}
          />

          <Text style={styles.label}>Température maximale (°C)</Text>
          <TextInput
            value={tempMax}
            style={styles.textinput}
            placeholder="Température maximale"
            placeholderTextColor="grey"
            onChangeText={setTempMax}
          />

          <TouchableOpacity
            style={styles.modifyButton}
            onPress={onModifyVault}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? (
                <ActivityIndicator color="#000000" />
              ) : (
                <MaterialCommunityIcons
                  name="check"
                  color="#000000"
                  size={24}
                />
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    paddingTop: 70,
    backgroundColor: "#ffffff",
  },
  cardContainer: {
    padding: 4,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#929292",
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  cardInfoContainer: {
    padding: 12,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    width: "100%",
  },
  textinput: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginVertical: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#cdcdcd",
  },
  label: {
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  modifyButton: {
    marginTop: 4,
    backgroundColor: "#dba40c",
    marginLeft: 4,
    padding: 6,
    borderRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
