import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
export const PostCard = ({ item }) => {
  const { userId: id } = useSelector((state) => state.auth);
  const { userId, avatar, comment, timestamp } = item;
  return (
    <View
      style={{
        ...styles.container,
        flexDirection: userId === id ? "row-reverse" : "row",
      }}
    >
      <Image
        source={avatar}
        style={{
          ...styles.avatar,
          marginRight: userId === id ? 0 : 16,
          marginLeft: userId === id ? 16 : 0,
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{comment}</Text>
        <Text
          style={{
            ...styles.time,
            textAlign: userId === id ? "left" : "right",
          }}
        >
          {timestamp}
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
