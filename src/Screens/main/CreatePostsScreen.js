import {
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { Camera } from "expo-camera";
import { useState, useEffect } from "react";
import * as Progress from "react-native-progress";
import * as Location from "expo-location";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import {
  ToggleButton,
  IconButton,
  SubmitButton,
} from "../../components/Button";
import { DescribeInput } from "../../components/Input";
import { dataBase, storage } from "../../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const initialState = {
  name: "",
  locationName: "",
};
export const CreatePostsScreen = ({ navigation }) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  const initialRatio =
    Dimensions.get("window").width / Dimensions.get("window").height;
  const [ratio, setRatio] = useState(initialRatio);
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
  const { userId, login } = useSelector((state) => state.auth);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoCoord, setPhotoCoord] = useState(null);
  const [photoDescription, setPhotoDescription] = useState(initialState);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [status, requestPermissionLocation] =
    Location.useForegroundPermissions();
  const takeData = async () => {
    const snap = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    setPhotoCoord({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setPhoto(snap.uri);
  };
  const changePhoto = () => {
    setPhoto(null);
    setPhotoCoord(null);
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const uniquePostId = uuid();
      const storageRef = ref(storage, `postImage/${uniquePostId}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const uploadPostToServer = async () => {
    const photoUrl = await uploadPhotoToServer();
    await addDoc(collection(dataBase, "posts"), {
      userId: userId,
      login: login,
      photo: photoUrl,
      location: photoCoord,
      name: photoDescription.name,
      locationName: photoDescription.locationName,
    });
    // const newDocRef = doc(collection(dataBase, "posts"));
    // await setDoc(newDocRef, {
    //   userId: userId,
    //   login: login,
    //   photo: photoUrl,
    //   location: photoCoord,
    //   name: photoDescription.name,
    //   locationName: photoDescription.locationName,
    // });

    // console.log("docRef", docRef);
    // return docRef;
  };
  const handleSubmit = () => {
    uploadPostToServer();
    navigation.navigate("Default", {
      photo,
      location: photoCoord,
      name: photoDescription.name,
      locationName: photoDescription.locationName,
      id: uuid(),
    });
    changePhoto();
    setPhotoDescription(initialState);
  };
  if (!permission || !status) {
    return (
      <View>
        <Progress.Circle size={60} indeterminate={true} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <SubmitButton
          handleSubmit={() => requestPermission()}
          title={"???????????????????? ???????????????????? ???????????????????? ???? ?????????????????????????? ????????????"}
        />
      </View>
    );
  } else if (!status.granted) {
    return (
      <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <SubmitButton
          handleSubmit={() => requestPermissionLocation()}
          title={"???????????????????? ???????????????????? ???????????????????? ???? ?????????????????????????? ????????????????????"}
        />
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.cameraThumb}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.camera} />
            ) : (
              <Camera style={styles.camera} ref={setCamera}>
                <IconButton
                  iconName={"camera"}
                  color={"#FFFFFF"}
                  size={24}
                  onPressFunction={() => {
                    takeData();
                  }}
                  style={{ ...styles.btnContainer }}
                />
              </Camera>
            )}
          </View>
          <ToggleButton
            toggleFlag={!!photo}
            toggleFunction={changePhoto}
            toggleTitle={["?????????????????????????? ????????", "?????????????????? ????????"]}
            toggleContainer={styles.toggleContainer}
            toggleText={styles.toggleText}
          />

          <DescribeInput
            name={"name"}
            placeholder={"????????????????..."}
            boldFont={true}
            state={photoDescription.name}
            setState={setPhotoDescription}
          />
          <DescribeInput
            name={"locationName"}
            placeholder={"??????????????????..."}
            iconName={"map-pin"}
            marginBottom={isKeyboardShow ? 32 : 16}
            state={photoDescription.locationName}
            setState={setPhotoDescription}
          />
        </KeyboardAvoidingView>
        {!isKeyboardShow && (
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              textAlign: "center",
              marginBottom: 34,
            }}
          >
            <SubmitButton
              title={"????????????????????????"}
              handleSubmit={handleSubmit}
              style={{ marginTop: 16 }}
              disabled={!photo}
            />
            <View style={{ alignItems: "center" }}>
              <IconButton
                iconName={"trash-2"}
                color={"#DADADA"}
                style={styles.trashBtn}
                onPressFunction={() => {
                  changePhoto();
                  setPhotoDescription(initialState);
                }}
              />
            </View>
          </View>
        )}
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
  btnContainer: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleContainer: {
    marginTop: 8,
    marginBottom: 32,
  },
  toggleText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  trashBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    width: 70,
    height: 40,
  },
});
