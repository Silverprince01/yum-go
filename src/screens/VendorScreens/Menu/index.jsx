import React, { useState } from "react";
import firebase from "firebase/compat/app"
import "firebase/auth";
import { View, StyleSheet } from "react-native";
import {
  Header,
  AllMenus,
  Availables,
  Unavailables,
  AddMenu,
} from "./components";
import { FooterNav } from "../components";

export const Menu = () => {
  const uid = firebase.auth().currentUser;
  console.log(uid);
  const [selectedTab, setSelectedTab] = useState(1);
  const selectTab = (key) => {
    setSelectedTab(key);
  };

  const renderSelectedTabContent = (key) => {
    if (key == 1) {
      return <AllMenus />;
    } else if (key == 2) {
      return <Availables />;
    } else if (key == 3) {
      return <Unavailables />;
    } else if (key == 4) {
      return <AddMenu uid={uid}/>;
    }
  };

  return (
    <View style={styles.body}>
      <Header selectTab={selectTab} />

      <View style={styles.tabContentContainer}>
        {renderSelectedTabContent(selectedTab)}
      </View>

      <FooterNav />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#E7E7E7",
    gap: 6,

    width: "100%",
    overflow: "hidden",
  },
  tabContentContainer: {
    flex: 1,
    gap: 6,

    width: "100%",
    overflow: "hidden",
  },
});
