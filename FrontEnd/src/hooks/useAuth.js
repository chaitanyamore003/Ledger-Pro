import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// Custom hook to access authentication state
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;