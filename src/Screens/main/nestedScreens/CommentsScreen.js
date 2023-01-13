import { useState, useEffect, useRef } from "react";
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
import { TextInput } from "react-native-gesture-handler";
import { IconButton } from "../../../components/Button";
import { PostInput } from "../../../components/Input/PostInput";
import { PostCard } from "../../../components/PostCard/PostCard";
const initialComments = [
  {
    id: 2,
    text: "dfkvjfvkdfsv",
    timestamp: 9487346907,
    owner: {
      userId: 1,
      avatar: require("../../../../assets/images/user.webp"),
    },
  },
  {
    id: 5,
    text: "dfkvjfvkdfsvvcxngfngxf gf ngfngfndfgfxn",
    timestamp: 9487346907,
    owner: {
      userId: 3,
      avatar: require("../../../../assets/images/user.webp"),
    },
  },
  {
    id: 8,
    text: "fgf",
    timestamp: 9487346907,
    owner: {
      userId: 1,
      avatar: require("../../../../assets/images/user.webp"),
    },
  },
];
const initialState = {
  text: "",
};
export const CommentsScreen = ({ route }) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState(initialState);
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

  const flatList = useRef(null);
  const addComments = () => {
    setComments((prevState) => [
      ...prevState,
      {
        id: Date.now(),
        text: text.text,
        timestamp: Date.now(),
        owner: {
          userId: 5,
          avatar: require("../../../../assets/images/user.webp"),
        },
      },
    ]);
    setText(initialState);
  };
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
          ref={flatList}
          onContentSizeChange={() => {
            flatList.current.scrollToEnd();
          }}
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard item={item} />}
        />
        <PostInput
          state={text.text}
          setState={setText}
          placeholder={"Комментировать ..."}
          name={"text"}
        >
          <IconButton
            iconName={"arrow-up"}
            color={"#FFFFFF"}
            style={styles.iconBtn}
            onPressFunction={addComments}
          />
        </PostInput>
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
    marginBottom: 32,
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  iconBtn: {
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 8,
    right: 8,
  },
});
