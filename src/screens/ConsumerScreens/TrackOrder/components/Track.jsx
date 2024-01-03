import { StyleSheet, Text, View } from "react-native";

import React from "react";
import { TrackOrderComponent } from "../../../../components/TrackOrder/TrackOrderComponent";
import { VendorInfo } from "../../../../components/TrackOrder/VendorInfo";
import { OrangeButton } from "../../../../components/button/OrangeButton";

export const Track = () => {
  return (
    <View>
      <Text style={styles.orderText}>Order 17632</Text>
      <TrackOrderComponent />

      <VendorInfo />
      <View style={{ paddingHorizontal: 10, marginBottom:80 }}>
        <OrangeButton value={"Back to Home"} screenName={"Home"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderText: {
    color: "black",
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 27,
    margin: 15,
  },
});
