import { Pressable, StyleSheet, Text, View } from "react-native";

export const PreOrdersCards = () => {
	const orders = [
		{
			name: "Abdullah",
			orderId: "171632",
			time: "1:35 PM",
			totalPrice: "1,000.00",
			ordersList: [
				{
					item: "jollof rice",
					count: "2",
				},
				{
					item: "spag",
					count: "1",
				},
			],
		},
		{
			name: "Abdullah",
			orderId: "171632",
			time: "1:35 PM",
			totalPrice: "1,000.00",
			ordersList: [
				{
					item: "jollof rice",
					count: "2",
				},
				{
					item: "spag",
					count: "1",
				},
			],
		},
	];

	return (
		<View style={styles.cardsWrapper}>
			{orders.map((order) => {
				const { name, orderId, time, totalPrice, ordersList } = order;

				return (
					<PreOrdersCard
						name={name}
						orderId={orderId}
						time={time}
						totalPrice={totalPrice}
						ordersList={ordersList}
					/>
				);
			})}
		</View>
	);
};

const PreOrdersCard = ({ name, orderId, time, totalPrice, ordersList }) => {
	return (
		<View style={styles.cardWrapper}>
			<View style={styles.cardTop}>
				<Text style={styles.cardTopText}>
					{name} - Order {orderId}
				</Text>

				<Text style={styles.cardTopText}>{time}</Text>
			</View>

			<View style={styles.cardMiddle}>
				<View>
					{ordersList.map((ord) => {
						const { item, count } = ord;

						return (
							<View
								style={{
									width: 90,
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<Text style={styles.cardMiddleText}>
									{item}
								</Text>

								<Text style={styles.cardMiddleText}>
									x{count}
								</Text>
							</View>
						);
					})}
				</View>

				<View style={styles.cardMiddleLeft}>
					<Text
						style={[styles.cardMiddleText, { textAlign: "right" }]}
					>
						{totalPrice}
					</Text>

					<Pressable style={styles.acceptBtnCtn}>
						<Text style={styles.acceptBtn}>Accept</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardsWrapper: {
		// flex: 1,

		flexDirection: "column",
		gap: 6,
	},
	cardWrapper: {
		gap: 6,

		paddingVertical: 15,
		paddingHorizontal: 17,

		borderRadius: 12,
		backgroundColor: "#FFFCFB",
	},
	cardTop: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	cardTopText: {
		color: "#949090",
		fontFamily: "Roboto",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: 400,
		lineHeight: "normal",
	},
	cardMiddle: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	cardMiddleText: {
		color: "#151515",
		fontFamily: "Roboto",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: 500,
		lineHeight: "normal",
	},
	cardMiddleLeft: {
		justifyContent: "space-between",
		gap: 5,
	},
	acceptBtnCtn: {
		flex: 1,

		borderRadius: 6,
		backgroundColor: "#FD832A",
		paddingVertical: 12,
		width: 100,
	},
	acceptBtn: {
		color: "#FFF",
		textAlign: "center",
		fontFamily: "Roboto",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: 400,
		lineHeight: "normal",
	},
});
