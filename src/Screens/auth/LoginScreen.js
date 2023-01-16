import { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../../redux/auth/authOperations";
import {
  ToggleButton,
  SubmitButton,
  LinkButton,
} from "../../components/Button";
import { AuthInput } from "../../components/Input";
import { BackgroundContainer } from "../../components/BackgroundContainer/BackgroundContainer";
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
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [hidePassword, setHidePassword] = useState(true);
  const handleSubmit = () => {
    setState(initialState);
    dispatch(authSignInUser(state));
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
            <AuthInput
              name={"email"}
              placeholder={"Aдрес електронной почты"}
              state={state.email}
              setState={setState}
            />
            <AuthInput
              name={"password"}
              placeholder={"Пароль"}
              state={state.password}
              setState={setState}
              secureTextEntry={hidePassword}
              marginBottom={isKeyboardShow ? 32 : 16}
            >
              <ToggleButton
                toggleTitle={["Показать", "Скрыть"]}
                toggleFunction={toggleHidePassword}
                toggleFlag={hidePassword}
                toggleContainer={styles.toggleContainer}
                toggleText={styles.toggleText}
              />
            </AuthInput>
          </KeyboardAvoidingView>
          {!isKeyboardShow && (
            <>
              <SubmitButton title={"Войти"} handleSubmit={handleSubmit} />
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
  toggleContainer: {
    position: "absolute",
    top: 14,
    right: 16,
  },
  toggleText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
});
