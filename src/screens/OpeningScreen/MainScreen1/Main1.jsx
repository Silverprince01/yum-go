import { StyleSheet, View, Image } from "react-native";
import LogoWhite from "../../../../assets/yumWhite.png";
export const Main1 = () => {
	return (
		<View style={styles.background}>
			<Image style={styles.image} source={LogoWhite} />
		</View>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: "#FF6600",
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: 180,
		height: 100,
	},
});
