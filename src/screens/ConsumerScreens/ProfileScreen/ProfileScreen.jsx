import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Profile } from "./component/Profile";

export const ProfileScreen = () => {
  return (
    <View style={styles.body}>
      <Profile />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
