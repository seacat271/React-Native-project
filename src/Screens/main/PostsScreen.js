import { useState, useEffect } from "react";
import { Text, View, FlatList, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreen } from "./nestedScreens/DefaultScreen";
import { CommentsScreen } from "./nestedScreens/CommentsScreen";
import { MapScreen } from "./nestedScreens/MapScreen";
const NestedScreen = createStackNavigator();
export const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Default"
        component={DefaultScreen}
        options={{
          headerShown: false,
        }}
      ></NestedScreen.Screen>
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
      ></NestedScreen.Screen>
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
      ></NestedScreen.Screen>
    </NestedScreen.Navigator>
  );
};
