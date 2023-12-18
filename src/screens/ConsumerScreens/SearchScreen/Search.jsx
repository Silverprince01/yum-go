import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SearchBar } from "./component/SearchBar";
import { SearchCard } from "../../../components/Card/SearchCard";
import Pizza from "../../../../assets/pizza.png";
import Food1 from "../../../../assets/food1.png";
import Food2 from "../../../../assets/food2.png";
import Food3 from "../../../../assets/food3.png";
import Food4 from "../../../../assets/food4.png";
export const Search = () => {
  const [search, setSearch] = useState("");

  const foodSpots = [
    {
      id: 1,
      spotName: "Pizza",
      img: Pizza,
      deliveryFee: "#500",
      minOrder: "#2000.00",
      // location:"Ikeja, SUrulere"
    },
    {
      id: 2,
      spotName: "Amala Joint",
      img: Food1,
      deliveryFee: "#500",
      minOrder: "#2000.00",
    },
    {
      id: 3,
      spotName: "Amazing Grace",
      img: Food2,
      deliveryFee: "#500",
      minOrder: "#2000.00",
    },
    {
      id: 4,
      spotName: "Belle Full",
      img: Food3,
      deliveryFee: "#500",
      minOrder: "#2000.00",
    },
    {
      id: 5,
      spotName: "Ontario Spot",
      img: Food4,
      deliveryFee: "#500",
      minOrder: "#2000.00",
    },
  ];
  const filterData = foodSpots.filter((foods) => {
    return (
      foods.spotName
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase()) 
        
      //   &&
      // foods.region
      //   .toString()
      //   .toLowerCase()
      //   .includes(record.continent.toLowerCase())
    );
  });
  return (
    <View style={styles.body}>
      <SearchBar handleChange={(e) => setSearch(e.target.value)} />

      <View style={{ marginVertical: 10 }}>
        {filterData.map(({ spotName, img, deliveryFee, minOrder, id }) => {
          return (
            <SearchCard
              key={id}
              spotName={spotName}
              img={img}
              deliveryFee={deliveryFee}
              minOrder={minOrder}
              id={id}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 17,
  },
});
