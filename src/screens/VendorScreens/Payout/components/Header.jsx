import React from "react";
import { StyleSheet, View } from "react-native";
import { HeaderContainer, HeaderTitle } from "../../components";

export const Header = () => {
	return (
		<HeaderContainer>
			<HeaderTitle style={styles.title} value="Payout" />

			<View style={{ height: 26.6 }}></View>
		</HeaderContainer>
	);
};

const styles = StyleSheet.create({});
