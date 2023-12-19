import React, { useContext, useState } from "react";

export const AuthContext = React.createContext("");

export const AuthProvider = ({ children }) => {
  const [users, setUser] = useState(false);
  const [consumers, setConsumers] = useState(null);

  const [vendorId, setVendorId] = useState("");

  const [vendors, setVendors] = useState(null);

 
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
