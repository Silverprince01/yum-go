import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import { database } from "../../firebaseConfig";
import { Text, View, ScrollView, Image, StyleSheet } from "react-native";
import Pen from "../../../assets/pen.png";
import Location from "../../../assets/location.png";
import Spag from "../../../assets/spag.png";
import Rice from "../../../assets/rice.png";
import Clock from "../../../assets/clock.png";
import { AuthContext } from "../../screens/ConsumerScreens/Authentication";
export const Recent = () => {
  const userId = firebase.auth().currentUser;
  const { consumer } = useContext(AuthContext);
  const [consumers, setConsumers] = consumer;
  const consumerCollection = database.collection("consumers");
  const consumerData = async () => {
    try {
      const consumerData = await consumerCollection.doc(userId.uid).get();

      const dat = consumerData.data();
      setConsumers(dat);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    consumerData();
  }, []);
  return (
    <View style={styles.body}>
      <View style={styles.adddress}>
        <View style={styles.location}>
          <Image source={Location} style={styles.icon} />

          <Text style={{ marginLeft: 5, fontSize: 10 }}>
            {consumers?.address}
          </Text>
        </View>
        <Image source={Pen} style={styles.icon} />
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <Image source={Clock} style={{ width: 24, height: 24 }} />
        <Text style={{ fontSize: 24, fontWeight: 500, marginLeft: 5 }}>
          Recent
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <View style={styles.vendorContainer}>
          <Image source={Rice} style={styles.foodImage} />
          <Text style={styles.vendorName}>Mama-tee’s Kitchen</Text>
          <View style={styles.order}>
            <Text style={styles.orderText}>Min-Order</Text>
            <Text style={styles.orderText}>#1,500</Text>
          </View>
          <View style={styles.order}>
            <Text style={styles.orderText}>Delivery Fee</Text>
            <Text style={styles.orderText}>#200</Text>
          </View>
        </View>
        <View style={styles.vendorContainer}>
          <Image source={Spag} style={styles.foodImage} />
          <Text style={styles.vendorName}>Kemi's Spag</Text>
          <View style={styles.order}>
            <Text style={styles.orderText}>Min-Order</Text>
            <Text style={styles.orderText}>#2,500</Text>
          </View>
          <View style={styles.order}>
            <Text style={styles.orderText}>Delivery Fee</Text>
            <Text style={styles.orderText}>#300</Text>
          </View>
        </View>
        <View style={styles.vendorContainer}>
          <Image source={Rice} style={styles.foodImage} />
          <Text style={styles.vendorName}>Fuad's Delicacy</Text>
          <View style={styles.order}>
            <Text style={styles.orderText}>Min-Order</Text>
            <Text style={styles.orderText}>#2,500</Text>
          </View>
          <View style={styles.order}>
            <Text style={styles.orderText}>Delivery Fee</Text>
            <Text style={styles.orderText}>#300</Text>
          </View>
        </View>
        <View style={styles.vendorContainer}>
          <Image source={Spag} style={styles.foodImage} />
          <Text style={styles.vendorName}> Abdullah's Kitchen</Text>
          <View style={styles.order}>
            <Text style={styles.orderText}>Min-Order</Text>
            <Text style={styles.orderText}>#2,500</Text>
          </View>
          <View style={styles.order}>
            <Text style={styles.orderText}>Delivery Fee</Text>
            <Text style={styles.orderText}>#300</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  adddress: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 12,
    height: 12,
  },
  vendorContainer: {
    paddingRight: 8,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: 700,
    marginTop: 5,
  },
  order: {
    width: 90,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  orderText: {
    fontSize: 12,
  },
  foodImage: {
    width: 170,
    height: 100,
    borderRadius: 12,
  },
});
