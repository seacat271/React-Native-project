import { TextInput, View } from "react-native";
import { IconButton } from "../Button";
export const PostInput = ({ children, state, setState, name, placeholder }) => {
  return (
    <View
      style={{
        height: 50,
        backgroundColor: "#F6F6F6",
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 100,
        marginBottom: 16,
        position: children ? "relative" : "static",
      }}
    >
      <TextInput
        value={state}
        onChangeText={(value) =>
          setState((prevState) => ({ ...prevState, [name]: value }))
        }
        placeholderTextColor={"#BDBDBD"}
        placeholder={placeholder}
        style={{
          padding: 16,
          color: "#212121",
          fontSize: 16,
          fontFamily: "Roboto-Medium",
        }}
      />
      {children}
    </View>
  );
};
