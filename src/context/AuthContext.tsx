import { createContext, useContext, useEffect, useState } from 'react';
import { useLogin, useSignUp } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LocalLoginReturn } from '../api/dto/auth.dto';
import { LoginPayload } from '../api/auth';

interface AuthContextType {
  isUserLoggedIn: boolean;
  login: (
    payload: any,
    onSuccess: (data: LocalLoginReturn) => void,
    onError: (error: any) => void
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  const { mutate: loginMutate } = useLogin(); 

  const login = (payload: any, onSuccess: (data: LocalLoginReturn) => void, onError: (error: any) => void) => {
    loginMutate(payload, {
        onSuccess: (data) => {        
        localStorage.setItem('access_token', data.access_token);
        setIsUserLoggedIn(true);
        onSuccess?.(data);
        navigate('/home'); 
      },
      onError,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsUserLoggedIn(false);
    navigate('/login');
  };

  useEffect(() => {   
   const token = localStorage.getItem('access_token');
    if (token) {
      setIsUserLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
