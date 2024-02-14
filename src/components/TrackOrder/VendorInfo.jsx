import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import Profile from "../../../assets/profile-circle.png";
import Location from "../../../assets/location.png";
import Call from "../../../assets/call.png";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../screens/ConsumerScreens/Authentication";
import { database } from "../../firebaseConfig";
export const VendorInfo = () => {
  const { vendorIdentity, vendor } = useContext(AuthContext);
  const [vendorId] = vendorIdentity;
  const [vendors, setVendors] = vendor;
  const vendorCollection = database.collection("vendors");
  const vendorData = async () => {
    try {
      const vendorData = await vendorCollection.doc(vendorId).get();

      const dat = vendorData.data();
      setVendors(dat);
      setMenu(dat.menuDescription);
      console.log(vendorId, ":successfully logged in");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    vendorData();
  }, []);

  return (
    <View style={styles.body}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginBottom: 20,
          marginLeft: 15,
        }}
      >
        Vendor's Information
      </Text>

      <View style={styles.profile}>
        <View style={styles.profileBody}>
          <Image source={Profile} style={{ width: 16, height: 16 }} />
          <Text style={styles.text}>{vendors?.businessName}</Text>
        </View>
        <View style={styles.profileBody}>
          <Image source={Call} style={{ width: 16, height: 16 }} />
          <Text style={styles.text}>{vendors?.phone}</Text>
        </View>
        <View style={styles.profileBody}>
          <Image source={Location} style={{ width: 16, height: 16 }} />
          <Text style={styles.text}>{vendors?.address}</Text>
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
