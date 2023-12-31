import {  StyleSheet, Text, View, Image } from "react-native";
import Food1 from "../../../../../assets/food1.png";
import Food2 from "../../../../../assets/food2.png";
import Food3 from "../../../../../assets/food3.png";
import Food4 from "../../../../../assets/food4.png";
export const Unavailables = () => {
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
      {orders.map((menu,id) => {
     

        return (
          menu.availabilty===false && (
            <Unavailable
            menu={menu}
              key={id}
              // food={food}
              // portion={portion}
              // availabilty={availabilty}
              // pics={pics}
              // amount={amount}
            />
          )
        );
      })}
    </View>
  );
};

const Unavailable = ({ menu }) => {
  return (
    <View  style={styles.cardWrapper}>
      <View>
        <Text>{menu.food}</Text>
        <Text>{menu.portion}</Text>
        <Text>{menu.amount}</Text>
      </View>

      <View style={styles.imageBackground}>
        <Image source={menu.pics} style={{ width: "100%", height: 27 }} />
        <View
          style={[
            menu.availabilty
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
            {menu.availabilty ? "Available" : "Unavailaable"}
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
