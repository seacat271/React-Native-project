import { useState, useEffect } from "react";
import { Text, View, FlatList, Image, StyleSheet } from "react-native";
import { IconButton } from "../../../components/Button";
export const DefaultScreen = ({ navigation, route }) => {
  console.log("default", route.params);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (!route.params) return;
    setPosts((prevState) => [...prevState, route.params]);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
            <View style={styles.cameraThumb}>
              <Image source={{ uri: item.photo }} style={styles.camera} />
            </View>
            <View
              style={{
                display: "flex",
                // alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>{route.params.name}</Text>
              <View>
                <IconButton
                  iconName={"message-circle"}
                  size={18}
                  color={"#BDBDBD"}
                  onPressFunction={() =>
                    navigation.navigate("Comments", {
                      id: index.toString(),
                      uri: item.photo,
                    })
                  }
                />
                <Text>0</Text>
              </View>
              <View>
                <IconButton
                  iconName={"map-pin"}
                  size={18}
                  color={"#BDBDBD"}
                  onPressFunction={() =>
                    navigation.navigate("Map", {
                      location: item.location,
                    })
                  }
                />
                <Text>{route.params.locationName}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
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
