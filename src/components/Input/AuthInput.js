import { StyleSheet, View, Platform, TextInput } from "react-native";

export const AuthInput = ({
  name,
  placeholder,
  state,
  setState,
  children,
  secureTextEntry = false,
  marginBottom = 16,
}) => {
  return (
    <View
      style={{
        position: children ? "relative" : "static",
        marginBottom: marginBottom,
      }}
    >
      <TextInput
        value={state}
        onChangeText={(value) =>
          setState((prevState) => ({ ...prevState, [name]: value }))
        }
        style={styles.input}
        placeholderTextColor={"#BDBDBD"}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    padding: 16,
    ...Platform.select({
      ios: {
        padding: 116,
      },
      android: {
        padding: 16,
      },
      default: {
        padding: 32,
      },
    }),
  },
});
