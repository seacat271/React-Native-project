import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
const BcgImage = require("./assets/images/Photo-BG.jpg");

export default function App() {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
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
