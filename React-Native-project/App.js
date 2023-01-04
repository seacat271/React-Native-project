import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
const BcgImage = require("./assets/images/Photo-BG.jpg");

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={BcgImage} style={styles.bcgImage}>
        <RegistrationScreen />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bcgImage: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
});
