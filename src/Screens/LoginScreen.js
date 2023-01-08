import { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { ToggleButton } from "../components/ToggleButton/ToggleButton";
import { SubmitButton } from "../components/SubmitButton/SubmitButton";
import { InputField } from "../components/InputField/InputField";
import { BackgroundContainer } from "../components/BackgroundContainer/BackgroundContainer";
import { LinkButton } from "../components/LinkButton/LinkButton";
const initialState = {
  email: "",
  password: "",
};
export const LoginScreen = ({ navigation }) => {
  const initialRatio =
    Dimensions.get("window").width / Dimensions.get("window").height;
  const [ratio, setRatio] = useState(initialRatio);
  const onChangeRatio = () => {
    setRatio(Dimensions.get("window").width / Dimensions.get("window").height);
  };
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  useEffect(() => {
    const ratioListener = Dimensions.addEventListener("change", onChangeRatio);
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsKeyboardShow(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboardShow(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      ratioListener.remove();
    };
  }, []);

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
    <BackgroundContainer>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Text style={styles.title}>Войти</Text>
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
              marginBottom={isKeyboardShow ? 32 : 16}
            >
              <ToggleButton
                toggleFunction={toggleHidePassword}
                toggleFlag={hidePassword}
              />
            </InputField>
          </KeyboardAvoidingView>
          {!isKeyboardShow && (
            <>
              <SubmitButton title={"Войти"} handleSubmit={submitButton} />
              <LinkButton
                onPressFunction={() => navigation.navigate("Registration")}
                title={"Нет аккаунта? Зарегистрироваться"}
                marginBottom={ratio > 1 ? 18 : 144}
              />
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </BackgroundContainer>
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
});
