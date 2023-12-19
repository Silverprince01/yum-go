import { View, Image, Text, StyleSheet } from "react-native";
import { OrangeButton } from "../../../components/button/OrangeButton";
import image from "../../../../assets/yumDark.png";
import { useNavigation } from "@react-navigation/native";
export const Main2 = () => {
	const navigation = useNavigation();
	return (
		<View style={styles.body}>
			<View style={styles.imageContainer}>
				<Image source={image} style={styles.image} />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.text}>Your meal in few minutes</Text>
			</View>
			<View style={styles.button}>
				<OrangeButton
					navigation={navigation}
					value={"Get Started"}
					screenName={"Main Screen"}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 1,
		width: "100%",
		backgroundColor: "#FECDAA",
		position: "relative",
	},
	button: {
		padding: 10,
		width: "100%",
		position: "absolute",
		bottom: 0,
	},
	textContainer: {
		marginHorizontal: "auto",
		marginVertical: 100,
	},
	text: {
		color: "black",
		textAlign: "center",
		// fontWeight: 700,
		fontSize: 20,
	},
	imageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 180,
		height: 100,
	},
});
