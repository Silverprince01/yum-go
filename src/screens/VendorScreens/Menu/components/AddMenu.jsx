import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  Animated
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import firebase from "firebase/compat/app";
import React, { useState, useRef, useEffect } from "react";

import Camera from "../../../../../assets/camera.png";
import { OrangeButton } from "../../../../components/button/OrangeButton";

import { database } from "../../../../firebaseConfig";
import * as ImagePicker from "expo-image-picker";
export const AddMenu = ({ uid }) => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("")
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const slideIn = () => {
    setIsVisible(true);
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: false,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: false,
    }).start(() => {
      setIsVisible(false);
    });
  };

  useEffect(() => {
    if (isVisible) {
      const timeoutId = setTimeout(() => {
        slideOut();
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [isVisible]);

  const [menuDesc, setMenuDesc] = useState({
    foodName: "",
    category: "",
    per: "per portion",
    price: "",
    image: null,
    available: true,
  });
  console.log(menuDesc);
  const userId = uid.uid;

  const arrayfieldName = "menuDescription";
  const vendorCollection = database.collection("vendors");
  const sendItem = async () => {
    setLoading(true);
    console.log(userId);
    vendorCollection
      .doc(userId)
      .update({
        [arrayfieldName]: firebase.firestore.FieldValue.arrayUnion(menuDesc),
      })

      .then(() => {
        setLoading(false);
        console.log(`Document written with ID: ${userId} `);
        setMenuDesc({
          foodName: "",
          category: "",
          per: "per portion",
          price: "",
          image: null,
          available: true,
        })
        slideIn()
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message)
        console.error("Error adding document: ", error);
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setMenuDesc((prev) => ({ ...prev, image: result.assets[0].uri }));
    }
  };
  return (
    <ScrollView style={styles.body}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 5,
          transform: [
            {
              translateY: slideAnimation.interpolate({
                inputRange: [0, 10],
                outputRange: [50, 0],
              }),
            },
          ],
        }}
      >
        {isVisible && (
          <View
            style={{
              backgroundColor: "#FF6600",
              padding: 20,
              borderRadius: 8,
              width:250,
              justifyContent:"center"
            }}
          >
            <Text>Food Item Added</Text>
          </View>
        )}
      </Animated.View>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 10 }}>
          Food Name (e.g rice, beans)
        </Text>
        <TextInput
          value={menuDesc.foodName}
          style={styles.input}
          onChangeText={(newValue) =>
            setMenuDesc((prev) => ({ ...prev, foodName: newValue }))
          }
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 10 }}>
          Price
        </Text>
        <View
          style={{ width: "100%", height: 38, flexDirection: "row", gap: 10 }}
        >
          <TextInput
            style={{
              height: "100%",
              width: "60%",
              backgroundColor: "#FFFCFB",
              borderRadius: 9,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
            value={menuDesc.price}
            onChangeText={(newValue) =>
              setMenuDesc((prev) => ({ ...prev, price: newValue }))
            }
          />

          <View style={{ width: "40%", height: "100%", position: "relative" }}>
            <Picker
              selectedValue={menuDesc.per}
              onValueChange={(newValue) =>
                setMenuDesc((prev) => ({ ...prev, per: newValue }))
              }
              dropdownIconColor={"#FF6600"}
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "#F2F2F2",
                borderRadius: 9,
                paddingHorizontal: 15,
                paddingVertical: 10,
              }}
            >
              <Picker.Item label="per portion" value="per portion" />
              <Picker.Item label="per unit" value="per unit" />
            </Picker>
          </View>
        </View>
        

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Add Image</Text>

          <Pressable
            style={{
              backgroundColor: "#A3A1A166",
              width: "100%",
              height: 131,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              marginVertical: 10,
            }}
            onPress={pickImage}
          >
            {menuDesc.image ? (
              <Image
                source={{ uri: menuDesc.image }}
                style={{ width: "100%", height: "100%", borderRadius: 12 }}
              />
            ) : (
              <Image source={Camera} style={{ width: 46, height: 42 }} />
            )}
          </Pressable>
        </View>

        {/* button */}
        <OrangeButton
          value={"Add to Menu"}
          sendItem={sendItem}
          loading={loading}
        />
      </View>

      <Text>{error}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 17,
    marginBottom: 80,
  },
  input: {
    backgroundColor: "#FFFCFB",
    borderRadius: 9,
    height: 38,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  picker: {
    height: 50,
    width: 200,
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
  },
});
