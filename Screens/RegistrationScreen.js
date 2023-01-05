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

const initialState = {
  login: "",
  email: "",
  password: "",
};
export const RegistrationScreen = ({
  isKeyboardShow,
  setIsKeyboardShow,
  keyboardHide,
}) => {
  const [state, setState] = useState(initialState);

  const submitButton = () => {
    console.log(state);
    setState(initialState);
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.title}>Регистрация</Text>
          <TextInput
            value={state.login}
            onFocus={() => setIsKeyboardShow(true)}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, login: value }))
            }
            style={styles.input}
            placeholderTextColor={"#BDBDBD"}
            placeholder={"Логин"}
          />
          <TextInput
            value={state.email}
            onFocus={() => setIsKeyboardShow(true)}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, email: value }))
            }
            style={styles.input}
            placeholderTextColor={"#BDBDBD"}
            placeholder={"Aдрес електронной почты"}
          />
          <TextInput
            secureTextEntry={true}
            value={state.password}
            onFocus={() => setIsKeyboardShow(true)}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, password: value }))
            }
            style={{ ...styles.input, marginBottom: isKeyboardShow ? 32 : 16 }}
            placeholderTextColor={"#BDBDBD"}
            placeholder={"Пароль"}
          />

          {!isKeyboardShow && (
            <>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={submitButton}
              >
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
    fontFamily: "Roboto-Medium",
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
    fontFamily: "Roboto-Regular",
  },
  helper: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginBottom: 78,
  },
});
