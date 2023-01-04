import { View, Text, StyleSheet, TextInput } from "react-native";
export const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Войти</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={"#BDBDBD"}
        placeholder={"Адрес електронной почты"}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={"#BDBDBD"}
        placeholder={"Пароль"}
        textContentType={"password"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: 549,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 32,
    fontSize: 30,
  },
  input: {
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 16,
    color: "#212121",
    fontSize: 16,
  },
});
