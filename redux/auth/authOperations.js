import auth from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Alert } from "react-native";
import { authSlice } from "./authSlice";
const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        authSlice.actions.updateUserProfile({ userId: uid, login: displayName })
      );
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };
const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      const { uid, displayName } = auth.currentUser;
      dispatch(
        authSlice.actions.updateUserProfile({ userId: uid, login: displayName })
      );
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };
const authSignOutUser = () => async (dispatch, getState) => {};

export { authSignInUser, authSignUpUser, authSignOutUser };
