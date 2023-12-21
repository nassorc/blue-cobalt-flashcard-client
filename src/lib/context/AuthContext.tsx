import {
  useState,
  createContext,
  ReactElement,
  Dispatch,
  SetStateAction,
} from "react";

interface T {
  auth: any;
  setAuth: Dispatch<SetStateAction<{}>>;
}
const initialValue: T = {
  auth: {},
  setAuth: () => {},
};
const AuthContext = createContext(initialValue);

// provider provides the information to the components
export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
