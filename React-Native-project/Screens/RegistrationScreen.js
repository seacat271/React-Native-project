import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";

export const RegistrationScreen = () => {
  console.log(Platform.OS);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={"#BDBDBD"}
        placeholder={"Логин"}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={"#BDBDBD"}
        placeholder={"Aдрес електронной почты"}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={"#BDBDBD"}
        placeholder={"Пароль"}
      />
      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Text style={styles.buttonTitle}>Зарегистрироваться</Text>
      </TouchableOpacity>
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
    // fontWeight: 500,
    fontSize: 30,
    // lineHeight: 1.17,
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
    padding: 16,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
