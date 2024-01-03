import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Back from "../../../../../assets/arrow-left.png";
import { Packs } from "../../../../components/Packs/Packs";
import { NavBar } from "../../../../components/NavBar/NavBar";
import { OrangeButton } from "../../../../components/button/OrangeButton";

export const Cart = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.body}>
      <View style={styles.head}>
        <View style={styles.checkout}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={Back} style={styles.img} />
          </Pressable>
          <Text>Add to Cart</Text>
        </View>
      </View>

      <ScrollView style={{ marginVertical: 10, marginBottom: 75 }}>
        <Packs />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        <OrangeButton value={"Continue"} screenName={"Checkout"} />
      </View>
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <NavBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#F5F5F5",

    flex: 1,
  },
  head: {
    backgroundColor: "white",
    width: "100%",
    height: 56,
    justifyContent: "center",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 10,
  },
  checkout: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "55%",
  },
  img: {
    width: 24,
    height: 24,
  },
});
