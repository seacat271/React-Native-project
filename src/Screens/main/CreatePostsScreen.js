import { StyleSheet, View, Image } from "react-native";
import { Camera } from "expo-camera";
import { useState } from "react";
import * as Progress from "react-native-progress";
import * as Location from "expo-location";
import {
  ToggleButton,
  IconButton,
  SubmitButton,
} from "../../components/Button";
import { DescribeInput } from "../../components/Input";
import { State } from "react-native-gesture-handler";
const initialState = {
  name: "",
  locationName: "",
};
export const CreatePostsScreen = ({ navigation }) => {
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
    console.log("create", photoDescription);
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

  if (!permission || !status) {
    return (
      <View>
        <Progress.Circle size={60} indeterminate={true} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SubmitButton
        handleSubmit={requestPermission}
        title={"We need your permission to show the camera"}
      />
    );
  } else if (!status.granted) {
    return (
      <SubmitButton
        handleSubmit={requestPermission}
        title={"We need your permission to show the camera"}
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
      <DescribeInput
        name={"name"}
        placeholder={"Название..."}
        boldFont={true}
        state={photoDescription.name}
        setState={setPhotoDescription}
      />
      <DescribeInput
        name={"locationName"}
        placeholder={"Местность..."}
        iconName={"map-pin"}
        marginBottom={32}
        state={photoDescription.locationName}
        setState={setPhotoDescription}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          textAlign: "center",
          marginBottom: 34,
        }}
      >
        <SubmitButton
          title={"Опубликовать"}
          handleSubmit={() => {
            navigation.navigate("Default", {
              photo,
              location: photoCoord,
              name: photoDescription.name,
              locationName: photoDescription.locationName,
            });
            changePhoto();
            setPhotoDescription(initialState);
          }}
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
