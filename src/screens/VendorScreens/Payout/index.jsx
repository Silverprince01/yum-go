import React from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "./components";
import { FooterNav } from "../components";

export const Payout = () => {
	return (
		<View style={styles.body}>
			<Header />

			<View style={styles.tabContentContainer}></View>

			<FooterNav />
		</View>
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: "#E7E7E7",
		gap: 6,

		width: "100%",
	},
	tabContentContainer: {
		flex: 1,
		gap: 6,

		width: "100%",

	},
});
