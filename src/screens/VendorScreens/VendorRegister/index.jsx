import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FoodSlide } from "../../../components/FoodSlide/FoodSlide";
import { Register } from "./component/Register";

export const VendorRegister = () => {
  return (
    <View style={styles.body}>
      <ScrollView>
        <FoodSlide />
        <Register />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    position: "relative",
  },
});
