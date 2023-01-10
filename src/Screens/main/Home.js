import { ProfileScreen } from "../../Screens/main/ProfileScreen";
import { PostsScreen } from "../../Screens/main/PostsScreen";
import { CreatePostsScreen } from "../../Screens/main/CreatePostsScreen";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { IconButton } from "../../components/IconButton/IconButton";
const MainTab = createBottomTabNavigator();
export const Home = ({ navigation }) => {
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      options={{
        activeTintColor: "#FF6C00",
        inactiveTintColor: "rgba(33, 33, 33, 0.8)",
        showLabel: false,
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публикации",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            color: "#212121",
          },
          headerStyle: {
            backgroundColor: "#FFFFFF",
            borderBottomWidth: 1,
            borderBottomColor: "#BDBDBD",
          },
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={24} color={color} />
          ),
          headerRight: () => (
            <IconButton
              iconName={"log-out"}
              color={"#BDBDBD"}
              size={24}
              navigation={() => navigation.navigate("Login")}
            />
          ),
          headerRightContainerStyle: {
            paddingRight: 10,
          },
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Создать публикацию",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#FFFFFF",
            borderBottomWidth: 1,
            borderBottomColor: "#BDBDBD",
          },
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
          headerLeft: ({ focused, size, color }) => (
            <IconButton
              iconName={"arrow-left"}
              color={color}
              size={24}
              navigation={() => navigation.navigate("Posts")}
            />
          ),
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};
