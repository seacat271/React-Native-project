import { StyleSheet, TouchableOpacity, Text } from "react-native";
export const LinkButton = ({ onPressFunction, title, marginBottom }) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Text
        style={{ ...styles.showBtnText, marginBottom: marginBottom }}
        onPress={onPressFunction}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  showBtnText: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
