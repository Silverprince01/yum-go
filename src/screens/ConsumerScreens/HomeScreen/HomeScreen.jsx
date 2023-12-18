import React from "react";
import { View,StyleSheet } from "react-native";
import { Home } from "./components/Home";
export const HomeScreen = () => {
  return (
    <View style={styles.body}>
      <Home />
    </View>
  );
};
const styles = StyleSheet.create({
  body:{
    flex:1
  }
})