import React from "react";
import { View, StyleSheet } from "react-native";
import {
	HeaderContainer,
	HeaderTitle,
	SmTransparentButton,
} from "../../components";

export const Header = ({ selectTab }) => {
	const subPages = [
		{
			key: 1,
			title: "All",
			count: 0,
		},
		{
			key: 2,
			title: "Available",
			count: 0,
		},
		{
			key: 3,
			title: "Unavailable",
			count: 0,
		},
		{
			key: 4,
			title: "Add to menu",
			count: 0,
		},
	];

	return (
		<HeaderContainer>
			<HeaderTitle style={styles.title} value="Menu" />

			<View style={styles.tabsBtns}>
				{subPages.map((page) => (
					<SmTransparentButton
						key={page.key}
						value={`${page.title} (${page.count})`}
						onPress={() => selectTab(page.key)}
					/>
				))}
			</View>
		</HeaderContainer>
	);
};

const styles = StyleSheet.create({
	tabsBtns: {
		
		textAlign:"center",
		
		flexDirection: "row",
		alignItems: "center",
		gap: 10,

		width: "100%",

	},
});
