import {  StyleSheet, Text, View } from "react-native";
import React, { useState,useEffect } from "react";
import firebase from "firebase/compat/app";
import { OrangeButton } from "../../../../components/button/OrangeButton";

export const AwaitingPickupCards = ({ orders }) => {
  return (
    <View style={styles.cardsWrapper}>
      {orders?.map((order,id) => {
        return <AwaitingPickupsCard key={id} order={order} />;
      })}
    </View>
  );
};

const AwaitingPickupsCard = ({ order, key }) => {
  const [consumer, setConsumer] = useState({});
  const vendorId = firebase.auth().currentUser;

  const consumerCollection = firebase.firestore().collection("consumers");
  const confirm = order.order.orderss[0].confirmation;
  const accepted = order.order.orderss[0].accepted;
  const vend = order.order.orderss[0].order[0].to;

  const consumerData = async () => {
 await consumerCollection
      .doc(order.id)
      .get()
      .then((data) => {
        
        const myData = data.data();

        setConsumer(myData);
        

      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    consumerData();
  }, []);
  return (
    <View>
      {accepted && (
        <View key={key}>
          {confirm === true && (
            <View style={styles.cardWrapper}>
              <View style={styles.cardTop}>
                <Text style={styles.cardTopText}> {consumer?.namee} </Text>

                <Text style={styles.cardTopText}>{consumer?.address}</Text>
              </View>

              <View style={styles.cardMiddle}>
                {order?.order.orderss.map((ord, id) => {
                  return (
                    <View key={id}>
                      <View style={{ paddingBottom: 10 }}>
                        {ord?.order.map((or, ide) => {
                          return (
                            <View key={ide}>
                              {or.to === vendorId.uid && (
                                <View
                                  key={ide}
                                  style={{ flexDirection: "row", gap: 20 }}
                                >
                                  <Text style={{ fontWeight: "500" }}>
                                    {or.per === "per portion"
                                      ? "A portion of "
                                      : "A unit of "}
                                    {or.foodName + ","}
                                  </Text>
                                  <Text style={{ fontWeight: "500" }}>
                                    X{or.count}
                                  </Text>
                                </View>
                              )}
                            </View>
                          );
                        })}
                        <Text
                          style={[
                            {
                              position: "absolute",
                              right: 10,
                              top: 20,
                              fontWeight: "500",
                            },
                            styles.cardMiddleText,
                          ]}
                        >
                          {vendorId.uid === vend && `#${ord?.total}`}
                        </Text>

                        {/* subjected to change */}
                      </View>
                    </View>
                  );
                })}
              </View>

              <View style={styles.cardBottom}>
                <View style={{ width: "100%" }}>
                  <OrangeButton value={"Confirm Delivery"} />
                </View>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
	cardsWrapper: {
		// flex: 1,
	
		flexDirection: "column",
		gap: 6,
	  },
	  cardWrapper: {
		gap: 6,
	
		paddingVertical: 9,
		paddingHorizontal: 17,
	
		borderRadius: 12,
		backgroundColor: "#FFFCFB",
	  },
	  cardTop: {
		flexDirection: "row",
		justifyContent: "space-between",
	  },
	  cardTopText: {
		color: "#949090",
		// fontFamily: "Roboto",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: 400,
		lineHeight: "normal",
	  },
	  cardMiddle: {
		// flexDirection: "row",
		justifyContent: "space-between",
		position: "relative",
	  },
	  cardMiddleText: {
		color: "#151515",
		// fontFamily: "Roboto",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: 500,
		lineHeight: "normal",
	  },
	  cardBottom: {
		flexDirection: "row",
		gap: 12,
	  },
});
