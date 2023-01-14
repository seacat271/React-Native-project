import app from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };
const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };
const authSignOutUser = () => async (dispatch, getState) => {};
export { authSignInUser, authSignUpUser, authSignOutUser };
