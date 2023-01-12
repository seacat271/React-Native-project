import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";
import { Camera } from "expo-camera";
import { useState, useEffect } from "react";
import * as Progress from "react-native-progress";
import * as Location from "expo-location";
import { IconButton } from "../../components/IconButton/IconButton";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { PermissionButton } from "../../components/PermissionButton/PermissionButton";
export const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [status, requestPermissionLocation] =
    Location.useBackgroundPermissions();
  const takePhoto = async () => {
    const snap = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log(location);

    setPhoto(snap.uri);
  };

  if (!permission) {
    return (
      <View>
        <Progress.Circle size={30} indeterminate={true} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <PermissionButton
        setPermission={requestPermission}
        text={"We need your permission to show the camera"}
      />
    );
  }
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
          navigation.navigate("Posts", { photo });
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
