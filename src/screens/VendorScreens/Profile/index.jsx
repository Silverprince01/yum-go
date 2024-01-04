import React from "react";
import {
	View,
	StyleSheet,
	Text,
	Pressable,
	Image,
	ScrollView,
} from "react-native";
import { Header } from "./components";
import { FooterNav } from "../components";

export const Profile = () => {
	return (
		<View style={styles.body}>
			<Header />

			<MainContent />

			<FooterNav />
		</View>
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: "#E7E7E7",

		width: "100%",

		position: "relative",
	},
	tabContentContainer: {
		// flex: 1,
		gap: 10,

		width: "100%",

		paddingTop: 19,
		paddingBottom: 9,
		paddingHorizontal: 17,

		marginBottom: 70,
	},
});

import {
	logout1,
	logout,
	documentText,
	locationAdd,
	messages3,
	notification,
	profileCircle,
	shop,
	statusUp,
	wallet,
} from "../_icons/linear";

const MainContent = () => {
	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					alignItems: "center",
					height: 175,
					backgroundColor: "#FFFCFB",
					borderBottomLeftRadius: 12,
					borderBottomRightRadius: 12,

					paddingTop: 24,
					paddingBottom: 9,

					gap: 15,
				}}
			>
				{/* <Image
					source={}
					// style={styles.img}
				/> */}

				<View style={{ gap: 2, alignItems: "center" }}>
					<Text
						style={{
							color: "#000",

							
							fontSize: 20,
							fontWeight: "500",
							lineHeight: 27 /* 135% */,
						}}
					>
						Account profile
					</Text>

					<Text
						style={{
							color: "#000",

							
							fontSize: 10,
							fontWeight: "300",
							lineHeight: 14 /* 140% */,
							letterSpacing: -0.408,
						}}
					>
						Account profile
					</Text>

					<Text
						style={{
							color: "#000",
							
							fontSize: 12,
							fontWeight: "400",
							lineHeight: 15,
						}}
					>
						Account profile
					</Text>
				</View>
			</View>

			<ScrollView style={styles.tabContentContainer}>
				<View style={{ gap: 8 }}>
					<Text>Account profile</Text>

					<CPressable
						icon={profileCircle}
						title={"Account details"}
						fullRound
					/>
				</View>

				<View style={{ gap: 8 }}>
					<Text>Restaurant profile</Text>

					<View>
						<CPressable
							icon={shop}
							title={"Restaurant details"}
							topRound
							lineBottom
						/>

						<CPressable
							icon={documentText}
							title={"Restaurant operations"}
							lineBottom
						/>

						<CPressable
							icon={wallet}
							title={"Payment information"}
							lineBottom
						/>

						<CPressable
							icon={statusUp}
							title={"Insight"}
							lineBottom
						/>

						<CPressable
							icon={locationAdd}
							title={"Add new locations"}
							lineBottom
						/>

						<CPressable
							icon={logout}
							title={"Switch restaurant"}
							bottomRound
						/>
					</View>
				</View>

				<View style={{ gap: 8 }}>
					<CPressable
						icon={notification}
						title={"Notifications"}
						fullRound
					/>

					<CPressable
						icon={messages3}
						title={"Device support"}
						fullRound
					/>

					<CPressable icon={logout1} title={"Logout"} fullRound />
				</View>
			</ScrollView>
		</View>
	);
};

import arrowRightIcon from "../_icons/arrowRightIcon.svg";

const CPressable = ({
	icon,
	title,
	fullRound,
	topRound,
	bottomRound,
	lineBottom,
}) => {
	console.log(icon);

	return (
		<Pressable
			style={[
				fullRound && cPressableStyles.fullRound,
				topRound && cPressableStyles.topRound,
				bottomRound && cPressableStyles.bottomRound,
				lineBottom && cPressableStyles.lineBottom,
				{
					flexDirection: "row",
					paddingVertical: 10,
					paddingHorizontal: 19,
					backgroundColor: "white",
				},
			]}
		>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					alignItems: "center",
					gap: 8,
				}}
			>
				<Image
					source={icon}
					// style={styles.img}
				/>

				<Text>{title}</Text>
			</View>

			<Image
				source={arrowRightIcon}
				// style={styles.img}
			/>
		</Pressable>
	);
};

const cPressableStyles = StyleSheet.create({
	fullRound: {
		borderRadius: 10,
	},
	topRound: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	bottomRound: {
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	lineBottom: {
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
});
