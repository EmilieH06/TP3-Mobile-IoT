import Header from "@/components/Header";
import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Header title="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: "#e3e3e3",
  },
});
