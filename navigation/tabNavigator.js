import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import Feed from "../screens/feed";
import Ionicons from "react-native-vector-icons/Ionicons";
import CreatePost from "../screens/createPost";
import React from "react";
import { StyleSheet } from "react-native";
const BottomTab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "createpost") {
            iconName = focused ? "camera" : "camera-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={RFValue(25)}
              color={color}
              style={styles.icons}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
      labeled={false}
      barStyle={styles.bottomTabStyle}
    >
      <BottomTab.Screen name="Feed" component={Feed} />
      <BottomTab.Screen name="createpost" component={CreatePost} />
    </BottomTab.Navigator>
  );
};
const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2a2a2a",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute",
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30),
  },
});

export default BottomTabNavigator;
