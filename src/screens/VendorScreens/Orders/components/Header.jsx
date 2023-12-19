import React from "react";
import { View, StyleSheet} from "react-native";
import {
	HeaderContainer,
	HeaderTitle,
	SmTransparentButton,
} from "../../components";

export const Header = ({ selectTab }) => {
	const subPages = [
		{
			key: 1,
			title: "Received Orders",
			count: 0,
		},
		{
			key: 2,
			title: "Pre-Order",
			count: 0,
		},
		{
			key: 3,
			title: "Accepted Orders",
			count: 0,
		},
		{
			key: 4,
			title: "In-transit",
			count: 0,
		},
	];

	return (
		<HeaderContainer>
			<HeaderTitle style={styles.title} value="Orders" />

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
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,

		width: "100%",
		overflow: "scroll",
	},
});
