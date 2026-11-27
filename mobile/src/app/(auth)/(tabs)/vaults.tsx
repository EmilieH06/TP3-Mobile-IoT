import Header from "@/components/Header";
import VaultInfoCard from "@/components/VaultInfoCard";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { Vault, VaultState } from "@/types/vault";

export default function Vaults() {
  const isLoading = false;

  const vault1: Vault = {
    id: "a",
    name: "dawd",
    state: VaultState.Ouvert,
    code: 2345,
    temperature: 3456,
    time: "345esrd",
    userId: "2"
  }
  const vault2: Vault = {
    id: "adwa",
    name: "dawdwadawd",
    state: VaultState.Ferme,
    code: 6543,
    temperature: 76,
    time: "tg45g",
    userId: "3"
  }

  const vaults: Vault[] = [vault1, vault2]

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Header title="Coffres" />

        <FlatList
          data={vaults}
          style={styles.flatlistContainer}
          keyExtractor={(vault, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <VaultInfoCard vault={item}/>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    paddingTop: 8,
    backgroundColor: "#e3e3e3",
  },
  flatlistContainer: {
    //https://stackoverflow.com/questions/49426115/react-native-flatlist-not-scrolling
    height: 350,
  },
  loadingContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    padding: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#929292",
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
});
