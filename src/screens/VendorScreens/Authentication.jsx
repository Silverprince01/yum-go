import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
// import AsyncS
// import {AsyncStorage} from "react-native"
const AuthContext = createContext();

const USER_KEY = "@MyApp:User";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
      if (authUser) {
        AsyncStorage.setItem(USER_KEY, JSON.stringify(authUser));
      } else {
        AsyncStorage.removeItem(USER_KEY);
      }
    });

    // Check if the user is stored in AsyncStorage
    const checkAsyncStorage = async () => {
      const storedUser = await AsyncStorage.getItem(USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    checkAsyncStorage();

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };
  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
