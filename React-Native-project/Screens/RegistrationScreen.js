import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
const initialState = "";
export const RegistrationScreen = ({
  isKeyboardShow,
  setIsKeyboardShow,
  keyboardHide,
}) => {
  const [login, setLogin] = useState(initialState);
  const [email, setEmail] = useState(initialState);
  const [password, setPassword] = useState(initialState);
  console.log(isKeyboardShow);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.title}>Регистрация</Text>
          <TextInput
            onFocus={() => setIsKeyboardShow(true)}
            style={styles.input}
            placeholderTextColor={"#BDBDBD"}
            placeholder={"Логин"}
          />
          <TextInput
            onFocus={() => setIsKeyboardShow(true)}
            style={styles.input}
            placeholderTextColor={"#BDBDBD"}
            placeholder={"Aдрес електронной почты"}
          />
          <TextInput
            onFocus={() => setIsKeyboardShow(true)}
            style={{ ...styles.input, marginBottom: isKeyboardShow ? 32 : 16 }}
            placeholderTextColor={"#BDBDBD"}
            placeholder={"Пароль"}
          />

          {!isKeyboardShow && (
            <>
              <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                <Text style={styles.buttonTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <Text style={styles.helper}>Уже есть аккаунт? Войти</Text>
            </>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",

    backgroundColor: "#ffffff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 32,
    paddingHorizontal: 16,
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginBottom: 16,
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  helper: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    marginBottom: 78,
  },
});
