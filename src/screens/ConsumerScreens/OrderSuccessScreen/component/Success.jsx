import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import Tick from "../../../../../assets/tick.png";
import Back from "../../../../../assets/arrow-left.png";
import { OrangeButton } from "../../../../components/button/OrangeButton";
export const Success = () => {
  return (
    <View style={styles.body}>
      <View>
        <Image source={Back} style={{ width: 24, height: 24 }} />
      </View>

      <View style={styles.thanks}>
        <Image source={Tick} style={styles.tick} />
        <Text style={styles.bigtext}>
          Order <Text style={styles.color}>Successful</Text>
        </Text>
        <Text style={styles.smallText}>Thank you for your order</Text>
      </View>
      <Pressable
        style={{
          width: "100%",
          paddingHorizontal:10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <OrangeButton value={"Track Order"} screenName={"Track Order"}/>
      </Pressable>
      <Pressable
        style={{
          width: "100%",
          paddingHorizontal:10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <OrangeButton value={"Back to Home"} screenName={"Home"}/>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#E7E7E7",
    padding: 17,
    position: "relative",
  },
  back: {
    width: 24,
    height: 24,
  },
  thanks: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  tick: {
    width: 100,
    height: 100,
  },
  bigtext: {
    fontSize: 24,
    fontWeight: 500,
  },
  smallText: {
    fontSize: 16,
    fontWeight: 300,
  },
  color: {
    color: "#FD832A",
  },
});
