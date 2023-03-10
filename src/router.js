import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import { LoginScreen } from "./Screens/auth/LoginScreen";
import { Home } from "./Screens/main/Home";

const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth)
    return (
      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <AuthStack.Screen name="Registration" component={RegistrationScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
      </AuthStack.Navigator>
    );
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Home" component={Home} />
    </AuthStack.Navigator>
  );
};
