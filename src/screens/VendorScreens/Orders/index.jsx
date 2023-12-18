import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  AwaitingPickupCards,
  Header,
  InstantOrdersCards,
  PreOrdersCards,
  TransitsCards,
} from "./components";
import { database } from "../../../firebaseConfig";

import firebase from "firebase/compat/app";
import { FooterNav } from "../components";

export const Orders = () => {
  const vendorId = firebase.auth().currentUser;
  const [selectedTab, setSelectedTab] = useState(1);
  const [total, setTotal] = useState(0);
  const [vendor, setVendor] = useState("")
  const [orders, setOrders] = useState(null);
  const [items, setItems] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [validOrder, setValidOrder] = useState(null);

  const selectTab = (key) => {
    setSelectedTab(key);
  };
  console.log(vendorId.uid);
  const orderCollections = firebase.firestore().collection("orders");
  const getOrders = async () => {
    try {
      const orderData = await orderCollections.get();
      // setOrders(orderData.data());
      const ordersWithIds = orderData.docs.map((doc) => ({
        id: doc.id,
        order: doc.data(),
      }));
      console.log(ordersWithIds);
      setOrders(ordersWithIds);
      ordersWithIds?.map((ordersWithId) => {
        const confirmedOrders = ordersWithId?.order.orderss.filter((ord) => {
          ord.confirmation;

          setConfirm(ord.confirmation);
        });
        setTotal(confirmedOrders.total);
        // console.log(confirmedOrders);
        confirmedOrders?.map((confirm) => {
          const vendorOrders = confirm?.order.filter(
            (orde) => {orde.to === vendorId.uid
            
            
              setVendor(orde.to)
            }
          );
          // console.log(vendorOrders);
          setItems(vendorOrders);
        });
      });
      console.log(vendor);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  const acceptOrder = async () => {};
  const renderSelectedTabContent = (key) => {
    if (key == 1) {
      return (
        <InstantOrdersCards orders={orders} confirm={confirm} />
      );
    } else if (key == 2) {
      return <PreOrdersCards />;
    } else if (key == 3) {
      return <AwaitingPickupCards orders={orders} confirm={confirm} />;
    } else if (key == 4) {
      return <TransitsCards />;
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
