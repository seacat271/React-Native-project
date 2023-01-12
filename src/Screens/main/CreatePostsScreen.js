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
import { ToggleButton } from "../../components/Button/ToggleButton";
import { IconButton } from "../../components/Button/IconButton";
import { SubmitButton } from "../../components/Button/SubmitButton";
import { PermissionButton } from "../../components/Button/PermissionButton";
export const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoLocation, setPhotoLocation] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [status, requestPermissionLocation] =
    Location.useForegroundPermissions();
  const takeData = async () => {
    const snap = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log("create", location.coords);
    setPhotoLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setPhoto(snap.uri);
  };
  const changePhoto = () => {
    setPhoto(null);
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
      <PermissionButton
        request={requestPermission}
        text={"We need your permission to show the camera"}
      />
    );
  } else if (!status.granted) {
    return (
      <PermissionButton
        request={requestPermissionLocation}
        text={"We need your permission to show the location"}
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
        toggleTitle={["Редактировать фото", "Загрузите фото"]}
        toggleContainer={styles.toggleContainer}
        toggleText={styles.toggleText}
      />
      <SubmitButton
        title={"Опубликовать"}
        handleSubmit={() => {
          navigation.navigate("Default", {
            photo,
            location: photoLocation,
          });
          setPhoto(null);
          setPhotoLocation(null);
        }}
        style={{ marginTop: 32 }}
        disabled={!photo}
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
  toggleContainer: {
    marginTop: 8,
  },
  toggleText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
});
