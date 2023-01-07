import { useState } from "react";
import { SubmitButton } from "../components/SubmitButton/SubmitButton";
import { InputField } from "../components/InputField/InputField";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};
export const RegistrationScreen = ({ isKeyboardShow, ratio }) => {
  const [state, setState] = useState(initialState);
  const [hidePassword, setHidePassword] = useState(true);
  const submitButton = () => {
    console.log(state);
    setState(initialState);
  };
  const toggleHidePassword = () => {
    setHidePassword((prevState) => !prevState);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.title}>Регистрация</Text>
          <InputField
            name={"login"}
            placeholder={"Логин"}
            state={state.login}
            setState={setState}
          />
          <InputField
            name={"email"}
            placeholder={"Aдрес електронной почты"}
            state={state.email}
            setState={setState}
          />
          <InputField
            name={"password"}
            placeholder={"Пароль"}
            state={state.password}
            setState={setState}
            secureTextEntry={hidePassword}
            style={{
              marginBottom: isKeyboardShow ? 32 : 16,
            }}
          >
            <TouchableOpacity
              style={styles.showBtn}
              activeOpacity={0.7}
              onPress={toggleHidePassword}
            >
              <Text style={styles.showBtnText}>
                {hidePassword ? "Показать" : "Скрыть"}
              </Text>
            </TouchableOpacity>
          </InputField>
          <View style={styles.showBtnThumb}>
            <TextInput
              secureTextEntry={hidePassword}
              value={state.password}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, password: value }))
              }
              style={{
                ...styles.input,
                marginBottom: isKeyboardShow ? 32 : 16,
              }}
              placeholderTextColor={"#BDBDBD"}
              placeholder={"Пароль"}
            />
            <TouchableOpacity
              style={styles.showBtn}
              activeOpacity={0.7}
              onPress={toggleHidePassword}
            >
              <Text style={styles.showBtnText}>
                {hidePassword ? "Показать" : "Скрыть"}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        {!isKeyboardShow && (
          <>
            <SubmitButton
              title={"Зарегистрироваться"}
              handleSubmit={submitButton}
            />
            <Text
              style={{ ...styles.helper, marginBottom: ratio > 1 ? 18 : 78 }}
            >
              Уже есть аккаунт? Войти
            </Text>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
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
  showBtnThumb: {
    position: "relative",
  },
  showBtn: {
    position: "absolute",
    top: 14,
    right: 16,
  },
  showBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
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
