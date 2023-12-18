import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import Heart from "../../../assets/heart.png";
import HeartBold from "../../../assets/heartbold.png";
import Pizza from "../../../assets/pizza.png";
export const SearchCard = ({ spotName, img, deliveryFee, minOrder, id }) => {
  const [fav, setFav] = useState(false);
  return (
    <View style={styles.container} key={id}>

      <View style={styles.subContainer}>
        <Image
          source={img}
          style={{ width: 80, height: 50, borderRadius: 12 }}
        />
        <View>
          <Text style={{ fontSize: 16, fontWeight: 400 }}>{spotName}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 10 }}>4.2</Text>
            <Text style={{ fontSize: 10, marginLeft: 6 }}>min- order</Text>
            <Text style={{ fontSize: 10, marginLeft: 6 }}>{minOrder}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 10 }}>Delivery Fee</Text>
            <Text style={{ fontSize: 10, marginLeft: 6 }}>{deliveryFee}</Text>
          </View>
        </View>
      </View>
      <Pressable onPress={() => setFav((prev) => !prev)}>
        <Image
          source={fav ? HeartBold : Heart}
          style={{ width: 14, height: 14 }}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical:5
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
