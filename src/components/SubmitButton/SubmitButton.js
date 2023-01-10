import { StyleSheet, TouchableOpacity, Text } from "react-native";
export const SubmitButton = ({
  title,
  activeOpacity = 0.7,
  handleSubmit,
  style,
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...style }}
      activeOpacity={activeOpacity}
      onPress={handleSubmit}
    >
      {title && <Text style={styles.buttonTitle}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginBottom: 16,
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
