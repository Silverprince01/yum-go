import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Cart } from "./components/Cart";

export const Carts = () => {
  return (
    <View style={styles.body}>
      <Cart />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
