import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OpeningScreen } from "./src/screens/OpeningScreen";
import { Main3 } from "./src/screens/OpeningScreen/MainScreen3/Main3";
import { Login } from "./src/screens/ConsumerScreens/ConsumerLogin/Login";
import { SignUp } from "./src/screens/ConsumerScreens/ConsumerSignUp/SignUp";
import { HomeScreen } from "./src/screens/ConsumerScreens/HomeScreen/HomeScreen";
import { Search } from "./src/screens/ConsumerScreens/SearchScreen/Search";
import { VendorScreen } from "./src/screens/ConsumerScreens/VendorFoodScreen/VendorScreen";
import { Checkout } from "./src/screens/ConsumerScreens/CheckoutScreen/Checkout";
import { OrderSuccess } from "./src/screens/ConsumerScreens/OrderSuccessScreen/OrderSuccess";
import { ProfileScreen } from "./src/screens/ConsumerScreens/ProfileScreen/ProfileScreen";
import { TrackOrder } from "./src/screens/ConsumerScreens/TrackOrder/TrackOrder";
import { Carts } from "./src/screens/ConsumerScreens/CartScreen/Carts";

import { VendorLogin } from "./src/screens/VendorScreens/VendorLogin";
import { VendorRegister } from "./src/screens/VendorScreens/VendorRegister";
import { VendorSignUp } from "./src/screens/VendorScreens/VendorSignUp";
import { Payout } from "./src/screens/VendorScreens/Payout";
import { Menu } from "./src/screens/VendorScreens/Menu";
import { Profile } from "./src/screens/VendorScreens/Profile";
import { Orders } from "./src/screens/VendorScreens/Orders";





import { AuthProvider } from "./src/screens/ConsumerScreens/Authentication";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.app}>
      <NavigationContainer>
        <AuthProvider>
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

      
  <Stack.Screen
          name="Log In"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Consumer Sign Up"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Vendor"
          component={VendorScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Order Success"
          component={OrderSuccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Carts"
          component={Carts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Track Order"
          component={TrackOrder}
          options={{
            headerShown: true,
            headerTitle: "Track Order",
            headerTitleAlign: "center",
            headerLeft: () => (
              <Image
                style={{ width: 20, height: 20, marginLeft: 10 }}
                source={ArrowLeft}
              />
            ),
          }}
        />
            


<Stack.Screen
				name="Vendor Login"
				component={VendorLogin}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Vendor SignUp"
				component={VendorSignUp}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Vendor Register"
				component={VendorRegister}
				options={{ headerShown: false }}
			/>


			<Stack.Screen
				name="Vendor Orders"
				component={Orders}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Vendor Menu"
				component={Menu}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Vendor Payout"
				component={Payout}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Vendor Profile"
				component={Profile}
				options={{ headerShown: false }}
			/>
          </Stack.Navigator>
        </AuthProvider>
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
