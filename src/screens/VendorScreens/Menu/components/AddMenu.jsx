import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import firebase from "firebase/compat/app";
import React, { useState } from "react";

import Camera from "../../../../../assets/camera.png";
import { OrangeButton } from "../../../../components/button/OrangeButton";

import { database } from "../../../../firebaseConfig";
import * as ImagePicker from "expo-image-picker";
export const AddMenu = ({ uid }) => {
  

  const [loading, setLoading] = useState(false);
  const [menuDesc, setMenuDesc] = useState({
    foodName: "",
    category: "",
    description: "",
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
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error adding document: ", error);
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setMenuDesc((prev) => ({ ...prev, image: result.assets[0].uri }));
    }
  };
  return (
    <ScrollView style={styles.body}>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 10 }}>
          Category
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(newValue) =>
            setMenuDesc((prev) => ({ ...prev, category: newValue }))
          }
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 10 }}>
          Name
        </Text>
        <TextInput
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
          <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 10 }}>
            Description
          </Text>
          <TextInput
            style={[styles.input, { height: 90 }]}
            onChangeText={(newValue) =>
              setMenuDesc((prev) => ({ ...prev, description: newValue }))
            }
          />
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
                source={menuDesc.image}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 17,
    paddingBottom: 80,
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
