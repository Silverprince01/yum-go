import { StyleSheet, Text, View, Image } from "react-native";
import Call from "../../../../../assets/call.png";
export const TransitsCards = () => {
  const transitOrders = [
    {
      name: "Abdullah",
      orderId: "171632",
      deliveryAddress: "51 Sijuade street, Ijesa Surulere Lagos",
      time: "1:35 PM",
      totalPrice: "1,000.00",
      ordersList: "2 portion of jollof rice, 1 portion of spa...",
    },
    {
      name: "Abdullah",
      orderId: "171632",
      deliveryAddress: "51 Sijuade street, Ijesa Surulere Lagos",

      time: "1:35 PM",
      totalPrice: "1,000.00",
      ordersList: "2 portion of jollof rice, 1 portion of spa...",
    },
  ];

  return (
    <View style={styles.cardsWrapper}>
      {transitOrders.map((order,id) => {
        
        

        return (
          <TransitCards
          key={id}
          order={order}
            // name={name}
            // orderId={orderId}
            // time={time}
            // deliveryAddress={deliveryAddress}
            // ordersList={ordersList}
          />
        );
      })}
    </View>
  );
};

const TransitCards = ({ order }) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={{justifyContent:"space-between", flexDirection:"row", marginVertical:8}}>
        <Text style={{ color: "#949090", fontSize: 10, fontWeight: "400" }}>
          {order.name}-{order.orderId}
        </Text>
        <Text style={{ color: "#949090", fontSize: 10, fontWeight: "400" }}>
          {order.time}
        </Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 12, fontWeight: "400", color: "#151515" }}>
          {order.deliveryAddress}
        </Text>
        <Text style={{ fontSize: 10, fontWeight: "300" }}>{order.ordersList}</Text>
      </View>

      <View style={styles.deliveryUpdate}>
        <View style={{ color: "#151515" }}>
          <Text style={{ fontSize: 12, fontWeight: "400" }}>
            Order in transit - 2:15 pm
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "300" }}>
            Adeyemi is in route to make the delivery
          </Text>
        </View>
        <Image source={Call} style={{ width: 24, height: 24 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: "white",
    elevation: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 12,
    paddingHorizontal: 17,
    paddingVertical: 8,
    marginVertical: 5,
  },
  deliveryUpdate: {
    justifyContent: "space-between",
    alignItems:"center",
    flexDirection: "row",
    borderColor: "#A2A2A2",
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    marginVertical: 8,
  },
});
