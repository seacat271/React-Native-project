import { StyleSheet, TouchableOpacity, Text } from "react-native";

export const ToggleButton = ({
  toggleTitle,
  toggleFunction,
  toggleFlag,
  toggleContainer,
  toggleText,
  activeOpacity = 0.7,
}) => {
  return (
    <TouchableOpacity
      style={toggleContainer}
      activeOpacity={activeOpacity}
      onPress={toggleFunction}
    >
      <Text style={toggleText}>
        {toggleFlag ? toggleTitle[0] : toggleTitle[1]}
      </Text>
    </TouchableOpacity>
  );
};
