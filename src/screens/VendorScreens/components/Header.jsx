import React from "react";
import { View, StyleSheet, Text } from "react-native";

export const HeaderContainer = ({ children }) => {
	return <View style={headerContainerStyles.header}>{children}</View>;
};

const headerContainerStyles = StyleSheet.create({
	header: {
		gap: 10,

		padding: 17,
		paddingTop: 50,

		// borderStartStartRadius: 32,
		// borderStartEndRadius: 32,
		borderEndStartRadius: 12,
		borderEndEndRadius: 12,
		backgroundColor: "#FFFCFB",
		// shadowOffset: "0px 2px 8px",
		shadowOffset: 8,
		shadowOpacity: 0,
		shadowColor: "rgba(0, 0, 0, 0.25)",

		width: "100%",
		overflow: "hidden",
	},
});

export const HeaderTitle = ({ value }) => {
	return <Text style={headerTitleStyles.title}>{value}</Text>;
};

const headerTitleStyles = StyleSheet.create({
	title: {
		color: "#000",
		fontFamily: "Roboto",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: 400,
		lineHeight: 27,
	},
});

import { useState } from "react";
import {
	Pressable,
	// Text, StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export const SmTransparentButton = ({
	value,
	screenName,
	onPress,
	onPressIn,
	onPressOut,
}) => {
	const navigation = useNavigation();
	const [isPressed, setPressed] = useState(false);

	const handlePress = () => {
		setPressed(true);
		if (onPressIn) onPressIn();
	};

	const handleRelease = () => {
		setPressed(false);
		if (screenName) navigation.navigate(screenName);
		if (onPressOut) onPressOut();
	};

	return (
		<Pressable
			onPress={() => onPress()}
			onPressOut={handleRelease}
			onPressIn={handlePress}
			style={[btnStyles.button, isPressed && btnStyles.buttonPressed]}
		>
			<Text style={[btnStyles.text, isPressed && btnStyles.textPressed]}>
				{value}
			</Text>
		</Pressable>
	);
};
const btnStyles = StyleSheet.create({
	button: {
		backgroundColor: "transparent",
		paddingVertical: 6,
		paddingHorizontal: 5,
		borderRadius: 6,
		borderColor: "#FF6600",
		borderWidth: 1,
	},
	buttonPressed: {
		backgroundColor: "#FF6600",
	},
	text: {
		fontSize: 10,
		fontWeight: 400,
		color: "#F60",
	},
	textPressed: {
		color: "white",
	},
});
