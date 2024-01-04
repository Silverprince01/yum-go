import { useState } from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const TransparentButton = ({
  value,
  screenName,
  vendorSignUp,
  signUp,
  loading,
  register,
}) => {
  const navigation = useNavigation();
  const [isPressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);
  };
  const handleRelease = () => {
    setPressed(false);

    {
      value === "Sign Up"
        ? signUp()
        : value === "Sign UP"
        ? vendorSignUp()
        : value === "Register"
        ? register()
        : navigation.navigate(screenName);
    }
  };

  return (
    <Pressable
      onPress={loading ? "" : handleRelease}
      onPressIn={loading ? "" : handlePress}
      style={[styles.button, isPressed && styles.buttonPressed]}
    >
      {loading ? <ActivityIndicator color={"#FF6600"} size="small" /> : null}
      <Text style={[styles.text, isPressed && styles.textPressed]}>
        {value}
      </Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    paddingHorizontal: 11,
    paddingVertical: 12,
    borderRadius: 16,
    width: "100%",
    borderColor: "#FF6600",
    borderWidth: 1,
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  buttonPressed: {
    backgroundColor: "#FF6600",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#FF6600",
  },
  textPressed: {
    color: "white",
  },
});
