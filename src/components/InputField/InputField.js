import { StyleSheet, View, Platform, TextInput } from "react-native";

export const InputField = ({ placeholder, state, setState }) => {
  return (
    <View>
      <TextInput
        value={state}
        onChangeText={(value) =>
          setState((prevState) => ({ ...prevState, login: value }))
        }
        style={styles.input}
        placeholderTextColor={"#BDBDBD"}
        placeholder={placeholder}
      />
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
    marginBottom: 16,
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
