import { createContext, useReducer, useContext } from "react";
import { AuthActionType, AuthStateType } from ".";
import jwtDecode, { JwtPayload } from "jwt-decode";

const userId = localStorage.getItem("userId")
  ? localStorage.getItem("userId")
  : "";
// const token = localStorage.getItem("token") ? localStorage.getItem("token") : ""
const token =
  Object.fromEntries(document.cookie.split(";").map((c) => c.split("=")))[
    "accessToken"
  ] || "";

const initialValue: AuthStateType = {
  userId: userId || "",
  token: token || "",
  loading: false,
  error: null,
};

export const AuthStateContext = createContext<AuthStateType>(initialValue);
export const AuthDispatchContext = createContext<
  React.Dispatch<AuthActionType>
>(() => {
  return;
});

export const useAuth = (): [
  AuthStateType,
  React.Dispatch<AuthActionType>,
  () => boolean,
] => {
  const authState = useContext<AuthStateType>(AuthStateContext);
  const authDispatch =
    useContext<React.Dispatch<AuthActionType>>(AuthDispatchContext);
  if (!authState || !authDispatch)
    throw new Error("useAuth must be consumed by child in AuthProvider");

  // helper functions
  const isUserAuthenticated = (): boolean => {
    if (!authState.token) return false;
    const exp = (jwtDecode(authState.token) as JwtPayload).exp;
    if (exp) {
      if (exp < new Date().getTime() / 1000) {
        console.log("not authenticated");
        return false;
      } else {
        console.log("authenticated");
        return true;
      }
    } else {
      console.log("authenticated");
      return false;
    }
  };

  return [authState, authDispatch, isUserAuthenticated];
};

export const AUTH_ACTIONS = {
  REQUEST_LOGIN: "login_request",
  LOGIN_SUCCESS: "login_success",
  LOGIN_ERROR: "login_error",
  LOGOUT: "logout",
};

function reducer(state: AuthStateType, action: AuthActionType) {
  switch (action.type) {
    case AUTH_ACTIONS.REQUEST_LOGIN:
      return { ...state, loading: true };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userId: action?.payload?.userId,
        token: action?.payload?.token,
      };
    case AUTH_ACTIONS.LOGIN_ERROR:
      console.log("context", action.payload?.error);
      return { ...state, loading: false, error: action?.payload?.error };
    case AUTH_ACTIONS.LOGOUT:
      console.log("logging out");
      return { ...state, userId: "", token: "" };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactElement }) {
  const [authState, dispatch] = useReducer(reducer, initialValue);
  return (
    <AuthStateContext.Provider value={authState}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}
