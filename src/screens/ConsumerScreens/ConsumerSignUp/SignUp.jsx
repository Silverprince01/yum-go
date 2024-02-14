import React from "react";
import { View, StyleSheet } from "react-native";
import { FoodSlide } from "../../../components/FoodSlide/FoodSlide";
import { Sign } from "./component/Sign";

export const SignUp = () => {
  return (
        <View style={styles.body}>
        <FoodSlide />
        <Sign />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});
