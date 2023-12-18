import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Main1 } from "./MainScreen1/Main1";
import { Main2 } from "./MainScreen2/Main2";

export const OpeningScreen = () => {
	const [nextScreen, setNextScreen] = useState(1);

	useEffect(() => {
		// Toggle between components after a specified time interval
		const timeout = setTimeout(() => {
			setNextScreen(2);
		}, 5000); // Toggle every 5 seconds (adjust the duration as needed)
		// console.log(timeout);

		return () => clearTimeout(timeout);
	}, [nextScreen]);

	return (
		<View style={styles.body}>
			{nextScreen === 1 ? <Main1 /> : <Main2 />}
		</View>
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: "#FF6600",
	},
});
