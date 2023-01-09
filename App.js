import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "./src/router";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  const [isAuth, setIsAuth] = useState(false);
  if (!fontsLoaded) {
    return null;
  }

  const routing = useRoute(isAuth, setIsAuth);
  return <NavigationContainer>{routing}</NavigationContainer>;
}
