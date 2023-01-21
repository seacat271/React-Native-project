import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Text, View, FlatList, Image, StyleSheet } from "react-native";
import { dataBase } from "../../../../firebase/config";
import { IconButton } from "../../../components/Button";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  query,
  onSnapshot,
} from "firebase/firestore";

export const DefaultScreen = ({ navigation, route }) => {
  const { login } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const querySnapshot = query(collection(dataBase, "posts"));

    onSnapshot(querySnapshot, (data) =>
      setPosts(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  };
  useEffect(() => {
    getAllPosts();
  }, []);
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
            {login}
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
        renderItem={({ item }) => (
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
                        id: item.id,
                        uri: item.photo,
                        avatar: item.avatar,
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
