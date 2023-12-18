import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FoodSlide } from "../../../components/FoodSlide/FoodSlide";
import { Sign } from "./component/Sign";

export const VendorSignUp = () => {
	return (
		<View style={styles.body}>
			<ScrollView>
				<FoodSlide />
				<Sign />
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 1,
		position: "relative",
	},
});
