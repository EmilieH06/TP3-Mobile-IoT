import { StyleSheet, Text, View } from "react-native";
import type { Vault } from "../types/vault";

type Props = {
  vault: Vault;
};

export default function VaultDetailInfo({ vault }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Id: {vault.id} --- Nom: {vault.name}</Text>
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
  title: {
    padding: 12,
    fontWeight: 700,
    fontSize: 20,
  },
});
