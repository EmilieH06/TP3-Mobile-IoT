import Header from "@/components/Header";
import { StyleSheet, View } from "react-native";

export default function Journal() {
  return (
    <View style={styles.container}>
      <Header title="Journal" />
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
