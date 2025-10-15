import { createContext, useContext, useEffect, useState } from "react";
import { useLogin, useSignUp } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LocalLoginReturn } from "../api/dto/auth.dto";
import { LoginPayload } from "../api/auth-api";

interface AuthContextType {
  isUserLoggedIn: boolean;
  token: string | null;
  login: (
    payload: any,
    onSuccess: (data: LocalLoginReturn) => void,
    onError: (error: any) => void
  ) => void;
  logout: () => void;
  googleLogin: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );

  const { mutate: loginMutate } = useLogin();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsUserLoggedIn(true);
    }
  }, []);

  
  const login = (
    payload: any,
    onSuccess: (data: LocalLoginReturn) => void,
    onError: (error: any) => void
  ) => {
    loginMutate(payload, {
      onSuccess: (data) => {        
        localStorage.setItem("access_token", data.access_token);
        setToken(data.access_token);
        setIsUserLoggedIn(true);
        onSuccess?.(data);
        navigate("/home");
      },
      onError,
    });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setIsUserLoggedIn(false);
    navigate("/login");
  };

  const googleLogin = async (token: string) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_NEST_API}/auth/google-auth`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );
      const data = await res.json();
      localStorage.setItem("access_token", data.access_token);
      setToken(data.access_token); // <- update state
      setIsUserLoggedIn(true);
    } catch (err) {
      console.error("Google login failed", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isUserLoggedIn, token, login, logout, googleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
