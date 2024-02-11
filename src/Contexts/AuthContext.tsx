import { createContext, Dispatch, SetStateAction } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuth: () => {},
});

export default AuthContext;
