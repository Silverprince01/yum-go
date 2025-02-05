import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Pressable,
  Animated,
  ScrollView,
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

  const vendorCollection = database.collection("vendors");
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = vendor;
  const [menu, setMenu] = useState(null);

  const [orderItems, setOrderItems] = useState([]);
  const [smallOrder, setSmallOrder] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const slideIn = () => {
    setIsVisible(true);
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: false,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: false,
    }).start(() => {
      setIsVisible(false);
    });
  };

  useEffect(() => {
    if (isVisible) {
      const timeoutId = setTimeout(() => {
        slideOut();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isVisible]);

  const addItem = (orderItem) => {
    const existingObjectIndex = orderItems?.findIndex(
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
      // AsyncStorage.setItem("orderItems", JSON.stringify(orderItems));
    }
  };

  const proceedToCheckout = async () => {
    setLoading(true);
    const total = orderItems?.reduce((accumulator, obj) => {
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
      setLoading(false);
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
      <ImageBackground
        source={{ uri: vendors?.image }}
        style={styles.imgbackground}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={{ uri: Back }} style={styles.arowBack} />
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

      {/* Avalaible Foods */}
      {orderItems?.map((order, id) => {
        <View
          key={id}
          style={{ width: 40, height: 40, backgroundColor: "red" }}
        >
          <Image
            source={{ uri: order.image }}
            style={{ width: 30, height: 20 }}
          />
          <Text style={{ color: "blue" }}>X{order.count}</Text>
        </View>;
      })}
      <Text style={{ color: "red", fontSize: 18 }}>
        {smallOrder
          ? "You are ordering below the minimum order, Kindly add more item(s)"
          : null}
      </Text>
      <Animated.View
        style={{
          position: "absolute",

          top: 50,
          right: 0,
          zIndex: 5,
          transform: [
            {
              translateY: slideAnimation.interpolate({
                inputRange: [0, 10],
                outputRange: [100, 0],
              }),
            },
          ],
        }}
      >
        {isVisible && (
          <View
            style={{
              backgroundColor: "#FF6600",
              padding: 10,
              borderRadius: 8,
            }}
          >
            <Text>Food Item Added</Text>
          </View>
        )}
      </Animated.View>

      <ScrollView style={{ marginBottom: 120 }}>
        {menu?.map((menuItem, id) => {
          return (
            <View key={id} style={styles.foodBackground}>
              <View style={styles.foodBody}>
                <View style={styles.food}>
                  <View>
                    <Text style={styles.foodText}>{menuItem.foodName}</Text>
                    <Text style={styles.foodDesc}>
                      {menuItem.per === "per portion"
                        ? "A portion of"
                        : "A unit of"}{" "}
                      of {menuItem.foodName}
                    </Text>
                    <Text style={styles.foodDesc}>#{menuItem.price}.00</Text>
                  </View>
                  <Pressable
                    onPress={() => {
                      addItem(menuItem);
                      slideIn();
                    }}
                    style={styles.foodImg}
                  >
                    <Image
                      source={{ uri: menuItem.image }}
                      style={{ width: 59, height: 36 }}
                    />
                    <View style={styles.foodAdd}>
                      <View>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 300,
                            color: "white",
                          }}
                        >
                          Add
                        </Text>
                      </View>
                      <Image
                        source={Add}
                        style={{ width: 10, height: 10, marginLeft: 5 }}
                      />
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      {/* <View style={{ width: 100, height: 100, backgroundColor: "red" }}> */}

      {/* </View> */}

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
    fontWeight: "700",
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
    fontWeight: "500",
  },
  foodDesc: {
    fontSize: 10,
    fontWeight: "300",
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
