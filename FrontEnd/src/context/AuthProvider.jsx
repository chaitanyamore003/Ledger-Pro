import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { refreshToken } from "../services/authApi";
import {
  setAccessToken as saveAccessToken,
  clearAccessToken,
} from "../services/tokenService";

function AuthProvider({ children }) {
  // Authenticated user
  const [user, setUser] = useState(null);

  // Current access token
  const [accessToken, setAccessToken] = useState(null);

  // Tracks auth initialization
  const [loading, setLoading] = useState(true);

  // Sync React state with tokenService
  const updateAccessToken = (token) => {
    setAccessToken(token);

    if (token) {
      saveAccessToken(token);
    } else {
      clearAccessToken();
    }
  };

  // Save authenticated user
  const login = ({ user, accessToken }) => {
    console.log("LOGIN CALLED");
    console.log(user);
    console.log(accessToken);
    setUser(user);
    updateAccessToken(accessToken);
  };

  // Clear authentication state
  const logout = () => {
    setUser(null);
    updateAccessToken(null);
  };

  // Restore session on app startup
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data } = await refreshToken();

        login({
          user: data.data.user,
          accessToken: data.data.accessToken,
        });
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Shared auth state and actions
  const value = {
    user,
    accessToken,
    loading,
    login,
    logout,
    updateAccessToken,
    setUser,
    isAuthenticated: !!accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
