import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";

import SearchIcon from "../../../../../assets/searchIcon.png";
export const SearchBar = ({ handleChange }) => {
  return (
    <View style={styles.container}>
      <Image source={SearchIcon} style={styles.image} />
      <TextInput
        onChange={handleChange}
        style={styles.search}
        placeholder="restaurants, food, etc"
        placeholderTextColor={"#D1D1D1"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  search: {
    position: "relative",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    paddingRight: 14,
    paddingLeft: 36,
    paddingVertical: 11.5,
  },

  image: {
    width: 16,
    height: 16,
    position: "absolute",
    zIndex: 1,
    top: 15,
    left: 15,
  },
});
