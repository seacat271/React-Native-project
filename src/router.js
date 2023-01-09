import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import { LoginScreen } from "./Screens/auth/LoginScreen";
import { Home } from "./Screens/main/Home";
import { ProfileScreen } from "./Screens/main/ProfileScreen";
import { PostsScreen } from "./Screens/main/PostsScreen";
import { CreatePostsScreen } from "./Screens/main/CreatePostsScreen";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth, setIsAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home screen",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerRight: () => (
              <Button
                onPress={() => alert("This is a button!")}
                title="Press me"
                color="#fff"
              />
            ),
          }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      tabBarOptions={{
        activeTintColor: "#FF6C00",
        inactiveTintColor: "rgba(33, 33, 33, 0.8)",
        showLabel: false,
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={24} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                width: 70,
                height: 40,
                backgroundColor: "#FF6C00",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Feather name="plus" size={14} color="#ffffff" />
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};