import { View, Text, Image, StyleSheet } from "react-native";
export const PostCard = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={item.owner.avatar} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.time}>{item.timestamp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginBottom: 24 },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  text: { fontSize: 13, fontFamily: "Roboto-Regular", color: "#212121" },
  time: { fontSize: 10, fontFamily: "Roboto-Regular", color: "#BDBDBD" },
});
