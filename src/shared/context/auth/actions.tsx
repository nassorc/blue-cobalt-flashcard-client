import React from "react"
import { AuthActionType, AUTH_ACTIONS } from ".";
import * as Constants from "../../config/constants";
import config from "@/config/config";

class AuthError extends Error {
  statusCode: number
  constructor(statusCode: number) {
    let message: string;
    if (statusCode === 401 || statusCode === 404) {
      message = "Incorrect Email or password";
    }
    else if (statusCode === 409) {
      message = "Email already exists";
    }
    else if (statusCode >= 500 && statusCode <= 599) {
      message = "Something went wrong. Please try again later";
    }
    else {
      message = "Something went wrong. Please try again later";
    }
    super(message);
    this.statusCode = statusCode;
  }
}

export async function signInUser(dispatch: React.Dispatch<AuthActionType>, actions: typeof AUTH_ACTIONS, payload: {email: string, password: string}) {
    try {
      dispatch({type: actions.REQUEST_LOGIN})
      const res = await fetch(config.api.user.login(), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      let statusCode = res.status;

      if (statusCode === 401 || statusCode === 404) {
        let message = "Incorrect Email or password";
        dispatch({type: actions.LOGIN_ERROR, payload: {error: message}});
        return
      }
      else if (statusCode === 409) {
        let message = "Email already exists";
        dispatch({type: actions.LOGIN_ERROR, payload: {error: message}});
        return
      }
      else if (statusCode >= 500 && statusCode <= 599) {
        let message = "Something went wrong. Please try again later";
        dispatch({type: actions.LOGIN_ERROR, payload: {error: message}});
        return
      }

      const credentials = await res.json();
      const token = Object.fromEntries(document.cookie.split(';').map(c => c.split('=')))['accessToken']
      const userId = credentials.userId;
      console.log("user id", userId)
      // localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      dispatch({type: actions.LOGIN_SUCCESS, payload: {userId: userId, token: token}});
      return credentials;
    }
    catch(error: any) {
      throw error
    }
}

export async function signUpUser(payload: {email: string, password: string}) {
  try {
    const res = await fetch(config.api.user.register(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    return await res.json();
  } catch(error: any) {
    throw new Error('Something went wrong. Please try again.');
  }
}

export async function logoutUser(dispatch: React.Dispatch<AuthActionType>, actions: typeof AUTH_ACTIONS) {
  const res = await fetch(config.api.user.logout(), {
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    }
  })
  localStorage.clear();
  dispatch({type: actions.LOGOUT});
}