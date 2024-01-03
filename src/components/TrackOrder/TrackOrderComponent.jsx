import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import TickOrange from "../../../assets/tickOrange.png";
import TickBlack from "../../../assets/tickBlack.png";

export const TrackOrderComponent = () => {
  const orderComponents = [
    {
      id: 1,
      orderTitle: "Order Accepted",
      orderDescription: "Order has been accepted",
      status: true,
    },
    {
      id: 2,
      orderTitle: "Preparing your Order",
      orderDescription: "Order is been prepared",
      status: true,
    },
    {
      id: 3,
      orderTitle: "Waiting for Pickup",
      orderDescription: "Order is ready for pick up",
      status: false,
    },
    {
      id: 4,
      orderTitle: "Order in transit",
      orderDescription: "Rider in transit with your order",
      status: false,
    },
    {
      id: 5,
      orderTitle: "Order arrived",
      orderDescription: "Order is at your location",
      status: false,
    },
  ];
  return (
    <View style={styles.body}>
      <View style={styles.deliveryTime}>
        <Text style={{ color: "#00000099", fontSize: 10, fontWeight: "500" }}>
          Delivery Time
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>17 Mins</Text>
      </View>

      {orderComponents.map((order) => (
        <View style={styles.orderProgress} key={order.id}>
          <View style={{ flexDirection: "row", gap: 15 }}>
             <Image
              source={order.status ? TickOrange : TickBlack}
              style={{ width: 15, height: 15 }}
            /> 
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: order.status ? "#FD832A" : "#00000099",
                }}
              >
                {order.orderTitle}
              </Text>
              <Text
                style={{ fontSize: 14, color: "#00000099", fontWeight: "300" }}
              >
                {order.orderDescription}
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 10, fontWeight: 400 }}>
            {order.status ? "11.02am" : "..."}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    width: "100%",
    elevation: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 20,
    padding: 17,
  },
  deliveryTime: {
    height: 50,
    justifyContent: "space-between",
  },
  orderProgress: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 20,
  },
});
