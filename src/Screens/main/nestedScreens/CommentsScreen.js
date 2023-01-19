import { v4 as uuid } from "uuid";
import {
  where,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  query,
} from "firebase/firestore";
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
import { useSelector } from "react-redux";
import { dataBase } from "../../../../firebase/config";
import { IconButton } from "../../../components/Button";
import { PostInput } from "../../../components/Input/PostInput";
import { PostCard } from "../../../components/PostCard/PostCard";

const initialState = {
  text: "",
};
export const CommentsScreen = ({ route }) => {
  const { login, userId } = useSelector((state) => state.auth);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [comments, setComments] = useState([]);
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
    getAllPosts();
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
  const addComments = async () => {
    await setDoc(doc(dataBase, "posts", post.id, "comments", uuid()), {
      comment: text.text,
      userId: userId,
      login: login,
      timestamp: Date.now(),
      avatar: require("../../../../assets/images/user.webp"),
    });
    setText(initialState);
  };
  const getAllPosts = async () => {
    const querySnapshot = await getDocs(
      collection(dataBase, "posts", `${post.id}`, "comments")
    );
    setComments(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
  };
  console.log(comments);
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
