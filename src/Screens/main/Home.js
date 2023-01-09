import { ProfileScreen } from "../../Screens/main/ProfileScreen";
import { PostsScreen } from "../../Screens/main/PostsScreen";
import { CreatePostsScreen } from "../../Screens/main/CreatePostsScreen";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
const MainTab = createBottomTabNavigator();
export const Home = () => {
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
          // headerRight: () => (
          //   <Feather
          //     name="log-out"
          //     size={24}
          //     color={color}
          //     onPress={() => navigation.navigate("Login")}
          //   />
          // ),
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
