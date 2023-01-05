import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useEffect, useState } from "react";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
const BcgImage = require("./assets/images/Photo-BG.jpg");

export default function App() {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboardShow(false)
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  if (!fontsLoaded) {
    return null;
  }
  const keyboardHide = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground source={BcgImage} style={styles.bcgImage}>
          <RegistrationScreen
            isKeyboardShow={isKeyboardShow}
            setIsKeyboardShow={setIsKeyboardShow}
            keyboardHide={keyboardHide}
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
