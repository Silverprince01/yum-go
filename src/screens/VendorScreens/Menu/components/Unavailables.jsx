import { Pressable, StyleSheet, Text, View, Image } from "react-native";
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
      {orders.map((menu) => {
        const { id, food, portion, availabilty, pics, amount } = menu;

        return (
          availabilty===false && (
            <Unavailable
              id={id}
              food={food}
              portion={portion}
              availabilty={availabilty}
              pics={pics}
              amount={amount}
            />
          )
        );
      })}
    </View>
  );
};

const Unavailable = ({ id, food, portion, availabilty, pics, amount }) => {
  return (
    <View key={id} style={styles.cardWrapper}>
      <View>
        <Text>{food}</Text>
        <Text>{portion}</Text>
        <Text>{amount}</Text>
      </View>

      <View style={styles.imageBackground}>
        <Image source={pics} style={{ width: "100%", height: 27 }} />
        <View
          style={[
            availabilty
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
            {availabilty ? "Available" : "Unavailaable"}
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
