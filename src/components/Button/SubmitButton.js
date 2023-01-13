import { StyleSheet, TouchableOpacity, Text } from "react-native";
export const SubmitButton = ({
  title,
  activeOpacity = 0.7,
  handleSubmit,
  style,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...style,
        ...(disabled && styles.disabledColors),
      }}
      activeOpacity={activeOpacity}
      onPress={handleSubmit}
      disabled={disabled}
    >
      {title && (
        <Text
          style={{
            ...styles.buttonTitle,
            ...(disabled && styles.disabledColors),
          }}
        >
          {title}
        </Text>
      )}
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
    textAlign: "center",
  },
  disabledColors: {
    color: "#BDBDBD",
    backgroundColor: "#F6F6F6",
  },
});
