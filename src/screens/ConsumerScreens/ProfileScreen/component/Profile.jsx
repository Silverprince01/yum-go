import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React from "react";
import { NavBar } from "../../../../components/NavBar/NavBar";
import Frame from "../../../../../assets/frame.png";
import Edit from "../../../../../assets/edit.png";
import Man from "../../../../../assets/man.png";
import Logout from "../../../../../assets/logout.png";
import Messages from "../../../../../assets/messages.png";
import Notification from "../../../../../assets/notification.png";
import ProfileIcon from "../../../../../assets/profile.png";
import Wallet from "../../../../../assets/wallet.png";
import Document from "../../../../../assets/document.png";
import Right from "../../../../../assets/arrow-right.png";
export const Profile = () => {
  return (
    <View style={styles.body}>
      <ImageBackground source={Frame} style={styles.imageBackground}>
        <View style={styles.userImageContainer}>
          <Image source={Man} style={styles.man} />
          <Image source={Edit} style={styles.edit} />
        </View>
      </ImageBackground>

      {/* personal profile */}
      <View style={styles.profileBackground}>
        <Text
          style={{
            fontSize: 16,
            paddingHorizontal: 17,
            marginBottom: 10,
            fontWeight: 600,
          }}
        >
          Personal Profile
        </Text>

        <View style={styles.profile}>
          <View style={styles.profileFlex}>
            <View style={styles.iconFlex}>
              <Image source={ProfileIcon} style={styles.iconSize} />
              <Text style={{ fontSize: 16, fontWeight: 600 }}>
                Profile Details
              </Text>
            </View>
            <Image source={Right} style={styles.iconSize} />
          </View>
          <View style={styles.profileFlex}>
            <View style={styles.iconFlex}>
              <Image source={Document} style={styles.iconSize} />
              <Text style={{ fontSize: 16, fontWeight: 600 }}>Addresses</Text>
            </View>
            <Image source={Right} style={styles.iconSize} />
          </View>
          <View style={styles.iconRight}>
            <View style={styles.iconFlex}>
              <Image source={Wallet} style={styles.iconSize} />
              <Text style={{ fontSize: 16, fontWeight: 600 }}>Wallets</Text>
            </View>
            <Image source={Right} style={styles.iconSize} />
          </View>
        </View>

        <View style={styles.iconContainer}>
          <View style={styles.iconRight}>
            <View style={styles.iconFlex}>
              <Image source={Notification} style={styles.iconSize} />
              <Text style={{ fontSize: 16, fontWeight: 600 }}>
                Notification
              </Text>
            </View>
            <Image source={Right} style={styles.iconSize} />
          </View>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.iconRight}>
            <View style={styles.iconFlex}>
              <Image source={Messages} style={styles.iconSize} />
              <Text style={{ fontSize: 16, fontWeight: 600 }}>
                Service Support
              </Text>
            </View>
            <Image source={Right} style={styles.iconSize} />
          </View>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.iconRight}>
            <View style={styles.iconFlex}>
              <Image source={Logout} style={styles.iconSize} />
              <Text style={{ fontSize: 16, fontWeight: 600 }}>Logout</Text>
            </View>
            <Image source={Right} style={styles.iconSize} />
          </View>
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <NavBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  imageBackground: {
    width: "100%",
    height: 194,
    justifyContent: "center",
    alignItems: "center",
  },
  userImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "gray",
    // borderColor: "red",
    // borderWidth: 2,
    position: "relative",
  },
  man: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  edit: {
    width: 16,
    height: 16,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  profile: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 17,
    // paddingVertical: 5,
    elevation: 10, // For Android; adjust the elevation value as needed
    shadowColor: "black", // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS; adjust the offset as needed
    shadowOpacity: 0.2, // For iOS; adjust the opacity as needed
    shadowRadius: 10,
    marginVertical: 10,
  },
  profileBackground: {
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    paddingVertical: 20,
  },
  profileFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 1,
  },
  iconContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 17,
    marginVertical: 10,
    elevation: 10, // For Android; adjust the elevation value as needed
    shadowColor: "black", // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS; adjust the offset as needed
    shadowOpacity: 0.2, // For iOS; adjust the opacity as needed
    shadowRadius: 10,
  },
  iconRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  iconFlex: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  iconSize: {
    width: 16,
    height: 16,
  },
});
