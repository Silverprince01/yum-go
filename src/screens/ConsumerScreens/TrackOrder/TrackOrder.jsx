import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import { Track } from "./components/Track";
import { NavBar } from "../../../components/NavBar/NavBar";
export const TrackOrder = () => {
  return (
    <View style={styles.body}>
      <ScrollView style={{ paddingBottom: 30 }}>
        <Track />
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <NavBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});
