import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import "firebase/auth";
import firebase from "firebase/compat/app";
import { AuthContext } from "../../screens/ConsumerScreens/Authentication";

import { database } from "../../firebaseConfig";
import { getDoc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import Back from "../../../assets/arrow-left.png";
import Add from "../../../assets/add.png";
import { OrangeButton } from "../button/OrangeButton";

export const VendorRestaurant = () => {
  const userId = firebase.auth().currentUser;

  const navigation = useNavigation();
  const { vendorIdentity, vendor } = useContext(AuthContext);
  const [vendorId] = vendorIdentity;
  // const [vendors, setVendors] = vendor;
  const vendorCollection = database.collection("vendors");
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = vendor;
  const [menu, setMenu] = useState(null);

  const [orderItems, setOrderItems] = useState([]);
  const [smallOrder, setSmallOrder] = useState(false);

  const addItem = (orderItem) => {
    const existingObjectIndex = orderItems.findIndex(
      (item) => item.foodName === orderItem.foodName
    );

    if (existingObjectIndex !== -1) {
      // If the object exists, increase the count property
      const updatedArray = [...orderItems];
      updatedArray[existingObjectIndex].count =
        (updatedArray[existingObjectIndex].count || 0) + 1;
      setOrderItems(updatedArray);
    } else {
      // If the object does not exist, create the count property
      orderItem.count = 1;
      orderItem.from = userId.uid;
      orderItem.to = vendorId;

      // Update the state by adding the new object to the array
      setOrderItems((prevArray) => [...prevArray, orderItem]);
    }
  };

  const proceedToCheckout = async () => {
    setLoading(true);

    const total = orderItems.reduce((accumulator, obj) => {
      const operate = Number(obj.price) * Number(obj.count);
      return accumulator + operate;
    }, 0);

    const orderCollection = database.doc(`orders/${userId.uid}`);
    if (total >= vendors?.minOrder) {
      const orders = {
        confirmation: false,
        order: orderItems,
      };
      try {
        const docSnap = await getDoc(orderCollection);

        if (docSnap.exists()) {
          // database.
          await updateDoc(orderCollection, {
            orderss: arrayUnion(orders),
          });
          console.log("Document successfully updated!");
        } else {
          await setDoc(orderCollection, {
            orderss: [orders],
          });
          console.log("Document successfully created!");
        }
        setLoading(false);
        navigation.navigate("Carts");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setSmallOrder(true);
    }
    console.log(smallOrder);
  };
  const vendorData = async () => {
    try {
      const vendorData = await vendorCollection.doc(vendorId).get();

      const dat = vendorData.data();
      setVendors(dat);
      setMenu(dat.menuDescription);
      console.log(vendorId, ":successfully logged in");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    vendorData();
  }, []);
  return (
    <View style={styles.body}>
      <ImageBackground source={vendors?.image} style={styles.imgbackground}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={Back} style={styles.arowBack} />
        </Pressable>

        <View style={styles.text}>
          <View style={styles.imgTextContainer}>
            <View>
              <Text style={styles.vendorName}>{vendors?.businessName}</Text>

              <View style={styles.order}>
                <Text style={styles.orderText}>Min-Order</Text>
                <Text style={styles.orderText}>{vendors?.minOrder}.00</Text>
              </View>
              <View style={styles.order}>
                <Text style={styles.orderText}>Delivery Fee </Text>
                <Text style={styles.orderText}>{vendors?.deliveryFee}.00</Text>
              </View>
            </View>

            <Text style={styles.available}>Closed</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Pack Size */}
      <View style={styles.packBody}>
        {orderItems.map((order, id) => {
          <ImageBackground
            key={id}
            source={order.image}
            style={{ width: 30, height: 20 }}
          >
            <Text>X{order.count}</Text>
          </ImageBackground>;
        })}
        {/* <Text style={styles.packText}>Pack Size</Text>
        <View style={styles.pack}>
          <View style={styles.packBackground}>
            <Image source={Add} style={styles.add} />
            <Text style={{ fontSize: 12, fontWeight: 400, color: "white" }}>
              Foil Pack
            </Text>
          </View>
          <View style={styles.packBackground}>
            <Image source={Add} style={styles.add} />
            <Text style={{ fontSize: 12, fontWeight: 400, color: "white" }}>
              Small Pack
            </Text>
          </View>
          <View style={styles.packBackground}>
            <Image source={Add} style={styles.add} />
            <Text style={{ fontSize: 12, fontWeight: 400, color: "white" }}>
              Big Pack
            </Text>
          </View>
        </View> */}
      </View>

      {/* Avalaible Foods */}
      <View>
        <Text style={{ color: "red", fontSize: 18 }}>
          {smallOrder
            ? "You are ordering below the minimum order, Kindly add more item(s)"
            : null}
        </Text>
      </View>
      {menu?.map((menuItem, id) => {
        return (
          <View key={id} style={styles.foodBackground}>
            <View style={styles.foodBody}>
              <View style={styles.food}>
                <View>
                  <Text style={styles.foodText}>{menuItem.foodName}</Text>
                  <Text style={styles.foodDesc}>
                    {menuItem.per} of {menuItem.foodName}
                  </Text>
                  <Text style={styles.foodDesc}>#{menuItem.price}.00</Text>
                </View>
                <View style={styles.foodImg}>
                  <Image
                    source={menuItem.image}
                    style={{ width: 59, height: 36 }}
                  />
                  <View style={styles.foodAdd}>
                    <Pressable onPress={() => addItem(menuItem, id)}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 300,
                          color: "white",
                        }}
                      >
                        Add
                      </Text>
                    </Pressable>
                    <Image
                      source={Add}
                      style={{ width: 10, height: 10, marginLeft: 5 }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      })}

      {/* end */}

      <View
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        <OrangeButton
          value={"Proceed to Checkout"}
          proceedToCheckout={proceedToCheckout}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    height: "100%",
  },
  // header
  imgbackground: {
    width: "100",
    height: 202,
    paddingVertical: 10,
    paddingHorizontal: 17,
    position: "relative",
  },
  arowBack: {
    width: 24,
    height: 24,
  },
  text: {
    justifyContent: "center",
    alignItems: "baseline",
    position: "absolute",
    bottom: 10,
    width: "70%",
  },
  imgTextContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  vendorName: {
    fontSize: 20,
    fontWeight: 500,
  },
  order: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
  },
  orderText: {
    fontSize: 12,
    fontWeight: 600,
  },
  available: {
    fontSize: 12,
    fontWeight: 500,
    color: "#FF6600",
  },
  // pack size
  packBody: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 17,
    marginVertical: 10,
  },
  packText: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 12,
  },
  pack: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  add: {
    width: 18,
    height: 18,
  },
  packBackground: {
    backgroundColor: "#FD832A",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    height: 47,
  },

  foodBackground: {
    backgroundColor: "#fff",
    borderRadius: 18,
  },
  foodBody: {
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 1,
  },
  food: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 17,
  },
  foodText: {
    fontSize: 12,
    fontWeight: 500,
  },
  foodDesc: {
    fontSize: 10,
    fontWeight: 300,
  },
  foodImg: {
    justifyContent: "center",
    alignItems: "center",
    width: 59,
    height: 46,
  },
  foodAdd: {
    backgroundColor: "#FD832A",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 10,
  },
});
