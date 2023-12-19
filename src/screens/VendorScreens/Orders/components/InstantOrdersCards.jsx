import {  StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { database } from "../../../../firebaseConfig";

import { OrangeButton } from "../../../../components/button/OrangeButton";
import {
  TransparentButton,
} from "../../../../components/button/TransparentButton";

export const InstantOrdersCards = ({ orders }) => {
  return (
    <View style={styles.cardsWrapper}>
      {orders?.map((order) => {
        return (
          <InstantOrdersCard key={order.id} order={order}  />
        );
      })}
    </View>
  );
};

const InstantOrdersCard = ({ order }) => {
  const [loading, setLoading] = useState(false);
  const [rejectLoad, setRejectLoad] = useState(false);
  console.log(order);
  const [display, setDisplay] = useState(false);

  const vendorId = firebase.auth().currentUser;
  const confirm = order.order.orderss[0].confirmation;
  const vend = order.order.orderss[0].order[0].to;
  const accept = order.order.orderss[0].accepted;
  const [consumer, setConsumer] = useState(null);
  const consumerCollection = firebase.firestore().collection("consumers");

  
  const consumerData = async () => {
     await consumerCollection
      .doc(order.id)
      .get()
      .then((data) => {
        // data?.forEach((newData) => {
        const myData = data.data();
        
        setConsumer(myData);
        // });
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    consumerData();
  }, []);
  const acceptOrder = async () => {
    try {
      setLoading(true);
      const orderCollection = database.doc(`orders/${order.id}`);
      orderCollection.get().then((doc) => {
        if (doc.exists) {
          // Get the array as an array of objects
          const dataArray = doc.data().orderss;

          // Map over each object in the array
          const updatedArray = dataArray?.map((obj, id) => {
            // Update the boolean value to true

            obj.accepted = true;

            return obj;
          });
          // Update the entire array in the document
          orderCollection.update({ orderss: updatedArray });
          setDisplay(false)
        } else {
          console.log("Document does not exist");
        }
        setLoading(accept);
      });
    } catch (error) {}
  };
  return (
    <View>
      {display ?   (
        <View>
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
                            <View>
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
                <View style={{ width: "50%" }}>
                  <OrangeButton
                    value={"Accept"}
                    loading={loading}
                    acceptOrder={acceptOrder}
                  />
                </View>
                <View style={{ width: "50%" }}>
                  <TransparentButton value={"Reject"} loading={rejectLoad} />
                </View>
              </View>
            </View>
          )}
        </View>
      ):null}
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
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
  },
  cardBottom: {
    flexDirection: "row",
    gap: 12,
  },
  acceptBtnCtn: {
    flex: 1,

    borderRadius: 6,
    backgroundColor: "#FD832A",
    paddingVertical: 12,
  },
  acceptBtn: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  rejectBtnCtn: {
    flex: 1,

    borderRadius: 6,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#C4C4C4",
    paddingVertical: 12,
  },
  rejectBtn: {
    color: "#C4C4C4",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
});
