import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Profile from "../../../assets/profile-circle.png";
import Location from "../../../assets/location.png";
import Call from "../../../assets/call.png";

export const VendorInfo = () => {
  return (
    <View style={styles.body}>
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 20, marginLeft:15 }}>
        Vendor's Information
      </Text>

      <View style={styles.profile}>
        <View style={styles.profileBody}>
          <Image source={Profile} style={{ width: 16, height: 16 }} />
          <Text style={styles.text}>Mama Tee's Kitchen</Text>
        </View>
        <View style={styles.profileBody}>
          <Image source={Call} style={{ width: 16, height: 16 }} />
          <Text style={styles.text}>08086877025</Text>
        </View>
        <View style={styles.profileBody}>
          <Image source={Location} style={{ width: 16, height: 16 }} />
          <Text style={styles.text}>
            51 Sijuade street, Ijesa Surulere Lagos
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    marginVertical: 20,
  },
  profile: {
    backgroundColor: "white",
    width: "100%",
    elevation: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 16,
    padding: 17,
  },
  profileBody: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: "400",
  },
});
