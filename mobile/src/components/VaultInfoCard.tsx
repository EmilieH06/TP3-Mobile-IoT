import { StyleSheet, Text, TouchableOpacity } from "react-native";
import type { Vault } from "../types/vault";
import { router } from "expo-router";

type Props = {
  vault: Vault;
};

export default function VaultInfo({ vault }: Props) {
  function onDetail() {
    router.push({
      pathname: "/vaults/[id]",
      params: { id: vault.id },
    })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onDetail}>
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
    </TouchableOpacity>
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
});
