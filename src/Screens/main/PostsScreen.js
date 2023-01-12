import { useState, useEffect } from "react";
import { Text, View, FlatList, Image } from "react-native";
export const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (!route.params) return;
    setPosts((prevState) => [...prevState, route.params]);
    console.log(posts);
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
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 10, marginTop: 10 }}>
            <Image
              source={{ uri: item.photo }}
              style={{ width: 300, height: 240 }}
            />
          </View>
        )}
      />
    </View>
  );
};
