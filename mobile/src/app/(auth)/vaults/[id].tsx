import VaultDetailInfoCard from "@/components/VaultDetailInfoCard";
import VaultTemperatureInfo from "@/components/VaultTemperatureInfo";
import { StyleSheet, View, FlatList, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { Temperature, Vault, VaultState } from "@/types/vault";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function VaultDetail() {
  const isLoading = false;
  const { id } = useLocalSearchParams<{ id: string }>();

  const vault: Vault = {
    id: "dawdwaa",
    name: "dawd",
    state: VaultState.Ouvert,
    code: "2345",
    temperature: 3456,
    time: "345esrd",
    userId: "2"
  }

  const temperature1: Temperature = {
    id: "me m,aarea",
    vaultId: "njskva",
    temperature: 56,
    time: "56et",
    outOfRange: true
  }
  const temperature2: Temperature = {
    id: "nfstygrgs",
    vaultId: "athargtha",
    temperature: 75,
    time: "r4et54",
    outOfRange: false
  }
  const temperatures: Temperature[] = [temperature1, temperature2]
  
  function onModify() {
    router.push({
      pathname: "/(auth)/vaults/modify/[id]",
      params: { id: vault.id },
    })
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <VaultDetailInfoCard vault={vault}/>

        <TouchableOpacity style={styles.button} onPress={onModify}>
          <Text style={styles.buttonText}>Modifier le coffre</Text>
        </TouchableOpacity>

        <FlatList
          data={temperatures}
          style={styles.flatlistContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <VaultTemperatureInfo temperature={item}/>
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
    paddingTop: 70,
    backgroundColor: "#e3e3e3",
  },
  flatlistContainer: {
    paddingTop: 4,
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
  button: {
    backgroundColor: "#23769f",
    padding: 12,
    marginTop: 4,
    marginBottom: 10,
    borderRadius: 10,
    margin: 5,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
