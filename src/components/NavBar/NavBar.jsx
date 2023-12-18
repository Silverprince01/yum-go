import React from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import Bag from "../../../assets/bag.png";
import Search from "../../../assets/search.png";
import Hom from "../../../assets/home.png";
import User from "../../../assets/user.png";
import { useNavigation } from "@react-navigation/native";
export const NavBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.nav}>
      <Pressable
        onPress={() => navigation.navigate("Home")}
        style={styles.navItems}
      >
        <Image source={Hom} style={styles.img} />
        <Text style={styles.text}>Home</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Search")}
        style={styles.navItems}
      >
        <Image source={Search} style={styles.img} />
        <Text style={styles.text}>Search</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Carts")}
        style={styles.navItems}
      >
        <Image source={Bag} style={styles.img} />
        <Text style={styles.text}>Order</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Profile")}
        style={styles.navItems}
      >
        <Image source={User} style={styles.img} />
        <Text style={styles.text}>Profile</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    flex: 1,
    flexDirection: "row",
    padding: 18,
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "white",
    height: 70,
    elevation: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
  },
  navItems: {
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    width: 16,
    height: 16,
    marginBottom: 5,
    justifyContent: "center",
    // margin: "auto",
  },
  text: {
    fontSize: 14,
  },
});
