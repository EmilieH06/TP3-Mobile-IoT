import { StyleSheet, Text, View } from "react-native";
import type { Vault } from "../types/vault";

type Props = {
  vault: Vault;
};

export default function VaultInfo({ vault }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Id: {vault.id} --- Nom: {vault.name}</Text>

      <Text style={styles.textList}>
        État: {vault.state}
      </Text>
      <Text style={styles.textList}>
        Température: {vault.temperature}
      </Text>
      <Text style={styles.textList}>
        Dernière modification: {vault.time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 2,
    padding: 8,
    backgroundColor: "#fefefe",
    alignItems: "center",
  },
  textList: {
    padding: 4,
  },
  title: {
    padding: 12,
    fontWeight: 700,
    fontSize: 20,
  },
  image: {
    width: "100%",
    height: 175,
    borderRadius: 10,
  },
});
