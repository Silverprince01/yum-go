import { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import firebase from "firebase/compat/app";
import { doc, getDoc } from "firebase/firestore";
import "firebase/auth";
import { database } from "../../../../firebaseConfig";
import Food1 from "../../../../../assets/food1.png";
import Food2 from "../../../../../assets/food2.png";
import Food3 from "../../../../../assets/food3.png";
import Food4 from "../../../../../assets/food4.png";
export const AllMenus = () => {
  const [availability, setAvailability] = useState(true);
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
    // const fetchData = async () => {
    getMenuItems();
    // console.log(menus);
    // };

    // fetchData();
  }, []);

  const orders = [
    {
      id: 1,
      food: "Jollof Rice",
      portion: "A portion of jollof rice",
      amount: "#300",
      availabilty: false,
      pics: Food1,
    },
    {
      id: 2,
      food: "Jollof Rice",
      portion: "A portion of jollof rice",
      amount: "#300",
      availabilty: true,
      pics: Food2,
    },
    {
      id: 3,
      food: "Jollof Rice",
      portion: "A portion of jollof rice",
      amount: "#300",
      availabilty: false,
      pics: Food3,
    },
    {
      id: 4,
      food: "Jollof Rice",
      portion: "A portion of jollof rice",
      amount: "#300",
      availabilty: true,
      pics: Food4,
    },
  ];

  return (
    <View style={styles.cardsWrapper}>
      {menus?.map((menu, id) => {
        const { category, description, foodName, per, image, price } = menu;
        const { identity } = id;
        return (
          <AllMenu
            id={identity}
            foodName={foodName}
            per={per}
            image={image}
            price={price}
            availability={availability}
          />
        );
      })}
    </View>
  );
};

const AllMenu = ({ id, foodName, per, image, price, availability }) => {
  return (
    <View key={id} style={styles.cardWrapper}>
      <View>
        <Text>{foodName}</Text>
        <Text>
          {price} per {per}
        </Text>
        <Text>{price}</Text>
      </View>

      <View style={styles.imageBackground}>
        <Image source={image} style={{ width: "100%", height: 27 }} />
        <View
          style={[
            availability
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
            {availability ? "Available" : "Unavailaable"}
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
