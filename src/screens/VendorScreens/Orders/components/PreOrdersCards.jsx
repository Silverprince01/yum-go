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
			{orders.map((order,id) => {
				

				return (
					<PreOrdersCard
					order={order}
						key={id}

					/>
				);
			})}
		</View>
	);
};

const PreOrdersCard = ({ order,key }) => {
	return (
		<View key={key} style={styles.cardWrapper}>
			<View style={styles.cardTop}>
				<Text style={styles.cardTopText}>
					{order.name} - Order {order.orderId}
				</Text>

				<Text style={styles.cardTopText}>{order.time}</Text>
			</View>

			<View style={styles.cardMiddle}>
				<View>
					{order.ordersList.map((ord,id) => {
						// const { item, count } = ord;

						return (
							<View
							key={id}
								style={{
									width: 90,
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<Text style={styles.cardMiddleText}>
									{ord.item}
								</Text>

								<Text style={styles.cardMiddleText}>
									x{ord.count}
								</Text>
							</View>
						);
					})}
				</View>

				<View style={styles.cardMiddleLeft}>
					<Text
						style={[styles.cardMiddleText, { textAlign: "right" }]}
					>
						{order.totalPrice}
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
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: 400,
	},
	cardMiddle: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	cardMiddleText: {
		color: "#151515",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: 500,
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
		color: "#fff",
		// textAlign: "center",
		// fontSize: 18,
		// fontStyle: "normal",
		// fontWeight: "400",
		
	},
});
