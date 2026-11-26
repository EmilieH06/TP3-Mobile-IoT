import Header from "@/components/Header";
import VaultInfoCard from "@/components/VaultInfoCard";
import { StyleSheet, View } from "react-native";
import { Vault } from "@/types/vault";

export default function Vaults() {
  const vault: Vault = {
    id: "a",
    name: "dawd",
    state: "eafe",
    code: 2345,
    temperature: 3456,
    time: "345esrd",
    userId: "2"
  }

  return (
    <View style={styles.container}>
      <Header title="Coffres" />

      <VaultInfoCard vault={vault}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    paddingTop: 8,
    backgroundColor: "#e3e3e3",
  },
});
