import { Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { SignUp } from "./ConsumerSignUp/SignUp";
import { Login } from "./ConsumerLogin/Login";
import { HomeScreen } from "./HomeScreen/HomeScreen";
import { VendorScreen } from "./VendorFoodScreen/VendorScreen";
import { Checkout } from "./CheckoutScreen/Checkout";
import { OrderSuccess } from "./OrderSuccessScreen/OrderSuccess";
import { Search } from "./SearchScreen/Search";
import { Carts } from "./CartScreen/Carts";
import { ProfileScreen } from "./ProfileScreen/ProfileScreen";
import { TrackOrder } from "./TrackOrder/TrackOrder";
import React from "react";
import { AuthProvider } from "./Authentication";

import ArrowLeft from "../../../assets/arrow-left.png";


const ConsumerScreens = () => {
  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </AuthProvider>
  );
};

export default ConsumerScreens;
