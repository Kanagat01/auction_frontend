import React, { createContext, Dispatch, SetStateAction } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuth: () => {},
});

export const withAuthContext = (component: () => React.ReactNode) => () => {
  const [isAuthenticated, setAuth] = React.useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
      {component()}
    </AuthContext.Provider>
  );
};
