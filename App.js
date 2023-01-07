import { useFonts } from "expo-font";
import {
  StyleSheet,
  Dimensions,
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useEffect, useState } from "react";
import { RegistrationScreen } from "./src/Screens/RegistrationScreen";
import { LoginScreen } from "./src/Screens/LoginScreen";
const BcgImage = require("./assets/images/Photo-BG.jpg");

export default function App() {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const initialRatio =
    Dimensions.get("window").width / Dimensions.get("window").height;
  const [ratio, setRatio] = useState(initialRatio);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  const onChangeRatio = () => {
    setRatio(Dimensions.get("window").width / Dimensions.get("window").height);
  };
  useEffect(() => {
    const ratioListener = Dimensions.addEventListener("change", onChangeRatio);
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsKeyboardShow(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboardShow(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      ratioListener.remove();
    };
  }, []);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <ImageBackground source={BcgImage} style={styles.bcgImage}>
          <LoginScreen
            isKeyboardShow={isKeyboardShow}
            setIsKeyboardShow={setIsKeyboardShow}
            ratio={ratio}
          />
        </ImageBackground>
      </TouchableWithoutFeedback>
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
