import { useDispatch } from "react-redux";
import { IconButton } from "../../components/Button";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreen } from "./nestedScreens/DefaultScreen";
import { CommentsScreen } from "./nestedScreens/CommentsScreen";
import { MapScreen } from "./nestedScreens/MapScreen";
import { authSignOutUser } from "../../../redux/auth/authOperations";
const NestedScreen = createStackNavigator();

export const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const sigOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <NestedScreen.Navigator
      initialRouteName="Default"
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          color: "#212121",
        },

        headerStyle: {
          backgroundColor: "#FFFFFF",
          borderBottomWidth: 1,
          borderBottomColor: "#E8E8E8",
        },
      }}
    >
      <NestedScreen.Screen
        name="Default"
        component={DefaultScreen}
        options={{
          title: "Публикации",
          headerLeft: () => {},
          headerRight: () => (
            <IconButton
              iconName={"log-out"}
              color={"#BDBDBD"}
              size={24}
              onPressFunction={sigOut}
            />
          ),
          headerRightContainerStyle: {
            paddingRight: 10,
          },
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Комментарии",
          headerLeft: ({ focused, size, color }) => (
            <IconButton
              iconName={"arrow-left"}
              color={color}
              size={24}
              onPressFunction={() => navigation.navigate("Default")}
            />
          ),
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Карта" }}
      />
    </NestedScreen.Navigator>
  );
};
