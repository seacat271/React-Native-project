import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
export const IconButton = ({ iconName, color, size, navigation }) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Feather name={iconName} size={size} color={color} onPress={navigation} />
    </TouchableOpacity>
  );
};
