import React from "react";
import { View,ScrollView, Text,Image, StyleSheet } from "react-native";
import Pizza from "../../../assets/pizza.png";
import Spag from "../../../assets/spag.png";
import Rice from "../../../assets/rice.png";
export const Nearest = () => {
  return (
    <View style={styles.body}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text
          style={{ fontSize: 24, fontWeight: 500, marginLeft: 5 }}
        >
          Nearest Restaurant
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
          <Image source={Pizza} style={styles.foodImage} />
          <Text style={styles.vendorName}>Abdullah's Pizza</Text>
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
          <Image source={Pizza} style={styles.foodImage} />
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
