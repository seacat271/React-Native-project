import {
  StyleSheet,
  Dimensions,
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
const BcgImage = require("../../../assets/images/Photo-BG.jpg");
export const BackgroundContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <ImageBackground source={BcgImage} style={styles.bcgImage}>
          {children}
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
};

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
