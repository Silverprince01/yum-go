import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { VendorLogin } from "./VendorLogin";
import { VendorSignUp } from "./VendorSignUp";
import { VendorRegister } from "./VendorRegister";
import { Orders } from "./Orders";
import { Menu } from "./Menu";
import { Payout } from "./Payout";
import { Profile } from "./Profile";


const VendorScreens = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
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
	);
};

export default VendorScreens;
