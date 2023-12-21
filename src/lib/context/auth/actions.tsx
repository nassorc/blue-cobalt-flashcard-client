import React from "react";
import { AuthActionType, AUTH_ACTIONS } from ".";
import config from "@/lib/config";
import { login, register } from "@/lib/api";

export async function signInUser(
  dispatch: React.Dispatch<AuthActionType>,
  actions: typeof AUTH_ACTIONS,
  payload: { email: string; password: string },
) {
  try {
    dispatch({ type: actions.REQUEST_LOGIN });
    const res = await login(payload);
    let statusCode = res.status;

    if (statusCode === 401 || statusCode === 404) {
      let message = "Incorrect Email or password";
      dispatch({ type: actions.LOGIN_ERROR, payload: { error: message } });
      return;
    } else if (statusCode === 409) {
      let message = "Email already exists";
      dispatch({ type: actions.LOGIN_ERROR, payload: { error: message } });
      return;
    } else if (statusCode >= 500 && statusCode <= 599) {
      let message = "Something went wrong. Please try again later";
      dispatch({ type: actions.LOGIN_ERROR, payload: { error: message } });
      return;
    }

    const credentials = await res.json();
    const token = Object.fromEntries(
      document.cookie.split(";").map((c) => c.split("=")),
    )["accessToken"];

    const userId = credentials.userId;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: { userId: userId, token: token },
    });
    return credentials;
  } catch (error: any) {
    dispatch({
      type: actions.LOGIN_ERROR,
      payload: { error: "Something went wrong. Please try again later." },
    });
  }
}

export async function signUpUser(payload: { email: string; password: string }) {
  const res = await register(payload);
  return await res.json();
}

export async function logoutUser(
  dispatch: React.Dispatch<AuthActionType>,
  actions: typeof AUTH_ACTIONS,
) {
  const res = await fetch(config.api.user.logout(), {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  localStorage.clear();
  dispatch({ type: actions.LOGOUT });
}
