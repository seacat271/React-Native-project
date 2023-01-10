import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Camera } from "expo-camera";
import { useState } from "react";
import { IconButton } from "../../components/IconButton/IconButton";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
export const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const takePhoto = async () => {
    const snap = await camera.takePictureAsync();
    setPhoto(snap.uri);
  };

  return (
    <View style={styles.container}>
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
                takePhoto();
                console.log(photo);
              }}
              style={{ ...styles.btnContainer }}
            />
          </Camera>
        )}
      </View>
      <SubmitButton
        title={"Опубликовать"}
        handleSubmit={() => {
          setPhoto(null);
          navigation.navigate("Posts");
        }}
        style={{ marginTop: 32 }}
      />
    </View>
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
});
