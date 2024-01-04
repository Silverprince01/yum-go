import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Camera from "../../../../../assets/camera.png";
import { TransparentButton } from "../../../../components/button/TransparentButton";
import firebase from "firebase/compat/app";

import { database } from "../../../../firebaseConfig";

import "firebase/auth";
import * as ImagePicker from "expo-image-picker";

export const Register = () => {
  const navigation = useNavigation();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const [loading, setLoading] = useState(false);
  const [namee, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [image, setImage] = useState(null);
  const [errormessage, setErrorMessage] = useState("");

  const userId = firebase.auth().currentUser;

  const userData = {
    id: userId.uid,
    namee: namee,
    businessName: businessName,
    email: email,
    phone: phone,
    address: address,
    image: image,
    minOrder: minOrder,
    deliveryFee: deliveryFee,
  };

  const vendorCollection = database.collection("vendors");

  const register = async () => {
    setLoading(true);
    vendorCollection
      .doc(userId.uid)
      .set(userData)
      .then(() => {
        console.log("Data sent successful");
        //   navigation.navigate("Home");
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setMinOrder("");
        setDeliveryFee("");
        setBusinessName("");
        setImage(null);
        setLoading(false);
        //   alert("Data sent successfully!");
        navigation.navigate("Vendor Login");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
        setLoading(false);
      });
  };

  const handleLogin = () => {
    navigation.navigate("Vendor Login");
  };
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  return (
    <View style={styles.body}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ backgroundColor: "white", flex: 1 }}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <Text style={styles.header}>Register your Canteen</Text>

        <View>
          <Text
            style={{ fontSize: 16, textAlign: "center", fontWeight: "500" }}
          >
            Vendor Information
          </Text>
          <View>
            <Text style={styles.inputText}>Full Name</Text>
            <TextInput
              value={namee}
              style={styles.input}
              placeholder="Your Name"
              onChangeText={setName}
              placeholderTextColor={"#0000004D"}
            />
          </View>
          <View>
            <Text style={styles.inputText}>Business Name</Text>
            <TextInput
              value={businessName}
              style={styles.input}
              placeholder="Your Name"
              onChangeText={setBusinessName}
              placeholderTextColor={"#0000004D"}
            />
          </View>
          <View>
            <Text style={styles.inputText}>Phone Number</Text>
            <TextInput
              // onChange={handleChange}
              value={phone}
              style={styles.input}
              placeholder="Phone Number"
              onChangeText={setPhone}
              placeholderTextColor={"#0000004D"}
            />
          </View>
          <View>
            <Text style={styles.inputText}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              placeholder="Your Email"
              onChangeText={setEmail}
              placeholderTextColor={"#0000004D"}
            />
          </View>
          <View>
            <Text style={styles.inputText}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              placeholder="Address"
              onChangeText={setAddress}
              placeholderTextColor={"#0000004D"}
            />
          </View>

          <View>
            <Text style={[styles.inputText, { marginTop: 10 }]}>
              Canteen Logo
            </Text>
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
              {image ? (
                <Image
                  source={image}
                  style={{ width: "100%", height: "100%", borderRadius: 12 }}
                />
              ) : (
                <Image source={Camera} style={{ width: 46, height: 42 }} />
              )}
            </Pressable>
          </View>
          <View style={{ marginTop: 20 }}>
            <View>
              <Text style={styles.inputText}>Minimum Order</Text>
              <TextInput
                style={styles.input}
                value={minOrder}
                placeholder="Min Order"
                onChangeText={setMinOrder}
                placeholderTextColor={"#0000004D"}
              />
            </View>
            <View>
              <Text style={styles.inputText}>Delivery Fee</Text>
              <TextInput
                style={styles.input}
                value={deliveryFee}
                placeholder="Delivery Fee"
                onChangeText={setDeliveryFee}
                placeholderTextColor={"#0000004D"}
              />
            </View>
          </View>
          <Text style={{ color: "red" }}>{errormessage}</Text>
        </View>

        <View style={styles.login}>
          <Text>Already have an account?</Text>
          <Pressable onPress={handleLogin}>
            <Text style={styles.loginText}>Log in</Text>
          </Pressable>
        </View>

        <TransparentButton
          value="Register"
          loading={loading}
          register={ register}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: "100%",
    height: "auto",
    paddingHorizontal: 18,
    position: "absolute",
    top: 200,
    paddingVertical: 13,
    backgroundColor: "white",
    borderRadius: 30,
    fontSize: 16,
  },
  header: {
    color: "#FD6A00",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  inputContainer: {
    position: "relative",
  },
  inputText: {
    marginVertical: 10,
  },
  input: {
    padding: 10,
    borderRadius: 6,
    borderColor: "#FF6600",
    borderWidth: 1,
    width: "100%",
  },
  eye: {
    position: "absolute",
    right: 10,
    width: 15,
    height: 15,
    top: 50,
  },
  login: {
    marginVertical: 15,
    flexDirection: "row",
  },
  loginText: {
    marginLeft: 10,
    color: "#FD6A00",
  },
});
