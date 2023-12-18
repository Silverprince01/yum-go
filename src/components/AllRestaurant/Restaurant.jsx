import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat/app";
// import Spag from "../../../assets/spag.png";
// import { doc, getDoc } from "firebase/firestore";
// import { database } from "../../firebaseConfig";

// import { AuthProvider } from "../../screens/ConsumerScreens/Authentication";
import { AuthContext } from "../../screens/ConsumerScreens/Authentication";
export const Restaurant = () => {
  const { vendorIdentity } = useContext(AuthContext);
  const [vendorId, setVendorId] = vendorIdentity;
  const [vendors, setVendors] = useState(null);

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
      <View>
        <Text style={{ fontSize: 24, fontWeight: "500", marginLeft: 5 }}>
          All Restaurant
        </Text>
      </View>
      <ScrollView
        //   horizontal={true}

        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          paddingVertical: 10,
        }}
      >
        <View style={styles.row}>
          {vendors?.map((vend) => {
            return (
              <Pressable
                key={vend.id}
                onPress={() => {
                  // setCount((prev) => prev + 1);
                  // setVendorId(vend.id);
                  vendorNavigate(vend.id);
                }}
                style={styles.vendorContainer}
              >
                <Image source={vend.image} style={styles.foodImage} />
                <Text style={styles.vendorName}> {vend.businessName}</Text>
                <View style={styles.order}>
                  <Text style={styles.orderText}>Min-Order</Text>
                  <Text style={styles.orderText}>#{vend.minOrder}</Text>
                </View>
                <View style={styles.order}>
                  <Text style={styles.orderText}>Delivery Fee</Text>
                  <Text style={styles.orderText}>#{vend.deliveryFee}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
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
    marginBottom: 10,
  },

  vendorContainer: {
    paddingRight: 8,
    paddingVertical: 10,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: 700,
    marginTop: 5,
  },
  order: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  orderText: {
    fontSize: 12,
  },
  foodImage: {
    width: 165,
    height: 100,
    borderRadius: 12,
  },
});
