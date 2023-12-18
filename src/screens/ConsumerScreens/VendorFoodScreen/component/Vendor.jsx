import React from "react";
import { View, StyleSheet } from "react-native";
import { NavBar } from "../../../../components/NavBar/NavBar";
import { VendorRestaurant } from "../../../../components/VendorRestaurant/VendorRestaurant";
export const Vendor = () => {
  return (
    <View style={styles.body}>
      
        <VendorRestaurant />
      

      <View style={styles.nav}>
        <NavBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    position: "relative",
  },
  nav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
