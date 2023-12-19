import React from "react";
import { View } from "react-native";
import { FoodSlide } from "../../../components/FoodSlide/FoodSlide";
import { Log } from "./component/Log";

export const VendorLogin = () => {
	return (
		<View>
			<FoodSlide />
			<Log />
		</View>
	);
};
