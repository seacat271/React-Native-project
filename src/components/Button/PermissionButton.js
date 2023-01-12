import { StyleSheet, View, Text, Button } from "react-native";
export const PermissionButton = ({ request, text }) => {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>{text}</Text>
      <Button onPress={request} title="Предоставить разрешение" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
});
