import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { USER, LOGIN_USER, JWT, CRED, AUTH_STATE } from "../types";

export const fetchAsyncLogin = createAsyncThunk(
  "auth/login",
  async (auth: CRED) => {
    const res = await axios.post<JWT>(
      `${process.env.REACT_APP_API_URL}/authen/jwt/create/`,
      auth,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncRegister = createAsyncThunk(
  "auth/register",
  async (auth: CRED) => {
    const res = await axios.post<USER>(
      `${process.env.REACT_APP_API_URL}/api/create/`,
      auth,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncGetMyProf = createAsyncThunk(
  "auth/loginuser",
  async () => {
    const res = await axios.get<LOGIN_USER>(
      `${process.env.REACT_APP_API_URL}/api/loginuser/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

const initialState: AUTH_STATE = {
  isLoginView: true,
  loginUser: {
    id: 0,
    username: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncLogin.fulfilled,
      (state, action: PayloadAction<JWT>) => {
        localStorage.setItem("localJWT", action.payload.access);
        action.payload.access && (window.location.href = "/skills");
      }
    );
    builder.addCase(
      fetchAsyncGetMyProf.fulfilled,
      (state, action: PayloadAction<LOGIN_USER>) => {
        return {
          ...state,
          loginUser: action.payload,
        };
      }
    );
  },
});

export const { toggleMode } = authSlice.actions;

export const selectIsLoginView = (state: RootState) => state.auth.isLoginView;
export const selectLoginUser = (state: RootState) => state.auth.loginUser;

export default authSlice.reducer;
