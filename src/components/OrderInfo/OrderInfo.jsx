import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import firebase from "firebase/compat/app";
import { database } from "../../firebaseConfig";
import { AuthContext } from "../../screens/ConsumerScreens/Authentication";
import ArrowRight from "../../../assets/arrow-right.png";
export const OrderInfo = () => {
  const [option, setOption] = useState(0);
  
  const userId = firebase.auth().currentUser;
  const { consumer } = useContext(AuthContext);
  const [consumers, setConsumers] = consumer;
  const consumerCollection = database.collection("consumers");
  const consumerData = async () => {
    try {
      const consumerData = await consumerCollection.doc(userId.uid).get();

      const dat = consumerData.data();
      setConsumers(dat);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    consumerData();
  }, []);
  return (
    <View style={{ paddingBottom: 50 }}>
      {/* address */}
      <View>
        <Text>Address</Text>
        <View style={styles.address}>
          <Text>{consumers?.address}</Text>
          <Image source={ArrowRight} style={styles.img} />
        </View>
      </View>
      {/* payment method */}
      <View>
        <Text>Payment</Text>

        <View style={styles.address}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              width: "35%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Pressable
                onPress={() => {
                  setOption(1);
                }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    borderColor: "#FD832A",
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={
                      option === 1
                        ? {
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: "#FD832A",
                          }
                        : {}
                    }
                  ></View>
                </View>
              </Pressable>
              <Text style={{ marginLeft: 5 }}>Card</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Pressable onPress={() => setOption(2)}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    borderColor: "#FD832A",
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={
                      option === 2
                        ? {
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: "#FD832A",
                          }
                        : {}
                    }
                  ></View>
                </View>
              </Pressable>
              <Text style={{ marginLeft: 5 }}>Cash</Text>
            </View>
          </View>
          <Image source={ArrowRight} style={styles.img} />
        </View>
      </View>

      {/* additional note */}
      <View>
        <Text>Add Note</Text>

        <View>
          <TextInput style={styles.input} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 500,
  },
  address: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 14,
    backgroundColor: "white",
    borderRadius: 12,
    marginVertical: 15,
    elevation: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  input: {
    padding: 10,
    borderRadius: 6,
    borderColor: "#FF6600",
    borderWidth: 1,
    width: "100%",
    height: 105,
    marginVertical: 10,
  },
  img: {
    width: 24,
    height: 24,
  },
});
