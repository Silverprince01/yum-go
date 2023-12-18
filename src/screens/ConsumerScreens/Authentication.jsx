import React, { createContext, useContext, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
export const AuthContext = React.createContext("");

export const AuthProvider = ({ children }) => {
  const [users, setUser] = useState(false);
  const [consumers, setConsumers] = useState(null);
  // const [meuser, setUse] = useState("null");
  const [vendorId, setVendorId] = useState("");
const  [order, setOrder] = useState(null)
  const [vendors, setVendors] = useState(null);

  // const fetchVendors = async () => {
  //   try {
  //     const snapshot = await firebase.firestore().collection("vendors").get();
  //     const vendorData = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     setVendors(vendorData);
  //     console.log(vendors);
  //   } catch (error) {
  //     console.error("Error fetching vendors:", error);
  //   }
  // };

  // useEffect( () => {

  //    fetchVendors()

  // }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        vendor: [vendors, setVendors],
        vendorIdentity: [vendorId, setVendorId],
        user: [users, setUser],
        consumer: [consumers, setConsumers],
        // orders:[order, setOrder]
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
