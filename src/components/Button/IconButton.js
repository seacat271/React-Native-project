import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
export const IconButton = ({
  // collectionIcon,
  iconName,
  color,
  size = 24,
  onPressFunction,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ ...style }}
      onPress={onPressFunction}
    >
      <Feather name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};
