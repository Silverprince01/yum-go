import React from "react";
import { StyleSheet } from "react-native";
import { HeaderContainer, HeaderTitle } from "../../components";

export const Header = () => {
	return (
		<HeaderContainer>
			<HeaderTitle style={styles.title} value="Profile" />
		</HeaderContainer>
	);
};

const styles = StyleSheet.create({});
