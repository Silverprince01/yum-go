import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import firebase from "firebase/compat/app";

import "firebase/auth";

export const AllMenus = () => {
  const [menus, setMenus] = useState(null);
  const userId = firebase.auth().currentUser;
  const vendorCollection = firebase.firestore().collection("vendors");

  const getMenuItems = async () => {
    try {
      // vendorCollection.doc(userId.uid).get();
      const userDoc = await vendorCollection.doc(userId.uid).get();
      // if (userDoc.exists) {
      // Extract and set user data
      setMenus(userDoc.data().menuDescription);
      // const men = menus.menuDescription
      console.log(menus);
      // } else {
      // }
    } catch (error) {
      console.log(error);
      console.log("User not found.");
    }
  };
  useEffect(() => {
    getMenuItems();
  }, []);

  return (
    <View>
      {menus?.map((menu, id) => {
        return (
          <AllMenu
            menu={menu}
            key={id}
          />
        );
      })}
    </View>
  );
};

const AllMenu = ({ menu }) => {
  return (
    <View  style={styles.cardWrapper}>
      <View>
        <Text>{menu.foodName}</Text>
        <Text>
          #{menu.price} {menu.per}
        </Text>
        <Text>#{menu.price}</Text>
      </View>

      <View style={styles.imageBackground}>
        <Image source={{ uri: menu.image }} style={{ width: "100%", height: 27 }} />
        <View
          style={[
            menu.available
              ? { backgroundColor: "#FD832A" }
              : { backgroundColor: "#D4C2B5" },
            {
              width: "100%",
              height: 14,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text style={{ color: "white", fontSize: 10 }}>
            {menu.available ? "Available" : "Unavailaable"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E7E7E7",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  imageBackground: {
    width: 59,
    height: 46,
  },
});
