import React, { useEffect, useRef, useState } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import {
	orderIcon,
	orderIconSelected,
	menuIcon,
	menuIconSelected,
	payoutIcon,
	payoutIconSelected,
	profileIcon,
	profileIconSelected,
} from "../_icons/navIcons";
import { useNavigation, useRoute } from "@react-navigation/native";

export const FooterNav = () => {
	const navigation = useNavigation();
	const route = useRoute();

	const handlePress = (name) => {
		navigation.navigate(name);
	};

	useEffect(() => {
		// const currentScreen = navigation.getState();
		// const currentScreen = navigation.navigate({});

		console.log(route.name);
	}, [route]);

	return (
		<View style={styles.nav}>
			<Pressable
				onPress={() => {
					handlePress("Vendor Orders");
				}}
			>
				<Image
					source={
						route.name != "Vendor Orders"
							? orderIcon
							: orderIconSelected
					}
					style={styles.img}
				/>
				<Text
					style={[
						styles.text,
						route.name == "Vendor Orders" && styles.currentRoute,
					]}
				>
					Order
				</Text>
			</Pressable>

			<Pressable
				onPress={() => {
					handlePress("Vendor Menu");
				}}
			>
				<Image
					source={
						route.name != "Vendor Menu"
							? menuIcon
							: menuIconSelected
					}
					style={styles.img}
				/>
				<Text
					style={[
						styles.text,
						route.name == "Vendor Menu" && styles.currentRoute,
					]}
				>
					Menu
				</Text>
			</Pressable>

			<Pressable
				onPress={() => {
					handlePress("Vendor Payout");
				}}
			>
				<Image
					source={
						route.name != "Vendor Payout"
							? payoutIcon
							: payoutIconSelected
					}
					style={styles.img}
				/>
				<Text
					style={[
						styles.text,
						route.name == "Vendor Payout" && styles.currentRoute,
					]}
				>
					Payout
				</Text>
			</Pressable>

			<Pressable
				onPress={() => {
					handlePress("Vendor Profile");
				}}
			>
				<Image
					source={
						route.name != "Vendor Profile"
							? profileIcon
							: profileIconSelected
					}
					style={styles.img}
				/>
				<Text
					style={[
						styles.text,
						route.name == "Vendor Profile" && styles.currentRoute,
					]}
				>
					Profile
				</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	nav: {
		position: "absolute",
		bottom: 0,

		// flex: 1,
		flexDirection: "row",
		padding: 18,
		justifyContent: "space-between",
		alignItems: "center",
		alignContent: "center",
		backgroundColor: "white",
		height: 70,
		width: "100%",
	},
	img: {
		width: 16,
		height: 16,
		marginBottom: 5,
		margin: "auto",
	},
	text: {
		fontSize: 14,
	},
	currentRoute: {
		color: "#F60",
	},
});
