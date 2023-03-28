import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DrawerNavigator from "./navigation/drawerNavigation";
import firebase from "firebase";
import { firebaseConfig } from "./config";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/login";
import RegisterScreen from "./screens/register";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="DashBoard"
          component={DrawerNavigator}
        ></Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
