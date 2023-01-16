import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRoute } from "../../router";
import { authStateChangeUser } from "../../../redux/auth/authOperations";
export const Main = () => {
  const dispatch = useDispatch();
  const { stateChange } = useSelector((state) => state.auth);
  const routing = useRoute(stateChange);
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [stateChange]);
  return <NavigationContainer>{routing}</NavigationContainer>;
};
