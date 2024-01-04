import { View, Text, Image, StyleSheet } from "react-native";
import { OrangeButton } from "../../../components/button/OrangeButton";
import image from "../../../../assets/yumDark.png";

export const Main3 = () => {
  
  return (
    <View style={styles.body}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>

      <View style={styles.button}>
        <Text style={styles.text}> Who are you? </Text>
        <View style={styles.buttonCont}>
          <OrangeButton
            value={"Consumer"}
            screenName={"Log In"}
          />
        </View>
        <View>
          <OrangeButton
            value={"Vendor"}
            screenName={"Vendor Login"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 17,
    // width: "100%",
    backgroundColor: "#FECDAA",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 180,
    height: 100,
  },
  text: {
    textAlign: "center",
    // paddingBottom: "30px",
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 20,
  },
  button: {
    // paddingHorizontal: 5,
    width: "100%",
    marginBottom: 10,
  },
  buttonCont: {
    
    
    marginBottom: 20,
  },
});
