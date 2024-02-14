import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import firebase from "firebase/compat/app";
import { database } from "../../../../firebaseConfig";
import Back from "../../../../../assets/arrow-left.png";
import { YourOrder } from "../../../../components/YourOrder/YourOrder";
import { OrderInfo } from "../../../../components/OrderInfo/OrderInfo";
import { AuthContext } from "../../Authentication";
import { OrangeButton } from "../../../../components/button/OrangeButton";
export const Check = () => {
  const [orders, setOrders] = useState([]);
  const [totalP, setTotalP] = useState(0);
  const [vendor, setVendor] = useState({});
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [sume, setSum] = useState(0);
  const navigation = useNavigation();
  const { vendorIdentity } = useContext(AuthContext);
  const [vendorId] = vendorIdentity;
  const userId = firebase.auth().currentUser;
  const orderCollections = database.collection("orders");
  const vendorCollection = database.collection("vendors");

  const getOrders = async () => {
    try {
      const orderData = await orderCollections.doc(userId.uid).get();
      const vendorData = await vendorCollection.doc(vendorId).get();
      const dat = vendorData.data();
      setVendor(dat);

      // getOrders

      console.log(orderData.data());
      setOrders(orderData.data().orderss);

      setOrders(orderData.data().orderss);

      const totalOrder = orderData.data().orderss.map((order) => {
        setAccepted(order.accepted);
        const multiply = order.order.reduce((acc, item) => {
          return acc + item.count * Number(item.price);
        }, 0);
        return multiply;
      });

      const sum = totalOrder.reduce((acc, result) => {
        return acc + result;
      }, 0);
      console.log(sum);
      setSum(sum);
      console.log(totalOrder);
      setTotalP(totalOrder);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  const sendOrder = async () => {
    try {
      setLoading(true);
      const orderCollection = database.doc(`orders/${userId.uid}`);
      // console.log(orderCollection);

      orderCollection.get().then((doc) => {
        if (doc.exists) {
          // Get the array as an array of objects
          const dataArray = doc.data().orderss;

          // Map over each object in the array
          const updatedArray = dataArray.map((obj, id) => {
            // Update the boolean value to true
            obj.confirmation = true;
            // Add a new value
            obj.total = totalP[id];

            obj.accepted = false;

            return obj;
          });

          // Update the entire array in the document
          orderCollection.update({ orderss: updatedArray });
          navigation.navigate("Order Success");
        } else {
          console.log("Document does not exist");
        }
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <ScrollView>
      <View style={styles.body}>
        {/* <View style={styles.head}>
          <View style={styles.checkout}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image source={Back} style={styles.img} />
            </Pressable>
            <Text>Checkout</Text>
          </View>
        </View> */}
        {/* your order */}
        <View style={styles.pad}>
          <YourOrder
            orders={orders}
            totalP={totalP}
            sume={sume}
            vendor={vendor}
          />
        </View>
        {accepted && <Text> Your order has been accepted</Text>}
        <View style={styles.pad}>
          <OrderInfo />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            paddingHorizontal: 17,
            paddingVertical: 10,
          }}
        >
          <OrangeButton
            value="Confirm Order"
            loading={loading}
            sendOrder={totalP === 0 ? () => alert("hold on") : sendOrder}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pad: {
    paddingHorizontal: 17,
    paddingVertical: 10,
  },
  head: {
    backgroundColor: "white",
    width: "100%",
    height: 56,
    justifyContent: "center",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 10,
  },
  checkout: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "55%",
  },
  img: {
    width: 24,
    height: 24,
  },
  body: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    position: "relative",
  },
});
