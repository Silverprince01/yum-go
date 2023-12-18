import { useState } from "react";
import { Pressable, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native-web";

export const OrangeButton = ({
  value,
  screenName,
  loading,
  handleLogin,
  sendItem,
  proceedToCheckout,
  sendOrder,
  acceptOrder,
}) => {
  const navigation = useNavigation();
  const [isPressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);
    // loading()
  };
  const handleRelease = () => {
    setPressed(false);
    {
      value === "Proceed to Checkout"
        ? proceedToCheckout()
        : value === "Log In"
        ? handleLogin()
        : value === "Add to Menu"
        ? sendItem()
        : value === "Confirm Order"
        ? sendOrder()
        : value === "Accept"
        ? acceptOrder()
        : navigation.navigate(screenName);
    }
  };
  return (
    <Pressable
      onPress={loading ? "" : handleRelease}
      onPressIn={loading ? "" : handlePress}
      style={[styles.button, isPressed && styles.buttonPressed]}
    >
      {loading ? <ActivityIndicator color={"white"} size="small" /> : null}
      <Text style={[styles.text, isPressed && styles.textPressed]}>
        {value}
      </Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF6600",
    paddingHorizontal: 11,
    paddingVertical: 12,
    borderRadius: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    backgroundColor: "transparent",
    borderColor: "#FF6600",
    // borderWidth: "2px",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    marginLeft: 5,
  },
  textPressed: {
    color: "#FF6600",
    fontWeight: 700,
  },
});