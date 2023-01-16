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
      const { uid, displayName } = user;
      console.log(displayName);
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
      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      const { displayName, uid } = auth.currentUser;
      console.log(displayName);
      dispatch(
        authSlice.actions.updateUserProfile({ userId: uid, login: displayName })
      );
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };
const authSignOutUser = () => async (dispatch, getState) => {
  await auth.signOut();
  dispatch(authSlice.actions.authSignOut());
};
const authStateChangeUser = () => async (dispatch, getState) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const { uid, displayName } = user;
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};

export { authSignInUser, authSignUpUser, authSignOutUser, authStateChangeUser };
