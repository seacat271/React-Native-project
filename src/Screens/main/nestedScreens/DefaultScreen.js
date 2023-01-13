import { useState, useEffect } from "react";
import { Text, View, FlatList, Image } from "react-native";
import { IconButton } from "../../../components/Button";
export const DefaultScreen = ({ navigation, route }) => {
  console.log("default", route.params);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (!route.params) return;
    setPosts((prevState) => [...prevState, route.params]);
  }, [route.params]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ marginHorizontal: 10, marginTop: 10 }}>
            <Image
              source={{ uri: item.photo }}
              style={{ width: 300, height: 240 }}
            />
            <IconButton
              iconName={"map-pin"}
              onPressFunction={() =>
                navigation.navigate("Map", { location: route.params.location })
              }
            />
            <IconButton
              iconName={"message-circle"}
              onPressFunction={() =>
                navigation.navigate("Comments", {
                  id: index.toString(),
                  uri: item.photo,
                })
              }
            />
          </View>
        )}
      />
    </View>
  );
};
