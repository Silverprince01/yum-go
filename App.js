import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OpeningScreen } from "./src/screens/OpeningScreen";
import { Main3 } from "./src/screens/OpeningScreen/MainScreen3/Main3";

import ConsumerScreens from "./src/screens/ConsumerScreens";

import VendorScreens from "./src/screens/VendorScreens";
import { AuthProvider } from "./src/screens/ConsumerScreens/Authentication";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.app}>
      <NavigationContainer>
        <Stack.Navigator>
           <Stack.Screen
            name="Opening Screen"
            component={OpeningScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main Screen"
            component={Main3}
            options={{ headerShown: false }}
          /> 

          {/* consumer screen */}
           <Stack.Screen
            name="Log In"
            component={ConsumerScreens}
            options={{ headerShown: false }}
          /> 
          {/* Vendors  */}
          <Stack.Screen
            name="Vendor Login"
            component={VendorScreens}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    // backgroundColor: "#fff",
  },
});
