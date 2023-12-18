import React from "react";
import { View, StyleSheet } from "react-native";
import { Success } from "./component/Success";

export const OrderSuccess = () => {
  return (
    <View style={styles.body}>
      <Success />
    </View>
  );
};


const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});
