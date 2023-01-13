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
      <View
        style={{
          flexDirection: "row",
          marginTop: 32,
          marginBottom: 32,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../../assets/images/user.webp")}
          style={{ width: 60, height: 60, marginRight: 8 }}
        />
        <View>
          <Text
            style={{
              fontSize: 13,
              color: "#212121",
              fontFamily: "Roboto-Bold",
            }}
          >
            UserName
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: "rgba(33, 33, 33, 0.8)",
              fontFamily: "Roboto-Regular",
            }}
          >
            UserEmail
          </Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View>
            <View style={styles.cameraThumb}>
              <Image source={{ uri: item.photo }} style={styles.camera} />
            </View>
            <View
              style={{
                marginBottom: 32,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Roboto-Medium",
                  marginBottom: 8,
                }}
              >
                {item.name}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <IconButton
                    iconName={"message-circle"}
                    color={"#BDBDBD"}
                    onPressFunction={() =>
                      navigation.navigate("Comments", {
                        id: index.toString(),
                        uri: item.photo,
                      })
                    }
                  />
                  <Text
                    style={{
                      marginLeft: 6,
                      color: "#BDBDBD",
                      fontFamily: "Roboto-Regular",
                    }}
                  >
                    0
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton
                    iconName={"map-pin"}
                    color={"#BDBDBD"}
                    onPressFunction={() =>
                      navigation.navigate("Map", {
                        location: item.location,
                      })
                    }
                  />
                  <Text
                    style={{
                      marginLeft: 6,
                      fontFamily: "Roboto-Regular",
                      color: "#212121",
                      textDecorationLine: "underline",
                    }}
                  >
                    {item.locationName}
                  </Text>
                </View>
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

    marginBottom: 8,
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
});
