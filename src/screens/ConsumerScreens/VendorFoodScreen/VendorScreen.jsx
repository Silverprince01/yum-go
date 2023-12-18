import React from "react";
import { View, StyleSheet } from "react-native";
import { Vendor } from "./component/Vendor";
export const VendorScreen = () => {
  return (
    <View style={styles.body}>
      <Vendor />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});
