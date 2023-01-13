import { StyleSheet, View, Platform, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
export const DescribeInput = ({
  iconName,
  name,
  placeholder,
  state,
  setState,
  children,
  marginBottom = 16,
  boldFont = false,
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
        style={{
          ...styles.input,
          position: iconName ? "relative" : "static",
          paddingLeft: iconName ? 28 : 0,
          fontFamily: boldFont ? "Roboto-Medium" : "Roboto-Regular",
        }}
        placeholderTextColor={"#BDBDBD"}
        placeholder={placeholder}
      />
      {iconName && (
        <Feather
          name={iconName}
          size={24}
          color="#BDBDBD"
          style={{ position: "absolute", top: 16 }}
        />
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
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
