import axios from "@/api";

// URLs
import * as URL from "./urls";
import { TokenPair } from "@/types";

export const postLogin = (data: FormData): Promise<TokenPair> =>
  axios.post(URL.LOGIN_URL, data).then((response) => response.data);

export const postRefreshToken = (data: FormData): Promise<TokenPair> =>
  axios.post(URL.REFRESH_TOKEN_URL, data).then((response) => response.data);

export const postVerifyToken = (data: FormData): Promise<object> =>
  axios.post(URL.VERIFY_TOKEN_URL, data).then((response) => response.data);

export const postLogout = (data: FormData): Promise<object> =>
  axios.post(URL.LOGOUT_URL, data).then((response) => response.data);
