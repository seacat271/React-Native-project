import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
const BcgImage = require("./assets/images/Photo-BG.jpg");

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={BcgImage}
        style={styles.bcgImage}
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bcgImage: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
});
