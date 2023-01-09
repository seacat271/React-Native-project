import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
export const IconButton = ({ name, color, size, navigation }) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Feather
        name={name}
        size={size}
        color={color}
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </TouchableOpacity>
  );
};
