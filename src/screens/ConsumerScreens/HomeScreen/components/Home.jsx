import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { NavBar } from "../../../../components/NavBar/NavBar";
import { Recent } from "../../../../components/RecentRestaurant/Recent";
import { Nearest } from "../../../../components/NearestRestaurant/Nearest";

export const Home = () => {
  return (
    <View style={styles.body}>
      <ScrollView style={{paddingBottom:50}}>
        <View>
          <Recent />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Nearest />
        </View>
      </ScrollView>
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
  },
  nav: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});
