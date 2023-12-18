import React from "react";
import { View, StyleSheet } from "react-native";
import { Check } from "./component/Check";
export const Checkout = () => {
  return (
    <View style={styles.body}>
      <Check />
    </View>
  );
};
const styles = StyleSheet.create({
    body:{
      flex:1
    }
  })