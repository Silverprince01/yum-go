import React, {useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import { database } from "../../firebaseConfig";
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import Pen from "../../../assets/pen.png";
import Location from "../../../assets/location.png";
import Clock from "../../../assets/clock.png";
import { AuthContext } from "../../screens/ConsumerScreens/Authentication";
import { useNavigation } from "@react-navigation/native";
export const Nearest = () => {
  const userId = firebase.auth().currentUser;
  const {  vendorIdentity } = useContext(AuthContext);
  

  const [vendorId, setVendorId] = vendorIdentity;
  const [vendors, setVendors] = useState([]);

  const fetchVendors = async () => {
    try {
      const snapshot = await firebase.firestore().collection("vendors").get();
      const vendorData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setVendors(vendorData);
      console.log(vendors);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const navigation = useNavigation();

  const vendorNavigate = (id) => {
    setVendorId(id);
    navigation.navigate("Vendor");
  };
  

  return (
    <View style={styles.body}>
      
      <Text style={{ fontSize: 24, fontWeight: "500", marginLeft: 5, marginBottom:20 }}>
          All Restaurant
        </Text>
            <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {vendors.map((vendor) => {
          return (
            <Pressable
              key={vendor.id}
              onPress={() => {
                vendorNavigate(vendor.id);
              }}
              style={styles.vendorContainer}
            >
              <Image source={{ uri: vendor.image }} style={styles.foodImage} />
              <Text style={styles.vendorName}>{vendor.businessName}</Text>
              <View style={styles.order}>
                <Text style={styles.orderText}>Min-Order</Text>
                <Text style={styles.orderText}>#{vendor.minOrder}</Text>
              </View>
              <View style={styles.order}>
                <Text style={styles.orderText}>Delivery Fee</Text>
                <Text style={styles.orderText}>#{vendor.deliveryFee}</Text>
              </View>
            </Pressable>
          );
        })}

        
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  adddress: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 12,
    height: 12,
  },
  vendorContainer: {
    paddingRight: 8,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: 700,
    marginTop: 5,
  },
  order: {
    
    justifyContent: "space-between",
    flexDirection: "row",
  },
  orderText: {
    fontSize: 12,
  },
  foodImage: {
    width: 170,
    height: 100,
    borderRadius: 12,
  },
});
