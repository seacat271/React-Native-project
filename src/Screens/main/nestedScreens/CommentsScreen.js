import { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  FlatList,
} from "react-native";
const comments = [
  {
    id: 2,
    text: "dfkvjfvkdfsv",
    timestamp: 9487346907,
    owner: {
      userId: 1,
      avatar: "dssgdfdb",
    },
  },
  {
    id: 5,
    text: "dfkvjfvkdfsvvcxngfngxf gf ngfngfndfgfxn",
    timestamp: 9487346907,
    owner: {
      userId: 3,
      avatar: "dssgdfzbdfdb",
    },
  },
  {
    id: 8,
    text: "fgf",
    timestamp: 9487346907,
    owner: {
      userId: 1,
      avatar: "dssgdfdb",
    },
  },
];
export const CommentsScreen = ({ route }) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  const initialRatio =
    Dimensions.get("window").width / Dimensions.get("window").height;
  const [ratio, setRatio] = useState(initialRatio);
  const onChangeRatio = () => {
    setRatio(Dimensions.get("window").width / Dimensions.get("window").height);
  };
  const [post, setPost] = useState({});
  useEffect(() => {
    if (!route.params) return;
    setPost(route.params);
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
  console.log("route", route.params);
  console.log("state", post);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.cameraThumb}>
            <Image source={{ uri: post.uri }} style={styles.camera} />
          </View>
        </KeyboardAvoidingView>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <View>
                <Image source={item.owner.avatar} />
              </View>
              <View>
                <Text>{item.text}</Text>
                <Text>{item.timestamp}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  cameraThumb: {
    overflow: "hidden",
    borderRadius: 8,
    marginTop: 32,
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
});
