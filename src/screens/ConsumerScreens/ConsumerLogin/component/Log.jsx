import React, { useState, useContext, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OrangeButton } from "../../../../components/button/OrangeButton";
import { AuthContext } from "../../Authentication";
import firebase from "firebase/compat/app";

import "firebase/auth";

export const Log = () => {
  const { user } = useContext(AuthContext);
  const [users, setUser] = user;
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // Signed up
        // const user = userCredential.user;
        // ...
        // console.log(user);
        navigation.navigate("Home");
      }).catch((error)=>{
        setLoading(false);
        console.log(error);

      })
      // .catch((error) => {
      //   setLoading(false);
      //   console.log(error);
      // });
      // });
    
    
  };

  return (
    <View style={styles.body}>
      <View>
        <Text style={styles.header}>Login with your email and password</Text>
      </View>
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="yumgo@gmail.com"
            inputMode="number"
            placeholderTextColor={"#0000004D"}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Passsword</Text>
          <TextInput
            style={styles.input}
            placeholder="***********"
            inputMode="number"
            placeholderTextColor={"#0000004D"}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.login}>
          <Text>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate("Consumer Sign Up")}>
            <Text style={styles.loginText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ position: "absolute", bottom: 30, width: "90%" }}>
        <OrangeButton
          value="Log In"
          loading={loading}
          handleLogin={handleLogin}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    width: "100%",
    paddingHorizontal: 18,
    position: "absolute",
    top: 185,
    paddingVertical: 13,
    backgroundColor: "white",
    borderRadius: 30,
    fontSize: 16,
    height: 500,
    // flex:2
  },
  header: {
    color: "#FD6A00",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "28.14px",
    paddingVertical: 20,
  },
  inputContainer: {
    position: "relative",
    marginVertical: 15,
  },
  inputText: {
    marginVertical: 10,
  },
  input: {
    padding: 10,
    borderRadius: 6,
    borderColor: "#FF6600",
    borderWidth: "1px",
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
  button: {
    position: "absolute",
    bottom: -160,
    width: "90%",
  },
});
