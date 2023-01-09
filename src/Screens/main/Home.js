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
          headerRight: () => (
            <IconButton
              name={"log-out"}
              color={"rgba(33, 33, 33, 0.8)"}
              size={24}
              navigation={navigation}
            />
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
