import { StyleSheet, TouchableOpacity, Text } from "react-native";

export const ToggleButton = ({
  toggleFunction,
  toggleFlag,
  activeOpacity = 0.7,
}) => {
  return (
    <TouchableOpacity
      style={styles.showBtn}
      activeOpacity={activeOpacity}
      onPress={toggleFunction}
    >
      <Text style={styles.showBtnText}>
        {toggleFlag ? "Показать" : "Скрыть"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  showBtn: {
    position: "absolute",
    top: 14,
    right: 16,
  },
  showBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
});
