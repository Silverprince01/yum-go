import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import firebase from "firebase/compat/app";
import { database } from "../../firebaseConfig";
import { AuthContext } from "../../screens/ConsumerScreens/Authentication";
export const Packs = () => {
  const { vendorIdentity } = useContext(AuthContext);
  const [vendorId, setVendorId] = vendorIdentity;
  const [orders, setOrders] = useState([]);
  const [totalP, setTotalP] = useState(0);
  const orderCollections = database.collection("orders");
  const userId = firebase.auth().currentUser;
  const getOrders = async () => {
    try {
      const orderData = await orderCollections.doc(userId.uid).get();

      
      setOrders(orderData.data().orderss);

      const totalOrder = orderData.data().orderss.map((order) => {
        const multiply = order.order.reduce((acc, item) => {
          return acc + item.count * Number(item.price);
        }, 0);
        return multiply;
      });

      console.log(totalOrder);
      setTotalP(totalOrder);

      orderData.data().orderss.forEach((orde) => {
        
        orde?.order.forEach((ord) => {
          
          setVendorId(ord.to);
        });
      });
      
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 500,
          marginBottom: 20,
          paddingHorizontal: 17,
          
        }}
      >
        Your Order
      </Text>
      <View style={{  flex: 1, paddingBottom:40 }}>
        {orders?.map((orde, id) => {
          return (
            <View key={id} style={styles.body}>
              <View style={styles.bottomBorder}>
                <View style={{ paddingHorizontal: 17, paddingVertical: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    Pack {id + 1}
                  </Text>
      
                </View>
              </View>
              {/* food items */}

              {orde.order.map((pac, id) => {
                return (
                  <View key={id} style={styles.foodItem}>
                    <View>
                      <View>
                        <Text style={{ fontSize: 12, fontWeight: 500 }}>
                          {pac.foodName}
                        </Text>
                        <Text style={{ fontSize: 10, fontWeight: 300 }}>
                          {pac.per === "per portion"
                            ? "A portion of"
                            : "A unit of"}
                          {pac.foodName}
                        </Text>
                        <Text style={{ fontSize: 10, fontWeight: 300 }}>
                          # {pac.price}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.priceBox}>
                      <Text style={styles.number}>x{pac.count}</Text>
                      <View style={styles.price}>
                        <Text style={{ color: "white", fontSize: 12 }}>
                          #{pac.price}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
              {/* total */}
              <View style={styles.total}>
                <Text>Total</Text>
                <Text>#{totalP[id]}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    borderRadius: 32,
    marginVertical: 10,
    elevation: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  bottomBorder: {
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 1,
  },
  order: {
    paddingHorizontal: 17,
  },
  foodItem: {
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 1,
    paddingHorizontal: 17,
    paddingVertical: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  priceBox: {
    borderColor: "#FF6600",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    width: 59,
    height: 38,
  },
  number: {
    fontSize: 16,
    // color: "white",
  },
  price: {
    backgroundColor: "#FF6600",
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  total: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    paddingVertical: 10,
  },
});
