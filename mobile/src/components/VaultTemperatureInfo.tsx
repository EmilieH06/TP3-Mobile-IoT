import { StyleSheet, Text, View } from "react-native";
import type { Temperature } from "../types/vault";

type Props = {
  temperature: Temperature;
};

export default function VaultTemperatureInfo({ temperature }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.textList}>
        Température : {temperature.temperature} °C
      </Text>

      <Text style={styles.textList}>
        Heure : {temperature.time}
      </Text>

      {temperature.outOfRange && (
        <Text style={styles.textListDanger}>
          Température hors limites!
        </Text>
      )}
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
  textListDanger: {
    padding: 4,
    color: "red"
  },
  title: {
    padding: 12,
    fontWeight: 700,
    fontSize: 20,
  },
});
