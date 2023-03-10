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
import {
  ToggleButton,
  SubmitButton,
  LinkButton,
} from "../../components/Button";
import { AuthInput } from "../../components/Input";
import { BackgroundContainer } from "../../components/BackgroundContainer/BackgroundContainer";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../../redux/auth/authOperations";
const initialState = {
  login: "",
  email: "",
  password: "",
};
export const RegistrationScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const initialRatio =
    Dimensions.get("window").width / Dimensions.get("window").height;
  const [ratio, setRatio] = useState(initialRatio);
  const onChangeRatio = () => {
    setRatio(Dimensions.get("window").width / Dimensions.get("window").height);
  };
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
  const handleSubmit = () => {
    dispatch(authSignUpUser(state));
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
            <Text style={styles.title}>??????????????????????</Text>
            <AuthInput
              name={"login"}
              placeholder={"??????????"}
              state={state.login}
              setState={setState}
            />
            <AuthInput
              name={"email"}
              placeholder={"A???????? ?????????????????????? ??????????"}
              state={state.email}
              setState={setState}
            />
            <AuthInput
              name={"password"}
              placeholder={"????????????"}
              state={state.password}
              setState={setState}
              secureTextEntry={hidePassword}
              marginBottom={isKeyboardShow ? 32 : 16}
            >
              <ToggleButton
                toggleTitle={["????????????????", "????????????"]}
                toggleFunction={toggleHidePassword}
                toggleFlag={hidePassword}
                toggleContainer={styles.toggleContainer}
                toggleText={styles.toggleText}
              />
            </AuthInput>
          </KeyboardAvoidingView>
          {!isKeyboardShow && (
            <>
              <SubmitButton
                title={"????????????????????????????????????"}
                handleSubmit={handleSubmit}
              />
              <LinkButton
                onPressFunction={() => navigation.navigate("Login")}
                title={"?????? ???????? ??????????????? ??????????"}
                marginBottom={ratio > 1 ? 18 : 78}
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
