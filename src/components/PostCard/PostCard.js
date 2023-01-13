import { View, Text, Image, StyleSheet } from "react-native";
export const PostCard = ({ item }) => {
  const { userId } = item.owner;
  return (
    <View
      style={{
        ...styles.container,
        flexDirection: userId === 5 ? "row-reverse" : "row",
      }}
    >
      <Image
        source={item.owner.avatar}
        style={{
          ...styles.avatar,
          marginRight: userId === 5 ? 0 : 16,
          marginLeft: userId === 5 ? 16 : 0,
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.text}</Text>
        <Text
          style={{ ...styles.time, textAlign: userId === 5 ? "left" : "right" }}
        >
          {item.timestamp}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  textContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  text: {
    fontSize: 13,
    fontFamily: "Roboto-Regular",
    color: "#212121",
    marginBottom: 8,
  },
  time: {
    fontSize: 10,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    textAlign: "right",
  },
});
