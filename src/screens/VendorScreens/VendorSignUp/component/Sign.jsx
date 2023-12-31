import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { TransparentButton } from "../../../../components/button/TransparentButton";
import firebase from "firebase/compat/app";

import "firebase/auth";


export const Sign = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errormessage, setErrorMessage] = useState("");

  const vendorSignUp = async () => {
    setLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        console.log(user);
        setLoading(false);

        navigation.navigate("Vendor Register");
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;

        setErrorMessage(errorMessage);
      });
  };

  const handleLogin = () => {
    navigation.navigate("Vendor Login");
  };
  const keyboardVerticalOffset = Platform.OS === "ios" ? 10 : 0;

  return (
    <View style={styles.body}>
      <KeyboardAvoidingView
        behavior="position"
        style={{ backgroundColor: "white", flex: 1 }}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <Text style={styles.header}>Create Account</Text>

        <View>
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
            <Text style={styles.inputText}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={"#0000004D"}
            />
          </View>
          <View>
            <Text style={styles.inputText}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={"#0000004D"}
            />
            <Text style={{ color: "red" }}>{errormessage}</Text>
          </View>
        </View>
        <View style={styles.login}>
          <Text>Already have an account?</Text>
          <Pressable onPress={handleLogin}>
            <Text style={styles.loginText}>Log in</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
<View

style={{
  position: "absolute",
  bottom: 30,
  width: "110%",
paddingHorizontal:10
}}>

        <TransparentButton
          loading={loading}
          value={"Sign UP"}
          signUp={
            password === confirmPassword
              ? vendorSignUp
              : () => setErrorMessage("Your password does not match")
          }
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
  },
  header: {
    color: "#FD6A00",
    fontSize: 24,
    fontWeight: 700,
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
