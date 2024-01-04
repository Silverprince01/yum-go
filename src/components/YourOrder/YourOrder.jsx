import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const YourOrder = ({ orders, totalP, sume, vendor }) => {
  return (
    <View>
      <Text style={styles.title}>Your Order</Text>
      <View style={styles.body}>
        {/* packs */}
        {orders.map((orde, id) => {
          return (
            <View key={id} style={styles.packBottom}>
              <View style={styles.pack}>
                <View>
                  <Text style={styles.packText}> Pack {id + 1}</Text>

                  <Text style={styles.packItemText}>
                    {orde.order.map((ord) => ord.foodName + ",")}
                  </Text>
                </View>

                <Text style={styles.textPrice}>#{totalP[id]}</Text>
              </View>
            </View>
          );
        })}
        {/* total package */}
        <View style={styles.packBottom}>
          <View style={styles.pack}>
            <Text style={{ marginVertical: 5 }}>Pack</Text>
            <Text style={[styles.textPrice, { marginVertical: 5 }]}>#200</Text>
          </View>
          <View style={styles.pack}>
            <Text style={{ marginVertical: 5 }}>Delivery</Text>
            <Text style={[styles.textPrice, { marginVertical: 5 }]}>
              #{vendor?.deliveryFee}
            </Text>
          </View>
          <View style={styles.pack}>
            <Text style={{ marginVertical: 5, fontSize: 14 }}>Total</Text>
            <Text style={[styles.textPrice, { marginVertical: 5 }]}>
              #{totalP ? sume + 200 + Number(vendor?.deliveryFee) : 0}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
// #00000040
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  body: {
    backgroundColor: "white",
    borderRadius: 12,
    marginVertical: 10,
    elevation: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  packBottom: {
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 1,
    padding: 12,
  },
  pack: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  packText: {
    fontSize: 16,
    fontWeight: "500",
  },
  packItemText: {
    fontSize: 10,
    fontWeight: "300",
  },
  deliveryText: {
    fontSize: 16,
    fontWeight: "300",
  },
  img: {
    width: 24,
    height: 24,
  },
  textPrice: {
    fontSize: 12,
    fontWeight: "500",
  },
});
